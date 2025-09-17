const Product = require('../../models/Product');
const Supplier = require('../../models/Supplier');
const { AppError } = require('../../middleware/errorHandler');

// @desc    Get products supplied by supplier
// @route   GET /api/supplier/products
// @access  Private (Supplier)
const getSupplierProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, category, status } = req.query;

    // Get supplier profile
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    // Build query
    let query = { supplier: supplier._id };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (category) {
      query.productGroup = category;
    }

    if (status) {
      query.isActive = status === 'active';
    }

    // Execute query with pagination
    const products = await Product.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product details
// @route   GET /api/supplier/products/:id
// @access  Private (Supplier)
const getProductDetails = async (req, res, next) => {
  try {
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const product = await Product.findOne({
      _id: req.params.id,
      supplier: supplier._id
    }).populate('category', 'name');

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add new product
// @route   POST /api/supplier/products
// @access  Private (Supplier)
const addProduct = async (req, res, next) => {
  try {
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const productData = {
      ...req.body,
      supplier: supplier._id,
      createdBy: req.user.userId
    };

    const product = await Product.create(productData);

    // Update supplier's supplied categories if new category
    if (!supplier.suppliedCategories.includes(product.productGroup)) {
      supplier.suppliedCategories.push(product.productGroup);
      await supplier.save();
    }

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/supplier/products/:id
// @access  Private (Supplier)
const updateProduct = async (req, res, next) => {
  try {
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        supplier: supplier._id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product prices
// @route   PUT /api/supplier/products/:id/prices
// @access  Private (Supplier)
const updateProductPrices = async (req, res, next) => {
  try {
    const { variants } = req.body;
    
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const product = await Product.findOne({
      _id: req.params.id,
      supplier: supplier._id
    });

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Update variant prices
    variants.forEach(variantUpdate => {
      const variant = product.variants.id(variantUpdate.variantId);
      if (variant) {
        if (variantUpdate.price !== undefined) {
          variant.price = variantUpdate.price;
        }
        if (variantUpdate.costPrice !== undefined) {
          variant.costPrice = variantUpdate.costPrice;
        }
      }
    });

    await product.save();

    res.json({
      success: true,
      message: 'Product prices updated successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/supplier/products/:id
// @access  Private (Supplier)
const deleteProduct = async (req, res, next) => {
  try {
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      supplier: supplier._id
    });

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product performance analytics
// @route   GET /api/supplier/products/:id/analytics
// @access  Private (Supplier)
const getProductAnalytics = async (req, res, next) => {
  try {
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const product = await Product.findOne({
      _id: req.params.id,
      supplier: supplier._id
    });

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Get analytics data (this would typically come from order/sales data)
    const analytics = {
      totalSales: 0,
      totalRevenue: 0,
      averageOrderQuantity: 0,
      stockTurnover: 0,
      popularVariants: [],
      salesTrend: []
    };

    res.json({
      success: true,
      data: {
        product,
        analytics
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSupplierProducts,
  getProductDetails,
  addProduct,
  updateProduct,
  updateProductPrices,
  deleteProduct,
  getProductAnalytics
};