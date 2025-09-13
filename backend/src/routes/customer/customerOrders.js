const express = require('express');
const router = express.Router();
const { 
  getOrders,
  createOrder,
  getOrder,
  trackOrder
} = require('../../controllers/customer/customerOrderController');
const { protect, customer } = require('../../middleware/customerAuth');

router.route('/')
  .get(protect, customer, getOrders)
  .post(protect, customer, createOrder);

router.route('/:id')
  .get(protect, customer, getOrder);

router.route('/:id/track')
  .get(protect, customer, trackOrder);

module.exports = router;