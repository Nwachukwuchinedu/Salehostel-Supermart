const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
    price: {
      type: Number,
      min: 0
    },
    totalPrice: {
      type: Number,
      min: 0
    }
  }],
  subtotal: {
    type: Number,
    default: 0,
    min: 0
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
cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate item totalPrice and cart subtotal before saving
cartSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    // Calculate totalPrice for each item if price is available
    this.items.forEach(item => {
      if (item.price && item.quantity) {
        item.totalPrice = item.price * item.quantity;
      }
    });
    
    // Calculate subtotal
    this.subtotal = this.items.reduce((total, item) => {
      return total + (item.totalPrice || 0);
    }, 0);
  } else {
    this.subtotal = 0;
  }
  next();
});

module.exports = mongoose.model('Cart', cartSchema);