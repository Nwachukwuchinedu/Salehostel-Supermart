const Product = require('../../models/Product');
const Category = require('../../models/Category');

// @desc    Get products for shop (public)
// @route   GET /api/customer/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 12;
    const page = Number(req.query.page) || 1;
    
    const filter = { 
      isActive: true,
      isPublished: true
    };
    
    // Apply category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    // Apply featured filter
    if (req.query.featured) {
      filter.featured = req.query.featured === 'true';
    }
    
    // Apply on sale filter
    if (req.query.onSale) {
      filter.onSale = req.query.onSale === 'true';
    }
    
    // Apply price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      filter.sellingPrice = {};
      if (req.query.minPrice) {
        filter.sellingPrice.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filter.sellingPrice.$lte = Number(req.query.maxPrice);
      }
    }
    
    // Apply search
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [req.query.search] } }
      ];
    }
    
    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    
    res.json({
      success: true,
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single product (public)
// @route   GET /api/customer/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
      isPublished: true
    }).populate('category', 'name');
    
    if (product) {
      res.json({
        success: true,
        product
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Search products (public)
// @route   GET /api/customer/products/search
// @access  Public
const searchProducts = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const filter = {
      isActive: true,
      isPublished: true,
      $text: { $search: q }
    };
    
    // Apply category filter
    if (category) {
      filter.category = category;
    }
    
    // Apply price range filter
    if (minPrice || maxPrice) {
      filter.sellingPrice = {};
      if (minPrice) {
        filter.sellingPrice.$gte = Number(minPrice);
      }
      if (maxPrice) {
        filter.sellingPrice.$lte = Number(maxPrice);
      }
    }
    
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    const products = await Product.find(filter)
      .populate('category', 'name')
      .sort(sort);
    
    res.json({
      success: true,
      products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get categories (public)
// @route   GET /api/customer/products/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get featured products
// @route   GET /api/customer/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
      isPublished: true,
      featured: true
    })
    .populate('category', 'name')
    .limit(8)
    .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProducts,
  getProduct,
  searchProducts,
  getCategories,
  getFeaturedProducts
};