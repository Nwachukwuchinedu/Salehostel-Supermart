const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// @desc    Get orders
// @route   GET /api/orders
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Orders endpoint - will be implemented in Phase 2",
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
    });
  }
});

module.exports = router;
