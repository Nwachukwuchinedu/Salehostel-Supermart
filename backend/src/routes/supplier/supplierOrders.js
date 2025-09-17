const express = require('express');
const router = express.Router();
const {
  getPurchaseOrders,
  getPurchaseOrderDetails,
  confirmPurchaseOrder,
  updateDeliveryStatus,
  rejectPurchaseOrder,
  getOrderAnalytics
} = require('../../controllers/supplier/supplierOrderController');
const { auth } = require('../../middleware/auth');

// @route   GET /api/supplier/orders
// @desc    Get purchase orders for supplier
// @access  Private
router.get('/', auth, getPurchaseOrders);

// @route   GET /api/supplier/orders/analytics
// @desc    Get order analytics for supplier
// @access  Private
router.get('/analytics', auth, getOrderAnalytics);

// @route   GET /api/supplier/orders/:id
// @desc    Get single purchase order details
// @access  Private
router.get('/:id', auth, getPurchaseOrderDetails);

// @route   PUT /api/supplier/orders/:id/confirm
// @desc    Confirm purchase order
// @access  Private
router.put('/:id/confirm', auth, confirmPurchaseOrder);

// @route   PUT /api/supplier/orders/:id/delivery
// @desc    Update order delivery status
// @access  Private
router.put('/:id/delivery', auth, updateDeliveryStatus);

// @route   PUT /api/supplier/orders/:id/reject
// @desc    Reject purchase order
// @access  Private
router.put('/:id/reject', auth, rejectPurchaseOrder);

module.exports = router;