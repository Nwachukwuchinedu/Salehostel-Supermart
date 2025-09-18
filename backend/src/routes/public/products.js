const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const Category = require("../../models/Category");

// @desc    Get all active products (public)
// @route   GET /api/public/products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      minPrice,
      maxPrice,
      sortBy = "name",
      sortOrder = "asc",
      featured,
    } = req.query;

    // Build query
    const query = { isActive: true };

    // Category filter
    if (category) {
      query.category = category;
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Price filter
    if (minPrice || maxPrice) {
      query["units.price"] = {};
      if (minPrice) query["units.price"].$gte = Number(minPrice);
      if (maxPrice) query["units.price"].$lte = Number(maxPrice);
    }

    // Featured filter
    if (featured === "true") {
      query.featured = true;
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .populate("category", "name slug")
      .select("name description images units category tags featured")
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
});

// @desc    Get single product by ID (public)
// @route   GET /api/public/products/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    }).populate("category", "name slug description");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching product",
    });
  }
});

// @desc    Get products by category (public)
// @route   GET /api/public/products/category/:categoryId
// @access  Public
router.get("/category/:categoryId", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;

    // Verify category exists
    const category = await Category.findOne({
      _id: req.params.categoryId,
      isActive: true,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Build query
    const query = {
      category: req.params.categoryId,
      isActive: true,
    };

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .populate("category", "name slug")
      .select("name description images units category tags")
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      products,
      category,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
});

// @desc    Search products (public)
// @route   GET /api/public/products/search
// @access  Public
router.get("/search", async (req, res) => {
  try {
    const {
      q: searchQuery,
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // Build query
    const query = {
      isActive: true,
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { tags: { $in: [new RegExp(searchQuery, "i")] } },
      ],
    };

    // Category filter
    if (category) {
      query.category = category;
    }

    // Price filter
    if (minPrice || maxPrice) {
      query["units.price"] = {};
      if (minPrice) query["units.price"].$gte = Number(minPrice);
      if (maxPrice) query["units.price"].$lte = Number(maxPrice);
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .populate("category", "name slug")
      .select("name description images units category tags")
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      products,
      searchQuery,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while searching products",
    });
  }
});

module.exports = router;
