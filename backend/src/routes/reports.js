const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// @desc    Get reports
// @route   GET /api/reports
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Reports endpoint - will be implemented in Phase 2",
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching reports",
    });
  }
});

module.exports = router;
