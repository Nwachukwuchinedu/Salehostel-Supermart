const express = require('express');
const router = express.Router();
const {
  getSupplies,
  getSupply,
  receiveSupply,
  cancelSupply,
  getSupplyStats
} = require('../../controllers/admin/adminSupplyController');
const { protect, admin } = require('../../middleware/adminAuth');

// All routes are protected and require admin role
router.use(protect);
router.use(admin);

// @route   GET /api/admin/supplies/stats
// @desc    Get supply statistics (Admin view)
// @access  Private (Admin)
router.get('/stats', getSupplyStats);

// @route   GET /api/admin/supplies
// @desc    Get all supplies (Admin view)
// @access  Private (Admin)
router.get('/', getSupplies);

// @route   GET /api/admin/supplies/:id
// @desc    Get single supply (Admin view)
// @access  Private (Admin)
router.get('/:id', getSupply);

// @route   PUT /api/admin/supplies/:id/receive
// @desc    Receive supply (Admin action)
// @access  Private (Admin)
router.put('/:id/receive', receiveSupply);

// @route   PUT /api/admin/supplies/:id/cancel
// @desc    Cancel supply (Admin action)
// @access  Private (Admin)
router.put('/:id/cancel', cancelSupply);

module.exports = router;
