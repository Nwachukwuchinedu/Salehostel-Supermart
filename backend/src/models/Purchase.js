const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  supplier: {
    type: String,
    required: [true, 'Supplier is required'],
    trim: true
  },
  supplierContact: {
    name: String,
    email: String,
    phone: String
  },
  purchaseOrderNumber: {
    type: String,
    required: [true, 'Purchase order number is required'],
    unique: true,
    trim: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
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
  status: {
    type: String,
    enum: ['pending', 'ordered', 'received', 'cancelled'],
    default: 'pending'
  },
  expectedDeliveryDate: Date,
  actualDeliveryDate: Date,
  notes: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt field before saving
purchaseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate total amount before saving
purchaseSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    this.totalAmount = this.items.reduce((total, item) => total + item.totalPrice, 0);
  }
  next();
});

module.exports = mongoose.model('Purchase', purchaseSchema);