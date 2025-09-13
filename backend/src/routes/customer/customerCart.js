const express = require('express');
const router = express.Router();
const { 
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart
} = require('../../controllers/customer/customerCartController');
const { protect, customer } = require('../../middleware/customerAuth');

router.route('/')
  .get(protect, customer, getCart)
  .post(protect, customer, addToCart)
  .delete(protect, customer, clearCart);

router.route('/:productId')
  .put(protect, customer, updateCart)
  .delete(protect, customer, removeFromCart);

module.exports = router;