const express = require('express');
const router = express.Router();
const { 
  getOrders,
  getOrder,
  updateOrderStatus,
  processRefund,
  getOrderAnalytics
} = require('../../controllers/admin/adminOrderController');
const { protect, admin } = require('../../middleware/adminAuth');

router.route('/')
  .get(protect, admin, getOrders);

router.route('/analytics')
  .get(protect, admin, getOrderAnalytics);

router.route('/:id')
  .get(protect, admin, getOrder);

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

router.route('/:id/refund')
  .post(protect, admin, processRefund);

module.exports = router;