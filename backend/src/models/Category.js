const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  image: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: '#6b7280', // Default gray color
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color']
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // SEO fields
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
  
  // Statistics
  productCount: {
    type: Number,
    default: 0,
    min: 0
  },
  totalSales: {
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
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
categorySchema.index({ name: 1 });
categorySchema.index({ slug: 1 });
categorySchema.index({ isActive: 1 });
categorySchema.index({ isFeatured: 1 });
categorySchema.index({ displayOrder: 1 });
categorySchema.index({ parentCategory: 1 });

// Virtual for full category path
categorySchema.virtual('fullPath').get(function() {
  // This would need to be populated with parent data
  return this.name;
});

// Pre-save middleware to generate slug
categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim('-'); // Remove leading/trailing hyphens
  }
  next();
});

// Pre-save middleware to validate parent category
categorySchema.pre('save', async function(next) {
  if (this.parentCategory) {
    // Check if parent category exists and is active
    const parent = await this.constructor.findById(this.parentCategory);
    if (!parent || !parent.isActive) {
      return next(new Error('Invalid parent category'));
    }
    
    // Prevent circular references
    if (parent.parentCategory && parent.parentCategory.toString() === this._id.toString()) {
      return next(new Error('Circular reference detected in category hierarchy'));
    }
  }
  next();
});

// Post-save middleware to update parent's subcategories
categorySchema.post('save', async function(doc) {
  if (doc.parentCategory) {
    await this.constructor.findByIdAndUpdate(
      doc.parentCategory,
      { $addToSet: { subcategories: doc._id } }
    );
  }
});

// Pre-remove middleware to handle subcategories and products
categorySchema.pre('remove', async function(next) {
  try {
    // Check if category has products
    const Product = mongoose.model('Product');
    const productCount = await Product.countDocuments({ category: this._id });
    
    if (productCount > 0) {
      return next(new Error('Cannot delete category with existing products'));
    }
    
    // Remove from parent's subcategories
    if (this.parentCategory) {
      await this.constructor.findByIdAndUpdate(
        this.parentCategory,
        { $pull: { subcategories: this._id } }
      );
    }
    
    // Handle subcategories (set their parent to null or delete them)
    await this.constructor.updateMany(
      { parentCategory: this._id },
      { $unset: { parentCategory: 1 } }
    );
    
    next();
  } catch (error) {
    next(error);
  }
});

// Static method to get category hierarchy
categorySchema.statics.getHierarchy = async function() {
  const categories = await this.find({ isActive: true })
    .sort({ displayOrder: 1, name: 1 })
    .populate('subcategories', 'name slug isActive displayOrder');
  
  // Build hierarchy tree
  const rootCategories = categories.filter(cat => !cat.parentCategory);
  
  const buildTree = (parentId) => {
    return categories
      .filter(cat => cat.parentCategory && cat.parentCategory.toString() === parentId.toString())
      .map(cat => ({
        ...cat.toObject(),
        children: buildTree(cat._id)
      }));
  };
  
  return rootCategories.map(cat => ({
    ...cat.toObject(),
    children: buildTree(cat._id)
  }));
};

// Static method to get featured categories
categorySchema.statics.getFeatured = function() {
  return this.find({ 
    isActive: true, 
    isFeatured: true 
  }).sort({ displayOrder: 1, name: 1 });
};

// Static method to search categories
categorySchema.statics.search = function(query) {
  const searchRegex = new RegExp(query, 'i');
  return this.find({
    isActive: true,
    $or: [
      { name: searchRegex },
      { description: searchRegex }
    ]
  }).sort({ name: 1 });
};

// Method to update product count
categorySchema.methods.updateProductCount = async function() {
  const Product = mongoose.model('Product');
  const count = await Product.countDocuments({ 
    category: this._id,
    isActive: true 
  });
  
  this.productCount = count;
  return this.save();
};

// Method to get breadcrumb path
categorySchema.methods.getBreadcrumb = async function() {
  const breadcrumb = [{ name: this.name, slug: this.slug, _id: this._id }];
  
  let current = this;
  while (current.parentCategory) {
    current = await this.constructor.findById(current.parentCategory);
    if (current) {
      breadcrumb.unshift({ 
        name: current.name, 
        slug: current.slug, 
        _id: current._id 
      });
    } else {
      break;
    }
  }
  
  return breadcrumb;
};

module.exports = mongoose.model('Category', categorySchema);