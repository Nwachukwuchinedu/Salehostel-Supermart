const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    packageType: {
      type: String,
      required: true
    },
    quantityRequested: {
      type: Number,
      required: true,
      min: 1
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  expectedDelivery: {
    type: Date
  },
  actualDelivery: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Draft', 'Sent', 'Confirmed', 'Delivered', 'Cancelled'],
    default: 'Draft'
  },
  notes: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  confirmedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  confirmedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
purchaseOrderSchema.index({ supplier: 1, orderDate: -1 });
purchaseOrderSchema.index({ status: 1 });
purchaseOrderSchema.index({ orderNumber: 1 });
purchaseOrderSchema.index({ createdBy: 1 });

// Pre-save middleware to generate order number
purchaseOrderSchema.pre('save', function(next) {
  if (this.isNew && !this.orderNumber) {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    this.orderNumber = `PO-${year}${month}-${random}`;
  }
  
  // Calculate total amount
  if (this.orderItems && this.orderItems.length > 0) {
    this.totalAmount = this.orderItems.reduce((total, item) => {
      item.totalPrice = item.quantityRequested * item.unitPrice;
      return total + item.totalPrice;
    }, 0);
  }
  
  next();
});

// Method to confirm order
purchaseOrderSchema.methods.confirmOrder = function(userId) {
  this.status = 'Confirmed';
  this.confirmedBy = userId;
  this.confirmedAt = new Date();
  return this.save();
};

// Method to mark as delivered
purchaseOrderSchema.methods.markDelivered = function() {
  this.status = 'Delivered';
  this.actualDelivery = new Date();
  return this.save();
};

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);