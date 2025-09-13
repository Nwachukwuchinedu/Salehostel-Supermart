const Product = require('../../models/Product');
const Category = require('../../models/Category');

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Private
const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single product
// @route   GET /api/admin/products/:id
// @access  Private
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');

    if (product) {
      res.json({
        success: true,
        product,
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create product
// @route   POST /api/admin/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      shortDescription: req.body.shortDescription,
      category: req.body.category,
      brand: req.body.brand,
      sku: req.body.sku,
      barcode: req.body.barcode,
      sellingPrice: req.body.sellingPrice,
      costPrice: req.body.costPrice,
      salePrice: req.body.salePrice,
      onSale: req.body.onSale,
      currentStock: req.body.currentStock,
      minStockLevel: req.body.minStockLevel,
      maxStockLevel: req.body.maxStockLevel,
      unit: req.body.unit,
      featured: req.body.featured,
      tags: req.body.tags,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      isActive: req.body.isActive,
      isPublished: req.body.isPublished,
      createdBy: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json({
      success: true,
      product: createdProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.shortDescription = req.body.shortDescription || product.shortDescription;
      product.category = req.body.category || product.category;
      product.brand = req.body.brand || product.brand;
      product.sku = req.body.sku || product.sku;
      product.barcode = req.body.barcode || product.barcode;
      product.sellingPrice = req.body.sellingPrice || product.sellingPrice;
      product.costPrice = req.body.costPrice || product.costPrice;
      product.salePrice = req.body.salePrice || product.salePrice;
      product.onSale = req.body.onSale || product.onSale;
      product.currentStock = req.body.currentStock || product.currentStock;
      product.minStockLevel = req.body.minStockLevel || product.minStockLevel;
      product.maxStockLevel = req.body.maxStockLevel || product.maxStockLevel;
      product.unit = req.body.unit || product.unit;
      product.featured = req.body.featured || product.featured;
      product.tags = req.body.tags || product.tags;
      product.metaTitle = req.body.metaTitle || product.metaTitle;
      product.metaDescription = req.body.metaDescription || product.metaDescription;
      product.isActive = req.body.isActive || product.isActive;
      product.isPublished = req.body.isPublished || product.isPublished;

      const updatedProduct = await product.save();
      res.json({
        success: true,
        product: updatedProduct,
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all categories
// @route   GET /api/admin/categories
// @access  Private
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create category
// @route   POST /api/admin/categories
// @access  Private
const createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      isActive: req.body.isActive,
      parentCategory: req.body.parentCategory,
    });

    const createdCategory = await category.save();
    res.status(201).json({
      success: true,
      category: createdCategory,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update category
// @route   PUT /api/admin/categories/:id
// @access  Private
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      category.name = req.body.name || category.name;
      category.description = req.body.description || category.description;
      category.image = req.body.image || category.image;
      category.isActive = req.body.isActive || category.isActive;
      category.parentCategory = req.body.parentCategory || category.parentCategory;

      const updatedCategory = await category.save();
      res.json({
        success: true,
        category: updatedCategory,
      });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete category
// @route   DELETE /api/admin/categories/:id
// @access  Private
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      await category.remove();
      res.json({ message: 'Category removed' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};