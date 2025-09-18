const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// @desc    Get inventory overview
// @route   GET /api/inventory
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Inventory endpoint - will be implemented in Phase 2",
    });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching inventory",
    });
  }
});

module.exports = router;
