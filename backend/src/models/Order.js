const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required']
  },
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Variant ID is required']
  },
  packageType: {
    type: String,
    required: [true, 'Package type is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  unitPrice: {
    type: Number,
    required: [true, 'Unit price is required'],
    min: [0, 'Unit price cannot be negative']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative']
  },
  
  // Snapshot of product details at time of order
  productSnapshot: {
    description: String,
    image: String,
    brand: String,
    specifications: [{
      name: String,
      value: String
    }]
  }
}, {
  timestamps: true
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: [true, 'Order number is required']
  },
  
  // Customer Information
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.orderType !== 'walk-in';
    }
  },
  customerInfo: {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    whatsappNumber: {
      type: String,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid WhatsApp number']
    },
    callNumber: {
      type: String,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    }
  },
  
  // Order Items
  orderItems: [orderItemSchema],
  
  // Pricing
  subtotal: {
    type: Number,
    required: [true, 'Subtotal is required'],
    min: [0, 'Subtotal cannot be negative']
  },
  deliveryFee: {
    type: Number,
    default: 0,
    min: [0, 'Delivery fee cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  
  // Order Type and Delivery
  orderType: {
    type: String,
    enum: ['pickup', 'delivery', 'walk-in'],
    required: [true, 'Order type is required'],
    default: 'pickup'
  },
  deliveryAddress: {
    address: {
      type: String,
      trim: true
    },
    hostelRoom: {
      type: String,
      trim: true
    },
    landmark: {
      type: String,
      trim: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  
  // Order Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  statusHistory: [{
    status: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: {
      type: String,
      trim: true
    }
  }],
  
  // Payment Information
  paymentMethod: {
    type: String,
    enum: ['cash', 'transfer', 'pos', 'card', 'mobile-money'],
    required: [true, 'Payment method is required'],
    default: 'cash'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded', 'partially-refunded'],
    default: 'pending'
  },
  paymentReference: {
    type: String,
    trim: true
  },
  paymentDate: {
    type: Date
  },
  
  // Timing
  orderDate: {
    type: Date,
    default: Date.now
  },
  estimatedReady: {
    type: Date
  },
  actualReady: {
    type: Date
  },
  estimatedDelivery: {
    type: Date
  },
  actualDelivery: {
    type: Date
  },
  
  // Staff Assignment
  handledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deliveredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Additional Information
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  specialInstructions: {
    type: String,
    trim: true,
    maxlength: [300, 'Special instructions cannot exceed 300 characters']
  },
  
  // Priority and Urgency
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  
  // Ratings and Reviews
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    trim: true,
    maxlength: [500, 'Review cannot exceed 500 characters']
  },
  reviewDate: {
    type: Date
  },
  
  // Refund Information
  refundAmount: {
    type: Number,
    default: 0,
    min: [0, 'Refund amount cannot be negative']
  },
  refundReason: {
    type: String,
    trim: true
  },
  refundDate: {
    type: Date
  },
  refundedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Tracking
  trackingNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  
  // Source
  source: {
    type: String,
    enum: ['web', 'mobile', 'whatsapp', 'phone', 'walk-in'],
    default: 'web'
  },
  
  // Cancellation
  cancellationReason: {
    type: String,
    trim: true
  },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancellationDate: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ customer: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ orderDate: -1 });
orderSchema.index({ handledBy: 1 });
orderSchema.index({ trackingNumber: 1 });
orderSchema.index({ orderType: 1 });

// Compound indexes
orderSchema.index({ customer: 1, orderDate: -1 });
orderSchema.index({ status: 1, orderDate: -1 });
orderSchema.index({ handledBy: 1, status: 1 });

// Virtual for order age in hours
orderSchema.virtual('ageInHours').get(function() {
  return Math.floor((Date.now() - this.orderDate.getTime()) / (1000 * 60 * 60));
});

// Virtual for estimated preparation time
orderSchema.virtual('estimatedPrepTime').get(function() {
  const itemCount = this.orderItems.reduce((total, item) => total + item.quantity, 0);
  return Math.max(15, itemCount * 2); // Minimum 15 minutes, 2 minutes per item
});

// Virtual for delivery time window
orderSchema.virtual('deliveryTimeWindow').get(function() {
  if (this.orderType !== 'delivery') return null;
  
  const baseTime = this.estimatedReady || new Date(this.orderDate.getTime() + (this.estimatedPrepTime * 60000));
  return {
    earliest: new Date(baseTime.getTime() + (15 * 60000)), // 15 minutes after ready
    latest: new Date(baseTime.getTime() + (45 * 60000))    // 45 minutes after ready
  };
});

// Virtual for total items count
orderSchema.virtual('totalItems').get(function() {
  return this.orderItems.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for profit margin
orderSchema.virtual('profitMargin').get(function() {
  // This would need product cost data to calculate accurately
  return 0; // Placeholder
});

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    // Find the last order number for today
    const lastOrder = await this.constructor.findOne({
      orderNumber: new RegExp(`^SH${year}${month}${day}`)
    }).sort({ orderNumber: -1 });
    
    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }
    
    this.orderNumber = `SH${year}${month}${day}${sequence.toString().padStart(4, '0')}`;
  }
  next();
});

// Pre-save middleware to generate tracking number
orderSchema.pre('save', function(next) {
  if (this.isNew && this.orderType === 'delivery' && !this.trackingNumber) {
    this.trackingNumber = `TRK${Date.now().toString().slice(-8)}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }
  next();
});

// Pre-save middleware to calculate totals
orderSchema.pre('save', function(next) {
  // Calculate subtotal
  this.subtotal = this.orderItems.reduce((total, item) => total + item.totalPrice, 0);
  
  // Calculate total amount
  this.totalAmount = this.subtotal + this.deliveryFee + this.tax - this.discount;
  
  next();
});

// Pre-save middleware to update status history
orderSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
      updatedBy: this.handledBy
    });
  }
  next();
});

// Static method to get order statistics
orderSchema.statics.getStatistics = async function(dateRange = {}) {
  const { startDate, endDate } = dateRange;
  const matchStage = {};
  
  if (startDate || endDate) {
    matchStage.orderDate = {};
    if (startDate) matchStage.orderDate.$gte = new Date(startDate);
    if (endDate) matchStage.orderDate.$lte = new Date(endDate);
  }
  
  return await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$totalAmount' },
        averageOrderValue: { $avg: '$totalAmount' },
        pendingOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        completedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
        },
        cancelledOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
        }
      }
    }
  ]);
};

// Static method to get orders by status
orderSchema.statics.getByStatus = function(status, options = {}) {
  const { limit = 50, skip = 0, populate = true } = options;
  
  let query = this.find({ status }).sort({ orderDate: -1 });
  
  if (populate) {
    query = query
      .populate('customer', 'firstName lastName email whatsappNumber')
      .populate('handledBy', 'firstName lastName')
      .populate('orderItems.product', 'name images');
  }
  
  return query.limit(limit).skip(skip);
};

// Method to update status
orderSchema.methods.updateStatus = function(newStatus, updatedBy, notes = '') {
  this.status = newStatus;
  this.handledBy = updatedBy;
  
  // Set specific timestamps based on status
  switch (newStatus) {
    case 'confirmed':
      if (!this.estimatedReady) {
        this.estimatedReady = new Date(Date.now() + (this.estimatedPrepTime * 60000));
      }
      break;
    case 'ready':
      this.actualReady = new Date();
      if (this.orderType === 'delivery' && !this.estimatedDelivery) {
        this.estimatedDelivery = new Date(Date.now() + (30 * 60000)); // 30 minutes for delivery
      }
      break;
    case 'delivered':
      this.actualDelivery = new Date();
      if (this.paymentMethod === 'cash' && this.paymentStatus === 'pending') {
        this.paymentStatus = 'paid';
        this.paymentDate = new Date();
      }
      break;
    case 'cancelled':
      this.cancellationDate = new Date();
      this.cancelledBy = updatedBy;
      break;
  }
  
  // Add to status history
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    updatedBy: updatedBy,
    notes: notes
  });
  
  return this.save();
};

// Method to calculate delivery fee
orderSchema.methods.calculateDeliveryFee = function() {
  if (this.orderType !== 'delivery') {
    this.deliveryFee = 0;
    return 0;
  }
  
  // Base delivery fee logic
  let fee = 200; // Base fee of ₦200
  
  // Free delivery for orders above ₦5000
  if (this.subtotal >= 5000) {
    fee = 0;
  }
  
  this.deliveryFee = fee;
  return fee;
};

// Method to check if order can be cancelled
orderSchema.methods.canBeCancelled = function() {
  const nonCancellableStatuses = ['delivered', 'cancelled', 'refunded'];
  return !nonCancellableStatuses.includes(this.status);
};

// Method to check if order can be refunded
orderSchema.methods.canBeRefunded = function() {
  return this.status === 'delivered' && this.paymentStatus === 'paid';
};

module.exports = mongoose.model('Order', orderSchema);