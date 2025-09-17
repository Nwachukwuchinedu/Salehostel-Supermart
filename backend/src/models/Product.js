const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema({
  packageType: {
    type: String,
    required: [true, 'Package type is required'],
    trim: true,
    maxlength: [50, 'Package type cannot exceed 50 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  costPrice: {
    type: Number,
    required: [true, 'Cost price is required'],
    min: [0, 'Cost price cannot be negative']
  },
  currentStock: {
    type: Number,
    required: [true, 'Current stock is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  minStockLevel: {
    type: Number,
    required: [true, 'Minimum stock level is required'],
    min: [0, 'Minimum stock level cannot be negative'],
    default: 5
  },
  maxStockLevel: {
    type: Number,
    min: [0, 'Maximum stock level cannot be negative'],
    default: 1000
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    enum: ['piece', 'kg', 'gram', 'liter', 'ml', 'pack', 'carton', 'bag', 'cup', 'rubber'],
    default: 'piece'
  },
  weight: {
    type: Number,
    min: 0
  },
  dimensions: {
    length: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 }
  },
  barcode: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  sku: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  productGroup: {
    type: String,
    required: [true, 'Product group is required'],
    enum: [
      'Staple Foods', 'Frozen Foods', 'Convenience Foods', 
      'Sauces/Spices', 'Cooking Oils', 'Groceries', 
      'Biscuits', 'Cleaning Agents', 'Personal Care', 'Stationery'
    ]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Product Variants (Different packages/sizes)
  variants: [productVariantSchema],
  
  // Business Information
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Supplier is required']
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [50, 'Brand name cannot exceed 50 characters']
  },
  manufacturer: {
    type: String,
    trim: true,
    maxlength: [100, 'Manufacturer name cannot exceed 100 characters']
  },
  
  // Media
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      trim: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  
  // Product Status
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  isDigital: {
    type: Boolean,
    default: false
  },
  
  // SEO
  metaTitle: {
    type: String,
    trim: true,
    maxlength: [60, 'Meta title cannot exceed 60 characters']
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  },
  
  // Product Specifications
  specifications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    }
  }],
  
  // Expiry and Batch Information
  hasExpiry: {
    type: Boolean,
    default: false
  },
  shelfLife: {
    type: Number, // in days
    min: 0
  },
  
  // Sales Information
  totalSold: {
    type: Number,
    default: 0,
    min: 0
  },
  totalRevenue: {
    type: Number,
    default: 0,
    min: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Tracking
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Timestamps for variants
  lastStockUpdate: {
    type: Date,
    default: Date.now
  },
  lastPriceUpdate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
productSchema.index({ name: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ supplier: 1 });
productSchema.index({ productGroup: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ 'variants.sku': 1 });
productSchema.index({ 'variants.barcode': 1 });
productSchema.index({ createdAt: -1 });

// Compound indexes
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ supplier: 1, isActive: 1 });
productSchema.index({ productGroup: 1, isActive: 1 });

// Virtual for primary image
productSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary ? primary.url : (this.images.length > 0 ? this.images[0].url : null);
});

// Virtual for default variant
productSchema.virtual('defaultVariant').get(function() {
  const defaultVar = this.variants.find(variant => variant.isDefault);
  return defaultVar || (this.variants.length > 0 ? this.variants[0] : null);
});

// Virtual for total stock across all variants
productSchema.virtual('totalStock').get(function() {
  return this.variants.reduce((total, variant) => total + variant.currentStock, 0);
});

// Virtual for lowest price
productSchema.virtual('minPrice').get(function() {
  if (this.variants.length === 0) return 0;
  return Math.min(...this.variants.map(v => v.price));
});

// Virtual for highest price
productSchema.virtual('maxPrice').get(function() {
  if (this.variants.length === 0) return 0;
  return Math.max(...this.variants.map(v => v.price));
});

// Virtual for low stock variants
productSchema.virtual('lowStockVariants').get(function() {
  return this.variants.filter(variant => 
    variant.currentStock <= variant.minStockLevel && variant.isAvailable
  );
});

// Virtual for out of stock variants
productSchema.virtual('outOfStockVariants').get(function() {
  return this.variants.filter(variant => variant.currentStock === 0);
});

// Pre-save middleware to generate slug
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  next();
});

// Pre-save middleware to ensure only one default variant
productSchema.pre('save', function(next) {
  const defaultVariants = this.variants.filter(variant => variant.isDefault);
  
  if (defaultVariants.length > 1) {
    // Keep only the first default variant
    this.variants.forEach((variant, index) => {
      if (index > 0 && variant.isDefault) {
        variant.isDefault = false;
      }
    });
  } else if (defaultVariants.length === 0 && this.variants.length > 0) {
    // Set first variant as default if none is set
    this.variants[0].isDefault = true;
  }
  
  next();
});

// Pre-save middleware to ensure only one primary image
productSchema.pre('save', function(next) {
  const primaryImages = this.images.filter(img => img.isPrimary);
  
  if (primaryImages.length > 1) {
    // Keep only the first primary image
    this.images.forEach((img, index) => {
      if (index > 0 && img.isPrimary) {
        img.isPrimary = false;
      }
    });
  } else if (primaryImages.length === 0 && this.images.length > 0) {
    // Set first image as primary if none is set
    this.images[0].isPrimary = true;
  }
  
  next();
});

// Pre-save middleware to generate SKUs for variants
productSchema.pre('save', function(next) {
  this.variants.forEach((variant, index) => {
    if (!variant.sku) {
      const productCode = this.name.substring(0, 3).toUpperCase();
      const variantCode = variant.packageType.substring(0, 3).toUpperCase();
      const timestamp = Date.now().toString().slice(-4);
      variant.sku = `${productCode}-${variantCode}-${timestamp}-${index}`;
    }
  });
  next();
});

// Static method to search products
productSchema.statics.search = function(query, options = {}) {
  const {
    category,
    productGroup,
    supplier,
    minPrice,
    maxPrice,
    inStock = true,
    featured,
    limit = 20,
    skip = 0,
    sort = { createdAt: -1 }
  } = options;

  const searchRegex = new RegExp(query, 'i');
  const filter = {
    isActive: true,
    $or: [
      { name: searchRegex },
      { description: searchRegex },
      { shortDescription: searchRegex },
      { tags: { $in: [searchRegex] } },
      { brand: searchRegex }
    ]
  };

  if (category) filter.category = category;
  if (productGroup) filter.productGroup = productGroup;
  if (supplier) filter.supplier = supplier;
  if (featured !== undefined) filter.featured = featured;
  
  if (minPrice || maxPrice) {
    filter['variants.price'] = {};
    if (minPrice) filter['variants.price'].$gte = minPrice;
    if (maxPrice) filter['variants.price'].$lte = maxPrice;
  }
  
  if (inStock) {
    filter['variants.currentStock'] = { $gt: 0 };
  }

  return this.find(filter)
    .populate('category', 'name slug')
    .populate('supplier', 'firstName lastName supplierInfo.companyName')
    .sort(sort)
    .limit(limit)
    .skip(skip);
};

// Static method to get featured products
productSchema.statics.getFeatured = function(limit = 10) {
  return this.find({ 
    isActive: true, 
    featured: true,
    'variants.currentStock': { $gt: 0 }
  })
    .populate('category', 'name slug')
    .populate('supplier', 'firstName lastName supplierInfo.companyName')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to get low stock products
productSchema.statics.getLowStock = function() {
  return this.aggregate([
    { $match: { isActive: true } },
    { $unwind: '$variants' },
    { 
      $match: { 
        'variants.isAvailable': true,
        $expr: { $lte: ['$variants.currentStock', '$variants.minStockLevel'] }
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'supplier',
        foreignField: '_id',
        as: 'supplier'
      }
    },
    {
      $project: {
        name: 1,
        'variants.packageType': 1,
        'variants.currentStock': 1,
        'variants.minStockLevel': 1,
        'category.name': 1,
        'supplier.firstName': 1,
        'supplier.lastName': 1,
        'supplier.supplierInfo.companyName': 1
      }
    }
  ]);
};

// Method to update stock for a specific variant
productSchema.methods.updateVariantStock = function(variantId, quantity, operation = 'set') {
  const variant = this.variants.id(variantId);
  if (!variant) {
    throw new Error('Variant not found');
  }

  switch (operation) {
    case 'add':
      variant.currentStock += quantity;
      break;
    case 'subtract':
      variant.currentStock = Math.max(0, variant.currentStock - quantity);
      break;
    case 'set':
    default:
      variant.currentStock = Math.max(0, quantity);
      break;
  }

  this.lastStockUpdate = new Date();
  return this.save();
};

// Method to check if product is in stock
productSchema.methods.isInStock = function(variantId = null) {
  if (variantId) {
    const variant = this.variants.id(variantId);
    return variant ? variant.currentStock > 0 : false;
  }
  
  return this.variants.some(variant => variant.currentStock > 0 && variant.isAvailable);
};

// Method to get available variants
productSchema.methods.getAvailableVariants = function() {
  return this.variants.filter(variant => 
    variant.isAvailable && variant.currentStock > 0
  );
};

module.exports = mongoose.model('Product', productSchema);