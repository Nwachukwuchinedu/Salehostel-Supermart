const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// @desc    Get users
// @route   GET /api/users
// @access  Private (Admin only)
router.get("/", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access users",
      });
    }

    res.json({
      success: true,
      message: "Users endpoint - will be implemented in Phase 2",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    });
  }
});

module.exports = router;
