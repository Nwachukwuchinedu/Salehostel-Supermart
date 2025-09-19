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

// Routes for / (cart root)
router.route('/')
  .get(protect, customer, getCart)      // Get cart (protected)
  .post(addToCart)                      // Add to cart (public)
  .delete(clearCart);                   // Clear cart (public)

// Routes for /:productId (specific items)
router.route('/:productId')
  .put(updateCart)                      // Update item (public)
  .delete(removeFromCart);              // Remove item (public)

module.exports = router;