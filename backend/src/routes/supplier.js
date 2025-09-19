const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const requireRole = require("../middleware/roleAuth");
const { getDashboard } = require("../controllers/supplier/supplierDashboardController");

// Supplier routes
// All routes in this file are protected and require supplier role
router.use(auth, requireRole("supplier"));

// @desc    Get supplier dashboard
// @route   GET /api/supplier/dashboard
// @access  Private (Supplier only)
router.get("/dashboard", getDashboard);

module.exports = router;