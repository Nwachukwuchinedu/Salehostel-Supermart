const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");

// @desc    Get all active categories (public)
// @route   GET /api/public/categories
// @access  Public
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select("name description image slug")
      .sort({ name: 1 });

    res.json({
      success: true,
      categories,
      count: categories.length,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
    });
  }
});

// @desc    Get single category by slug (public)
// @route   GET /api/public/categories/:slug
// @access  Public
router.get("/:slug", async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      isActive: true,
    }).select("name description image slug");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching category",
    });
  }
});

module.exports = router;
