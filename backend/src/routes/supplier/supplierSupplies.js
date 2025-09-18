const express = require('express');
const router = express.Router();
const {
  getSupplies,
  getSupply,
  createSupply,
  updateSupply,
  cancelSupply,
  getSupplyStats
} = require('../../controllers/supplier/supplierSupplyController');
const { protect, supplier } = require('../../middleware/supplierAuth');

// All routes are protected and require supplier role
router.use(protect);
router.use(supplier);

// @route   GET /api/supplier/supplies/stats
// @desc    Get supply statistics for supplier
// @access  Private (Supplier)
router.get('/stats', getSupplyStats);

// @route   GET /api/supplier/supplies
// @desc    Get all supplies for supplier
// @access  Private (Supplier)
router.get('/', getSupplies);

// @route   GET /api/supplier/supplies/:id
// @desc    Get single supply
// @access  Private (Supplier)
router.get('/:id', getSupply);

// @route   POST /api/supplier/supplies
// @desc    Create new supply
// @access  Private (Supplier)
router.post('/', createSupply);

// @route   PUT /api/supplier/supplies/:id
// @desc    Update supply
// @access  Private (Supplier)
router.put('/:id', updateSupply);

// @route   PUT /api/supplier/supplies/:id/cancel
// @desc    Cancel supply
// @access  Private (Supplier)
router.put('/:id/cancel', cancelSupply);

module.exports = router;
