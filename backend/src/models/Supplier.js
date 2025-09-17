const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      trim: true
    }
  },
  businessInfo: {
    registrationNumber: {
      type: String,
      trim: true
    },
    taxId: {
      type: String,
      trim: true
    },
    businessType: {
      type: String,
      enum: ['Individual', 'Partnership', 'Corporation', 'LLC', 'Other'],
      default: 'Individual'
    }
  },
  contactDetails: {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    whatsapp: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    }
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    zipCode: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      required: true,
      default: 'Nigeria',
      trim: true
    }
  },
  suppliedCategories: [{
    type: String,
    required: true
  }],
  paymentTerms: {
    type: String,
    enum: ['Cash on Delivery', 'Net 7', 'Net 15', 'Net 30', 'Net 60', 'Custom'],
    default: 'Cash on Delivery'
  },
  customPaymentTerms: {
    type: String,
    trim: true
  },
  creditLimit: {
    type: Number,
    default: 0,
    min: 0
  },
  currentBalance: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  performance: {
    totalSupplies: {
      type: Number,
      default: 0
    },
    totalValue: {
      type: Number,
      default: 0
    },
    onTimeDeliveries: {
      type: Number,
      default: 0
    },
    lateDeliveries: {
      type: Number,
      default: 0
    },
    qualityScore: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    }
  },
  bankDetails: {
    bankName: {
      type: String,
      trim: true
    },
    accountName: {
      type: String,
      trim: true
    },
    accountNumber: {
      type: String,
      trim: true
    },
    routingNumber: {
      type: String,
      trim: true
    }
  },
  documents: [{
    type: {
      type: String,
      enum: ['Business Registration', 'Tax Certificate', 'Bank Statement', 'Other'],
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedAt: {
    type: Date
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
supplierSchema.index({ companyName: 1 });
supplierSchema.index({ 'contactDetails.email': 1 });
supplierSchema.index({ suppliedCategories: 1 });
supplierSchema.index({ isActive: 1 });
supplierSchema.index({ rating: -1 });

// Virtual for full contact person name
supplierSchema.virtual('contactPersonName').get(function() {
  return `${this.contactPerson.firstName} ${this.contactPerson.lastName}`;
});

// Virtual for delivery performance percentage
supplierSchema.virtual('deliveryPerformance').get(function() {
  const total = this.performance.onTimeDeliveries + this.performance.lateDeliveries;
  if (total === 0) return 100;
  return Math.round((this.performance.onTimeDeliveries / total) * 100);
});

// Method to update performance metrics
supplierSchema.methods.updatePerformance = function(supplyData) {
  this.performance.totalSupplies += 1;
  this.performance.totalValue += supplyData.totalAmount;
  
  if (supplyData.isOnTime) {
    this.performance.onTimeDeliveries += 1;
  } else {
    this.performance.lateDeliveries += 1;
  }
  
  return this.save();
};

// Method to verify supplier
supplierSchema.methods.verify = function(verifiedBy) {
  this.isVerified = true;
  this.verifiedAt = new Date();
  this.verifiedBy = verifiedBy;
  return this.save();
};

module.exports = mongoose.model('Supplier', supplierSchema);