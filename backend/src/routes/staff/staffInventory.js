const express = require('express');
const router = express.Router();
const {
  getInventoryOverview,
  updateStock,
  getLowStockAlerts,
  getStockMovements,
  performStockCount,
  searchInventory,
  getInventorySummary
} = require('../../controllers/staff/staffInventoryController');
const { auth } = require('../../middleware/auth');

// @route   GET /api/staff/inventory
// @desc    Get inventory overview for staff
// @access  Private
router.get('/', auth, getInventoryOverview);

// @route   GET /api/staff/inventory/summary
// @desc    Get inventory summary for dashboard
// @access  Private
router.get('/summary', auth, getInventorySummary);

// @route   GET /api/staff/inventory/alerts
// @desc    Get low stock alerts
// @access  Private
router.get('/alerts', auth, getLowStockAlerts);

// @route   GET /api/staff/inventory/movements
// @desc    Get stock movements
// @access  Private
router.get('/movements', auth, getStockMovements);

// @route   GET /api/staff/inventory/search
// @desc    Search inventory
// @access  Private
router.get('/search', auth, searchInventory);

// @route   PUT /api/staff/inventory/:id/stock
// @desc    Update stock levels
// @access  Private
router.put('/:id/stock', auth, updateStock);

// @route   POST /api/staff/inventory/stock-count
// @desc    Perform stock count/audit
// @access  Private
router.post('/stock-count', auth, performStockCount);

module.exports = router;