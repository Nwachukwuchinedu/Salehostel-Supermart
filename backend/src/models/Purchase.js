const mongoose = require('mongoose');

const purchaseItemSchema = new mongoose.Schema({
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
  quantityOrdered: {
    type: Number,
    required: [true, 'Quantity ordered is required'],
    min: [1, 'Quantity must be at least 1']
  },
  quantityReceived: {
    type: Number,
    default: 0,
    min: [0, 'Quantity received cannot be negative']
  },
  unitCostPrice: {
    type: Number,
    required: [true, 'Unit cost price is required'],
    min: [0, 'Unit cost price cannot be negative']
  },
  totalCost: {
    type: Number,
    required: [true, 'Total cost is required'],
    min: [0, 'Total cost cannot be negative']
  },
  
  // Quality control
  qualityRating: {
    type: Number,
    min: 1,
    max: 5
  },
  qualityNotes: {
    type: String,
    trim: true,
    maxlength: [300, 'Quality notes cannot exceed 300 characters']
  },
  
  // Expiry information
  expiryDate: {
    type: Date
  },
  batchNumber: {
    type: String,
    trim: true
  },
  
  // Damage/Loss tracking
  damagedQuantity: {
    type: Number,
    default: 0,
    min: [0, 'Damaged quantity cannot be negative']
  },
  damageReason: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const purchaseOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: [true, 'Purchase order number is required']
  },
  
  // Supplier Information
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Supplier is required']
  },
  supplierInfo: {
    companyName: String,
    contactPerson: String,
    email: String,
    phone: String,
    address: String
  },
  
  // Order Items
  orderItems: [purchaseItemSchema],
  
  // Financial Information
  subtotal: {
    type: Number,
    required: [true, 'Subtotal is required'],
    min: [0, 'Subtotal cannot be negative']
  },
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  shippingCost: {
    type: Number,
    default: 0,
    min: [0, 'Shipping cost cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  
  // Order Status
  status: {
    type: String,
    enum: ['draft', 'sent', 'confirmed', 'partially-received', 'received', 'completed', 'cancelled'],
    default: 'draft'
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
  
  // Dates
  orderDate: {
    type: Date,
    default: Date.now
  },
  expectedDeliveryDate: {
    type: Date,
    required: [true, 'Expected delivery date is required']
  },
  actualDeliveryDate: {
    type: Date
  },
  
  // Payment Information
  paymentTerms: {
    type: String,
    enum: ['cash-on-delivery', 'net-7', 'net-15', 'net-30', 'advance-payment'],
    default: 'cash-on-delivery'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'overdue'],
    default: 'pending'
  },
  paymentDueDate: {
    type: Date
  },
  amountPaid: {
    type: Number,
    default: 0,
    min: [0, 'Amount paid cannot be negative']
  },
  paymentHistory: [{
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    paymentDate: {
      type: Date,
      default: Date.now
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'bank-transfer', 'cheque', 'mobile-money'],
      required: true
    },
    reference: {
      type: String,
      trim: true
    },
    notes: {
      type: String,
      trim: true
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Delivery Information
  deliveryAddress: {
    type: String,
    required: [true, 'Delivery address is required'],
    trim: true
  },
  deliveryInstructions: {
    type: String,
    trim: true,
    maxlength: [300, 'Delivery instructions cannot exceed 300 characters']
  },
  
  // Staff Assignment
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Created by is required']
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receivedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Additional Information
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  internalNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Internal notes cannot exceed 500 characters']
  },
  
  // Priority
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  
  // Recurring order information
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringFrequency: {
    type: String,
    enum: ['weekly', 'bi-weekly', 'monthly', 'quarterly'],
    required: function() {
      return this.isRecurring;
    }
  },
  nextOrderDate: {
    type: Date
  },
  
  // Quality and Performance Tracking
  overallQualityRating: {
    type: Number,
    min: 1,
    max: 5
  },
  deliveryRating: {
    type: Number,
    min: 1,
    max: 5
  },
  supplierPerformanceNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Performance notes cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
purchaseOrderSchema.index({ orderNumber: 1 });
purchaseOrderSchema.index({ supplier: 1 });
purchaseOrderSchema.index({ status: 1 });
purchaseOrderSchema.index({ orderDate: -1 });
purchaseOrderSchema.index({ expectedDeliveryDate: 1 });
purchaseOrderSchema.index({ paymentStatus: 1 });
purchaseOrderSchema.index({ createdBy: 1 });

// Compound indexes
purchaseOrderSchema.index({ supplier: 1, status: 1 });
purchaseOrderSchema.index({ status: 1, orderDate: -1 });
purchaseOrderSchema.index({ paymentStatus: 1, paymentDueDate: 1 });

// Virtual for days until delivery
purchaseOrderSchema.virtual('daysUntilDelivery').get(function() {
  if (!this.expectedDeliveryDate) return null;
  const today = new Date();
  const deliveryDate = new Date(this.expectedDeliveryDate);
  const diffTime = deliveryDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for total items count
purchaseOrderSchema.virtual('totalItems').get(function() {
  return this.orderItems.reduce((total, item) => total + item.quantityOrdered, 0);
});

// Virtual for received items count
purchaseOrderSchema.virtual('totalReceived').get(function() {
  return this.orderItems.reduce((total, item) => total + item.quantityReceived, 0);
});

// Virtual for completion percentage
purchaseOrderSchema.virtual('completionPercentage').get(function() {
  const totalOrdered = this.totalItems;
  const totalReceived = this.totalReceived;
  return totalOrdered > 0 ? Math.round((totalReceived / totalOrdered) * 100) : 0;
});

// Virtual for outstanding balance
purchaseOrderSchema.virtual('outstandingBalance').get(function() {
  return Math.max(0, this.totalAmount - this.amountPaid);
});

// Virtual for payment status description
purchaseOrderSchema.virtual('paymentStatusDescription').get(function() {
  const balance = this.outstandingBalance;
  if (balance === 0) return 'Fully Paid';
  if (this.amountPaid > 0) return `Partial Payment (₦${balance.toLocaleString()} remaining)`;
  return `Unpaid (₦${this.totalAmount.toLocaleString()})`;
});

// Pre-save middleware to generate order number
purchaseOrderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    // Find the last purchase order number for today
    const lastOrder = await this.constructor.findOne({
      orderNumber: new RegExp(`^PO${year}${month}${day}`)
    }).sort({ orderNumber: -1 });
    
    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }
    
    this.orderNumber = `PO${year}${month}${day}${sequence.toString().padStart(4, '0')}`;
  }
  next();
});

// Pre-save middleware to calculate totals
purchaseOrderSchema.pre('save', function(next) {
  // Calculate subtotal
  this.subtotal = this.orderItems.reduce((total, item) => total + item.totalCost, 0);
  
  // Calculate total amount
  this.totalAmount = this.subtotal + this.tax + this.shippingCost - this.discount;
  
  // Set payment due date based on payment terms
  if (this.isModified('paymentTerms') || this.isNew) {
    const deliveryDate = this.actualDeliveryDate || this.expectedDeliveryDate || new Date();
    
    switch (this.paymentTerms) {
      case 'cash-on-delivery':
        this.paymentDueDate = deliveryDate;
        break;
      case 'net-7':
        this.paymentDueDate = new Date(deliveryDate.getTime() + (7 * 24 * 60 * 60 * 1000));
        break;
      case 'net-15':
        this.paymentDueDate = new Date(deliveryDate.getTime() + (15 * 24 * 60 * 60 * 1000));
        break;
      case 'net-30':
        this.paymentDueDate = new Date(deliveryDate.getTime() + (30 * 24 * 60 * 60 * 1000));
        break;
      case 'advance-payment':
        this.paymentDueDate = this.orderDate;
        break;
    }
  }
  
  next();
});

// Pre-save middleware to update status history
purchaseOrderSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date()
    });
  }
  next();
});

// Pre-save middleware to update payment status
purchaseOrderSchema.pre('save', function(next) {
  const totalPaid = this.amountPaid;
  const totalAmount = this.totalAmount;
  
  if (totalPaid === 0) {
    this.paymentStatus = 'pending';
  } else if (totalPaid >= totalAmount) {
    this.paymentStatus = 'paid';
  } else {
    this.paymentStatus = 'partial';
  }
  
  // Check for overdue payments
  if (this.paymentStatus !== 'paid' && this.paymentDueDate && new Date() > this.paymentDueDate) {
    this.paymentStatus = 'overdue';
  }
  
  next();
});

// Static method to get purchase order statistics
purchaseOrderSchema.statics.getStatistics = async function(dateRange = {}) {
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
        totalValue: { $sum: '$totalAmount' },
        averageOrderValue: { $avg: '$totalAmount' },
        pendingOrders: {
          $sum: { $cond: [{ $in: ['$status', ['draft', 'sent', 'confirmed']] }, 1, 0] }
        },
        completedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        overduePayments: {
          $sum: { $cond: [{ $eq: ['$paymentStatus', 'overdue'] }, 1, 0] }
        }
      }
    }
  ]);
};

// Method to add payment
purchaseOrderSchema.methods.addPayment = function(paymentData) {
  const { amount, paymentMethod, reference, notes, recordedBy } = paymentData;
  
  if (amount <= 0) {
    throw new Error('Payment amount must be greater than 0');
  }
  
  if (this.amountPaid + amount > this.totalAmount) {
    throw new Error('Payment amount exceeds outstanding balance');
  }
  
  this.paymentHistory.push({
    amount,
    paymentMethod,
    reference,
    notes,
    recordedBy
  });
  
  this.amountPaid += amount;
  
  return this.save();
};

// Method to receive items
purchaseOrderSchema.methods.receiveItems = async function(receivedItems, receivedBy) {
  try {
    const Product = mongoose.model('Product');
    const StockMovement = mongoose.model('StockMovement');
    
    for (const receivedItem of receivedItems) {
      const orderItem = this.orderItems.id(receivedItem.itemId);
      if (!orderItem) {
        throw new Error(`Order item not found: ${receivedItem.itemId}`);
      }
      
      // Update received quantity
      orderItem.quantityReceived += receivedItem.quantityReceived;
      orderItem.qualityRating = receivedItem.qualityRating;
      orderItem.qualityNotes = receivedItem.qualityNotes;
      orderItem.damagedQuantity = receivedItem.damagedQuantity || 0;
      orderItem.damageReason = receivedItem.damageReason;
      
      // Update product stock
      const product = await Product.findById(orderItem.product);
      if (product) {
        const goodQuantity = receivedItem.quantityReceived - (receivedItem.damagedQuantity || 0);
        await product.updateVariantStock(orderItem.variantId, goodQuantity, 'add');
        
        // Record stock movement
        await StockMovement.create({
          product: orderItem.product,
          variantId: orderItem.variantId,
          movementType: 'purchase',
          quantityChanged: goodQuantity,
          reference: this.orderNumber,
          reason: 'Purchase order received',
          performedBy: receivedBy,
          notes: receivedItem.qualityNotes
        });
      }
    }
    
    // Update order status based on completion
    const totalOrdered = this.totalItems;
    const totalReceived = this.totalReceived;
    
    if (totalReceived >= totalOrdered) {
      this.status = 'received';
      this.actualDeliveryDate = new Date();
    } else if (totalReceived > 0) {
      this.status = 'partially-received';
    }
    
    this.receivedBy = receivedBy;
    
    return await this.save();
  } catch (error) {
    throw error;
  }
};

// Method to cancel order
purchaseOrderSchema.methods.cancelOrder = function(reason, cancelledBy) {
  if (!['draft', 'sent', 'confirmed'].includes(this.status)) {
    throw new Error('Cannot cancel order in current status');
  }
  
  this.status = 'cancelled';
  this.notes = `${this.notes || ''}\nCancelled: ${reason}`.trim();
  
  this.statusHistory.push({
    status: 'cancelled',
    timestamp: new Date(),
    updatedBy: cancelledBy,
    notes: reason
  });
  
  return this.save();
};

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);