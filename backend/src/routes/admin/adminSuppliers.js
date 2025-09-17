const express = require("express");
const router = express.Router();
const {
  getSuppliers,
  getSupplierDetails,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  verifySupplier,
  getSupplierPerformance,
  getSupplierAnalytics,
} = require("../../controllers/admin/adminSupplierController");
const { auth, adminAuth } = require("../../middleware/auth");
const { upload } = require("../../middleware/upload");

// @route   GET /api/admin/suppliers
// @desc    Get all suppliers
// @access  Private (Admin)
router.get("/", auth, getSuppliers);

// @route   GET /api/admin/suppliers/analytics
// @desc    Get supplier analytics
// @access  Private (Admin)
router.get("/analytics", auth, getSupplierAnalytics);

// @route   POST /api/admin/suppliers
// @desc    Create new supplier
// @access  Private (Admin)
router.post("/", auth, upload.array("documents", 5), createSupplier);

// @route   GET /api/admin/suppliers/:id
// @desc    Get single supplier details
// @access  Private (Admin)
router.get("/:id", auth, getSupplierDetails);

// @route   PUT /api/admin/suppliers/:id
// @desc    Update supplier
// @access  Private (Admin)
router.put("/:id", auth, upload.array("documents", 5), updateSupplier);

// @route   DELETE /api/admin/suppliers/:id
// @desc    Delete supplier
// @access  Private (Admin)
router.delete("/:id", auth, deleteSupplier);

// @route   PUT /api/admin/suppliers/:id/verify
// @desc    Verify supplier
// @access  Private (Admin)
router.put("/:id/verify", auth, verifySupplier);

// @route   GET /api/admin/suppliers/:id/performance
// @desc    Get supplier performance metrics
// @access  Private (Admin)
router.get("/:id/performance", auth, getSupplierPerformance);

module.exports = router;
