const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  logout, 
  getProfile, 
  updateProfile, 
  forgotPassword, 
  resetPassword 
} = require('../../controllers/customer/customerAuthController');
const { protect, customer } = require('../../middleware/customerAuth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Private routes
router.post('/logout', protect, customer, logout);
router.route('/profile')
  .get(protect, customer, getProfile)
  .put(protect, customer, updateProfile);

module.exports = router;