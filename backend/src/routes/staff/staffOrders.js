const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrderDetails,
  updateOrderStatus,
  assignOrder,
  createWalkInOrder,
  processPayment,
  getStaffPerformance,
  getOrderQueue
} = require('../../controllers/staff/staffOrderController');
const { auth } = require('../../middleware/auth');

// @route   GET /api/staff/orders
// @desc    Get orders for staff to process
// @access  Private
router.get('/', auth, getOrders);

// @route   GET /api/staff/orders/queue
// @desc    Get order queue (orders waiting to be processed)
// @access  Private
router.get('/queue', auth, getOrderQueue);

// @route   GET /api/staff/orders/performance
// @desc    Get staff performance metrics
// @access  Private
router.get('/performance', auth, getStaffPerformance);

// @route   POST /api/staff/orders
// @desc    Create walk-in order
// @access  Private
router.post('/', auth, createWalkInOrder);

// @route   GET /api/staff/orders/:id
// @desc    Get single order details
// @access  Private
router.get('/:id', auth, getOrderDetails);

// @route   PUT /api/staff/orders/:id/status
// @desc    Update order status
// @access  Private
router.put('/:id/status', auth, updateOrderStatus);

// @route   PUT /api/staff/orders/:id/assign
// @desc    Assign order to staff member
// @access  Private
router.put('/:id/assign', auth, assignOrder);

// @route   PUT /api/staff/orders/:id/payment
// @desc    Process order payment
// @access  Private
router.put('/:id/payment', auth, processPayment);

module.exports = router;