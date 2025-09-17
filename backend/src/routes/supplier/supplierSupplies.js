const express = require('express');
const router = express.Router();
const {
  createSupply,
  getSupplyHistory,
  getSupplyDetails,
  updateSupply,
  confirmSupplyDelivery,
  getSupplyAnalytics
} = require('../../controllers/supplier/supplierSupplyController');
const { auth } = require('../../middleware/auth');

// @route   POST /api/supplier/supplies
// @desc    Create new supply
// @access  Private
router.post('/', auth, createSupply);

// @route   GET /api/supplier/supplies
// @desc    Get supplier's supply history
// @access  Private
router.get('/', auth, getSupplyHistory);

// @route   GET /api/supplier/supplies/analytics
// @desc    Get supply analytics
// @access  Private
router.get('/analytics', auth, getSupplyAnalytics);

// @route   GET /api/supplier/supplies/:id
// @desc    Get single supply details
// @access  Private
router.get('/:id', auth, getSupplyDetails);

// @route   PUT /api/supplier/supplies/:id
// @desc    Update supply
// @access  Private
router.put('/:id', auth, updateSupply);

// @route   PUT /api/supplier/supplies/:id/confirm
// @desc    Confirm supply delivery
// @access  Private
router.put('/:id/confirm', auth, confirmSupplyDelivery);

module.exports = router;