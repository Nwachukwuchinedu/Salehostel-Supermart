const mongoose = require('mongoose');

const stockMovementSchema = new mongoose.Schema({
  // Product Information
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required']
  },
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Variant ID is required']
  },
  
  // Product snapshot at time of movement
  productSnapshot: {
    name: {
      type: String,
      required: true
    },
    packageType: {
      type: String,
      required: true
    },
    sku: String,
    category: String
  },
  
  // Movement Details
  movementType: {
    type: String,
    enum: [
      'purchase',        // Stock received from supplier
      'sale',           // Stock sold to customer
      'adjustment',     // Manual stock adjustment
      'return',         // Customer return
      'damage',         // Damaged goods
      'expired',        // Expired products
      'transfer',       // Transfer between locations
      'audit',          // Stock audit adjustment
      'promotion',      // Promotional giveaway
      'sample'          // Free samples
    ],
    required: [true, 'Movement type is required']
  },
  
  // Quantity Information
  quantityBefore: {
    type: Number,
    required: [true, 'Quantity before is required'],
    min: [0, 'Quantity before cannot be negative']
  },
  quantityChanged: {
    type: Number,
    required: [true, 'Quantity changed is required']
    // Can be positive (increase) or negative (decrease)
  },
  quantityAfter: {
    type: Number,
    required: [true, 'Quantity after is required'],
    min: [0, 'Quantity after cannot be negative']
  },
  
  // Reference Information
  reference: {
    type: String,
    trim: true,
    maxlength: [100, 'Reference cannot exceed 100 characters']
  },
  referenceType: {
    type: String,
    enum: ['order', 'purchase-order', 'manual', 'system', 'return', 'audit'],
    default: 'manual'
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId
  },
  
  // Reason and Notes
  reason: {
    type: String,
    required: [true, 'Reason is required'],
    trim: true,
    maxlength: [200, 'Reason cannot exceed 200 characters']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  
  // Cost Information (for financial tracking)
  unitCost: {
    type: Number,
    min: [0, 'Unit cost cannot be negative']
  },
  totalCost: {
    type: Number,
    min: [0, 'Total cost cannot be negative']
  },
  
  // Staff Information
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Performed by is required']
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Timing
  movementDate: {
    type: Date,
    default: Date.now,
    required: [true, 'Movement date is required']
  },
  
  // Location Information (for future multi-location support)
  location: {
    type: String,
    default: 'NDDC Hostel - Shop 12',
    trim: true
  },
  
  // Batch/Expiry Information
  batchNumber: {
    type: String,
    trim: true
  },
  expiryDate: {
    type: Date
  },
  
  // Quality Information
  qualityStatus: {
    type: String,
    enum: ['good', 'damaged', 'expired', 'returned'],
    default: 'good'
  },
  
  // System Information
  isSystemGenerated: {
    type: Boolean,
    default: false
  },
  source: {
    type: String,
    enum: ['manual', 'order', 'purchase', 'audit', 'system'],
    default: 'manual'
  },
  
  // Reversal Information
  isReversed: {
    type: Boolean,
    default: false
  },
  reversedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reversalReason: {
    type: String,
    trim: true
  },
  reversalDate: {
    type: Date
  },
  originalMovement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StockMovement'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
stockMovementSchema.index({ product: 1, movementDate: -1 });
stockMovementSchema.index({ variantId: 1, movementDate: -1 });
stockMovementSchema.index({ movementType: 1, movementDate: -1 });
stockMovementSchema.index({ performedBy: 1, movementDate: -1 });
stockMovementSchema.index({ reference: 1 });
stockMovementSchema.index({ referenceId: 1 });
stockMovementSchema.index({ movementDate: -1 });
stockMovementSchema.index({ isReversed: 1 });

// Compound indexes
stockMovementSchema.index({ product: 1, variantId: 1, movementDate: -1 });
stockMovementSchema.index({ movementType: 1, product: 1 });
stockMovementSchema.index({ performedBy: 1, movementType: 1 });

// Virtual for movement direction
stockMovementSchema.virtual('direction').get(function() {
  return this.quantityChanged > 0 ? 'in' : 'out';
});

// Virtual for absolute quantity changed
stockMovementSchema.virtual('absoluteQuantity').get(function() {
  return Math.abs(this.quantityChanged);
});

// Virtual for movement description
stockMovementSchema.virtual('description').get(function() {
  const direction = this.direction === 'in' ? 'Added' : 'Removed';
  const quantity = this.absoluteQuantity;
  const product = this.productSnapshot.name;
  const packageType = this.productSnapshot.packageType;
  
  return `${direction} ${quantity} ${packageType} of ${product}`;
});

// Virtual for financial impact
stockMovementSchema.virtual('financialImpact').get(function() {
  if (!this.unitCost) return 0;
  return this.quantityChanged * this.unitCost;
});

// Pre-save middleware to calculate total cost
stockMovementSchema.pre('save', function(next) {
  if (this.unitCost && this.quantityChanged) {
    this.totalCost = Math.abs(this.quantityChanged) * this.unitCost;
  }
  next();
});

// Pre-save middleware to populate product snapshot
stockMovementSchema.pre('save', async function(next) {
  if (this.isNew && this.product) {
    try {
      const Product = mongoose.model('Product');
      const product = await Product.findById(this.product).populate('category', 'name');
      
      if (product) {
        const variant = product.variants.id(this.variantId);
        if (variant) {
          this.productSnapshot = {
            name: product.name,
            packageType: variant.packageType,
            sku: variant.sku,
            category: product.category ? product.category.name : 'Unknown'
          };
        }
      }
    } catch (error) {
      console.error('Error populating product snapshot:', error);
    }
  }
  next();
});

// Static method to record stock movement
stockMovementSchema.statics.recordMovement = async function(movementData) {
  const {
    product,
    variantId,
    movementType,
    quantityChanged,
    reason,
    performedBy,
    reference,
    referenceType,
    referenceId,
    notes,
    unitCost,
    batchNumber,
    expiryDate,
    qualityStatus = 'good',
    source = 'manual'
  } = movementData;

  try {
    // Get current product stock
    const Product = mongoose.model('Product');
    const productDoc = await Product.findById(product);
    
    if (!productDoc) {
      throw new Error('Product not found');
    }
    
    const variant = productDoc.variants.id(variantId);
    if (!variant) {
      throw new Error('Product variant not found');
    }
    
    const quantityBefore = variant.currentStock;
    const quantityAfter = Math.max(0, quantityBefore + quantityChanged);
    
    // Create stock movement record
    const movement = new this({
      product,
      variantId,
      movementType,
      quantityBefore,
      quantityChanged,
      quantityAfter,
      reason,
      performedBy,
      reference,
      referenceType,
      referenceId,
      notes,
      unitCost,
      batchNumber,
      expiryDate,
      qualityStatus,
      source,
      isSystemGenerated: source === 'system'
    });
    
    await movement.save();
    
    // Update product stock
    variant.currentStock = quantityAfter;
    productDoc.lastStockUpdate = new Date();
    await productDoc.save();
    
    return movement;
  } catch (error) {
    throw error;
  }
};

// Static method to get stock movements for a product
stockMovementSchema.statics.getProductMovements = function(productId, variantId = null, options = {}) {
  const {
    startDate,
    endDate,
    movementType,
    limit = 50,
    skip = 0
  } = options;
  
  const filter = { product: productId };
  
  if (variantId) {
    filter.variantId = variantId;
  }
  
  if (startDate || endDate) {
    filter.movementDate = {};
    if (startDate) filter.movementDate.$gte = new Date(startDate);
    if (endDate) filter.movementDate.$lte = new Date(endDate);
  }
  
  if (movementType) {
    filter.movementType = movementType;
  }
  
  return this.find(filter)
    .populate('performedBy', 'firstName lastName')
    .populate('approvedBy', 'firstName lastName')
    .sort({ movementDate: -1 })
    .limit(limit)
    .skip(skip);
};

// Static method to get stock movement summary
stockMovementSchema.statics.getMovementSummary = async function(filters = {}) {
  const {
    startDate,
    endDate,
    productId,
    movementType,
    performedBy
  } = filters;
  
  const matchStage = {};
  
  if (startDate || endDate) {
    matchStage.movementDate = {};
    if (startDate) matchStage.movementDate.$gte = new Date(startDate);
    if (endDate) matchStage.movementDate.$lte = new Date(endDate);
  }
  
  if (productId) matchStage.product = mongoose.Types.ObjectId(productId);
  if (movementType) matchStage.movementType = movementType;
  if (performedBy) matchStage.performedBy = mongoose.Types.ObjectId(performedBy);
  
  return await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$movementType',
        totalMovements: { $sum: 1 },
        totalQuantityIn: {
          $sum: { $cond: [{ $gt: ['$quantityChanged', 0] }, '$quantityChanged', 0] }
        },
        totalQuantityOut: {
          $sum: { $cond: [{ $lt: ['$quantityChanged', 0] }, { $abs: '$quantityChanged' }, 0] }
        },
        totalValue: { $sum: '$totalCost' }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};

// Static method to get low stock alerts based on movements
stockMovementSchema.statics.getLowStockAlerts = async function() {
  return await this.aggregate([
    {
      $group: {
        _id: { product: '$product', variantId: '$variantId' },
        currentStock: { $last: '$quantityAfter' },
        lastMovement: { $last: '$movementDate' }
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id.product',
        foreignField: '_id',
        as: 'product'
      }
    },
    { $unwind: '$product' },
    {
      $addFields: {
        variant: {
          $arrayElemAt: [
            {
              $filter: {
                input: '$product.variants',
                cond: { $eq: ['$$this._id', '$_id.variantId'] }
              }
            },
            0
          ]
        }
      }
    },
    {
      $match: {
        $expr: { $lte: ['$currentStock', '$variant.minStockLevel'] }
      }
    },
    {
      $project: {
        productName: '$product.name',
        packageType: '$variant.packageType',
        currentStock: 1,
        minStockLevel: '$variant.minStockLevel',
        lastMovement: 1
      }
    }
  ]);
};

// Method to reverse this movement
stockMovementSchema.methods.reverse = async function(reversedBy, reason) {
  if (this.isReversed) {
    throw new Error('Movement has already been reversed');
  }
  
  try {
    // Create reverse movement
    const reverseMovement = await this.constructor.recordMovement({
      product: this.product,
      variantId: this.variantId,
      movementType: 'adjustment',
      quantityChanged: -this.quantityChanged,
      reason: `Reversal: ${reason}`,
      performedBy: reversedBy,
      reference: `REV-${this.reference || this._id}`,
      referenceType: 'manual',
      notes: `Reversal of movement ${this._id}`,
      source: 'manual'
    });
    
    // Mark original movement as reversed
    this.isReversed = true;
    this.reversedBy = reversedBy;
    this.reversalReason = reason;
    this.reversalDate = new Date();
    
    await this.save();
    
    return reverseMovement;
  } catch (error) {
    throw error;
  }
};

// Static method to cleanup old movements (for data retention)
stockMovementSchema.statics.cleanupOldMovements = async function(retentionDays = 365) {
  const cutoffDate = new Date(Date.now() - (retentionDays * 24 * 60 * 60 * 1000));
  
  // Only delete non-critical movements older than retention period
  const result = await this.deleteMany({
    movementDate: { $lt: cutoffDate },
    movementType: { $in: ['audit', 'adjustment'] },
    isReversed: false
  });
  
  return result.deletedCount;
};

module.exports = mongoose.model('StockMovement', stockMovementSchema);