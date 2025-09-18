const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// @desc    Get all products (protected)
// @route   GET /api/products
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate("category", "name slug")
      .sort({ name: 1 });

    res.json({
      success: true,
      products,
      count: products.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin/Supplier only)
router.post("/", auth, async (req, res) => {
  try {
    // Check if user has permission to create products
    if (!["admin", "supplier"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to create products",
      });
    }

    const product = new Product({
      ...req.body,
      createdBy: req.user.userId,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating product",
    });
  }
});

module.exports = router;
