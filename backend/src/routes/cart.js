const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    res.json({
      success: true,
      items: [],
      message: "Cart endpoint - will be implemented in Phase 2",
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching cart",
    });
  }
});

module.exports = router;
