const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required']
  },
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Variant ID is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    max: [100, 'Quantity cannot exceed 100']
  },
  
  // Snapshot of product/variant details at time of adding to cart
  productSnapshot: {
    name: String,
    packageType: String,
    price: Number,
    image: String,
    isAvailable: Boolean,
    currentStock: Number
  },
  
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const cartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Customer is required'],
    unique: true
  },
  
  items: [cartItemSchema],
  
  // Cart totals
  subtotal: {
    type: Number,
    default: 0,
    min: [0, 'Subtotal cannot be negative']
  },
  
  totalItems: {
    type: Number,
    default: 0,
    min: [0, 'Total items cannot be negative']
  },
  
  // Cart status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Session tracking for guest users (if implemented later)
  sessionId: {
    type: String,
    sparse: true
  },
  
  // Expiry for abandoned carts
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)); // 7 days from now
    }
  },
  
  // Saved for later items
  savedItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    variantId: mongoose.Schema.Types.ObjectId,
    savedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Applied discounts/coupons
  appliedCoupons: [{
    code: String,
    discountAmount: Number,
    discountType: {
      type: String,
      enum: ['percentage', 'fixed']
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Last activity timestamp
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
cartSchema.index({ customer: 1 });
cartSchema.index({ sessionId: 1 });
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
cartSchema.index({ lastActivity: 1 });
cartSchema.index({ isActive: 1 });

// Virtual for total quantity
cartSchema.virtual('totalQuantity').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for unique products count
cartSchema.virtual('uniqueProductsCount').get(function() {
  return this.items.length;
});

// Virtual for cart value
cartSchema.virtual('cartValue').get(function() {
  return this.items.reduce((total, item) => {
    return total + (item.productSnapshot.price * item.quantity);
  }, 0);
});

// Virtual for estimated delivery fee
cartSchema.virtual('estimatedDeliveryFee').get(function() {
  const subtotal = this.cartValue;
  return subtotal >= 5000 ? 0 : 200; // Free delivery for orders above ₦5000
});

// Virtual for cart summary
cartSchema.virtual('summary').get(function() {
  const subtotal = this.cartValue;
  const deliveryFee = this.estimatedDeliveryFee;
  const discount = this.appliedCoupons.reduce((total, coupon) => total + coupon.discountAmount, 0);
  
  return {
    subtotal,
    deliveryFee,
    discount,
    total: subtotal + deliveryFee - discount,
    itemCount: this.totalQuantity,
    uniqueProducts: this.uniqueProductsCount
  };
});

// Pre-save middleware to update totals and last activity
cartSchema.pre('save', function(next) {
  this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
  this.subtotal = this.cartValue;
  this.lastActivity = new Date();
  next();
});

// Method to add item to cart
cartSchema.methods.addItem = async function(productId, variantId, quantity = 1) {
  try {
    // Get product and variant details
    const Product = mongoose.model('Product');
    const product = await Product.findById(productId);
    
    if (!product || !product.isActive) {
      throw new Error('Product not found or inactive');
    }
    
    const variant = product.variants.id(variantId);
    if (!variant || !variant.isAvailable) {
      throw new Error('Product variant not found or unavailable');
    }
    
    // Check stock availability
    if (variant.currentStock < quantity) {
      throw new Error(`Insufficient stock. Only ${variant.currentStock} items available`);
    }
    
    // Check if item already exists in cart
    const existingItemIndex = this.items.findIndex(item => 
      item.product.toString() === productId.toString() && 
      item.variantId.toString() === variantId.toString()
    );
    
    if (existingItemIndex > -1) {
      // Update existing item
      const newQuantity = this.items[existingItemIndex].quantity + quantity;
      
      if (newQuantity > variant.currentStock) {
        throw new Error(`Cannot add ${quantity} more items. Only ${variant.currentStock - this.items[existingItemIndex].quantity} more available`);
      }
      
      this.items[existingItemIndex].quantity = newQuantity;
      this.items[existingItemIndex].productSnapshot = {
        name: product.name,
        packageType: variant.packageType,
        price: variant.price,
        image: product.primaryImage,
        isAvailable: variant.isAvailable,
        currentStock: variant.currentStock
      };
    } else {
      // Add new item
      this.items.push({
        product: productId,
        variantId: variantId,
        quantity: quantity,
        productSnapshot: {
          name: product.name,
          packageType: variant.packageType,
          price: variant.price,
          image: product.primaryImage,
          isAvailable: variant.isAvailable,
          currentStock: variant.currentStock
        }
      });
    }
    
    return await this.save();
  } catch (error) {
    throw error;
  }
};

// Method to update item quantity
cartSchema.methods.updateItemQuantity = async function(itemId, quantity) {
  try {
    const item = this.items.id(itemId);
    if (!item) {
      throw new Error('Cart item not found');
    }
    
    // Get current product stock
    const Product = mongoose.model('Product');
    const product = await Product.findById(item.product);
    const variant = product.variants.id(item.variantId);
    
    if (quantity > variant.currentStock) {
      throw new Error(`Insufficient stock. Only ${variant.currentStock} items available`);
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      this.items.pull(itemId);
    } else {
      item.quantity = quantity;
      // Update snapshot with current data
      item.productSnapshot.currentStock = variant.currentStock;
      item.productSnapshot.price = variant.price;
      item.productSnapshot.isAvailable = variant.isAvailable;
    }
    
    return await this.save();
  } catch (error) {
    throw error;
  }
};

// Method to remove item from cart
cartSchema.methods.removeItem = function(itemId) {
  this.items.pull(itemId);
  return this.save();
};

// Method to clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  this.appliedCoupons = [];
  return this.save();
};

// Method to move item to saved for later
cartSchema.methods.saveForLater = function(itemId) {
  const item = this.items.id(itemId);
  if (!item) {
    throw new Error('Cart item not found');
  }
  
  // Add to saved items
  this.savedItems.push({
    product: item.product,
    variantId: item.variantId
  });
  
  // Remove from cart
  this.items.pull(itemId);
  
  return this.save();
};

// Method to move saved item back to cart
cartSchema.methods.moveToCart = async function(savedItemId, quantity = 1) {
  const savedItem = this.savedItems.id(savedItemId);
  if (!savedItem) {
    throw new Error('Saved item not found');
  }
  
  try {
    // Add item back to cart
    await this.addItem(savedItem.product, savedItem.variantId, quantity);
    
    // Remove from saved items
    this.savedItems.pull(savedItemId);
    
    return await this.save();
  } catch (error) {
    throw error;
  }
};

// Method to validate cart items against current product data
cartSchema.methods.validateCart = async function() {
  const Product = mongoose.model('Product');
  const issues = [];
  
  for (let i = this.items.length - 1; i >= 0; i--) {
    const item = this.items[i];
    
    try {
      const product = await Product.findById(item.product);
      
      if (!product || !product.isActive) {
        issues.push({
          type: 'product_unavailable',
          item: item,
          message: 'Product is no longer available'
        });
        this.items.splice(i, 1);
        continue;
      }
      
      const variant = product.variants.id(item.variantId);
      if (!variant || !variant.isAvailable) {
        issues.push({
          type: 'variant_unavailable',
          item: item,
          message: 'Product variant is no longer available'
        });
        this.items.splice(i, 1);
        continue;
      }
      
      // Check stock
      if (variant.currentStock < item.quantity) {
        if (variant.currentStock === 0) {
          issues.push({
            type: 'out_of_stock',
            item: item,
            message: 'Product is out of stock'
          });
          this.items.splice(i, 1);
        } else {
          issues.push({
            type: 'insufficient_stock',
            item: item,
            availableStock: variant.currentStock,
            message: `Only ${variant.currentStock} items available`
          });
          item.quantity = variant.currentStock;
        }
      }
      
      // Check price changes
      if (variant.price !== item.productSnapshot.price) {
        issues.push({
          type: 'price_changed',
          item: item,
          oldPrice: item.productSnapshot.price,
          newPrice: variant.price,
          message: 'Product price has changed'
        });
        item.productSnapshot.price = variant.price;
      }
      
      // Update snapshot
      item.productSnapshot = {
        name: product.name,
        packageType: variant.packageType,
        price: variant.price,
        image: product.primaryImage,
        isAvailable: variant.isAvailable,
        currentStock: variant.currentStock
      };
      
    } catch (error) {
      issues.push({
        type: 'validation_error',
        item: item,
        message: 'Error validating item'
      });
      this.items.splice(i, 1);
    }
  }
  
  if (issues.length > 0) {
    await this.save();
  }
  
  return {
    isValid: issues.length === 0,
    issues: issues,
    cart: this
  };
};

// Static method to find or create cart for customer
cartSchema.statics.findOrCreateForCustomer = async function(customerId) {
  let cart = await this.findOne({ customer: customerId, isActive: true });
  
  if (!cart) {
    cart = new this({ customer: customerId });
    await cart.save();
  }
  
  return cart;
};

// Static method to cleanup expired carts
cartSchema.statics.cleanupExpiredCarts = async function() {
  const result = await this.deleteMany({
    expiresAt: { $lt: new Date() },
    isActive: false
  });
  
  return result.deletedCount;
};

// Static method to get abandoned carts
cartSchema.statics.getAbandonedCarts = function(hoursAgo = 24) {
  const cutoffDate = new Date(Date.now() - (hoursAgo * 60 * 60 * 1000));
  
  return this.find({
    lastActivity: { $lt: cutoffDate },
    isActive: true,
    totalItems: { $gt: 0 }
  }).populate('customer', 'firstName lastName email whatsappNumber');
};

module.exports = mongoose.model('Cart', cartSchema);