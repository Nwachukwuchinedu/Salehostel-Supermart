const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const requireRole = require("../middleware/roleAuth");
const { getDashboard } = require("../controllers/staff/staffDashboardController");

// Staff routes
// All routes in this file are protected and require staff role
router.use(auth, requireRole("staff"));

// @desc    Get staff dashboard
// @route   GET /api/staff/dashboard
// @access  Private (Staff only)
router.get("/dashboard", getDashboard);

module.exports = router;