const mongoose = require('mongoose');

const supplySchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  supplyItems: [{
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
    quantitySupplied: {
      type: Number,
      required: true,
      min: 0
    },
    unitCostPrice: {
      type: Number,
      required: true,
      min: 0
    },
    totalCost: {
      type: Number,
      required: true,
      min: 0
    },
    expiryDate: {
      type: Date
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  supplyDate: {
    type: Date,
    default: Date.now
  },
  supplyTime: {
    type: Date,
    default: Date.now
  },
  receivedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Received', 'Verified'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Partial', 'Paid'],
    default: 'Pending'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for better query performance
supplySchema.index({ supplier: 1, supplyDate: -1 });
supplySchema.index({ status: 1 });
supplySchema.index({ paymentStatus: 1 });

// Virtual for supply reference number
supplySchema.virtual('supplyNumber').get(function() {
  return `SUP-${this.supplyDate.getFullYear()}-${String(this._id).slice(-6).toUpperCase()}`;
});

// Pre-save middleware to calculate total amount
supplySchema.pre('save', function(next) {
  if (this.supplyItems && this.supplyItems.length > 0) {
    this.totalAmount = this.supplyItems.reduce((total, item) => {
      item.totalCost = item.quantitySupplied * item.unitCostPrice;
      return total + item.totalCost;
    }, 0);
  }
  next();
});

module.exports = mongoose.model('Supply', supplySchema);