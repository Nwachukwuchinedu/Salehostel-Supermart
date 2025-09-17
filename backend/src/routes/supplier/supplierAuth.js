const express = require('express');
const router = express.Router();
const {
  registerSupplier,
  loginSupplier,
  getSupplierProfile,
  updateSupplierProfile,
  changePassword
} = require('../../controllers/supplier/supplierAuthController');
const { auth, supplierAuth } = require('../../middleware/auth');
const { validateSupplierRegistration, validateLogin } = require('../../middleware/validation');

// @route   POST /api/supplier/auth/register
// @desc    Register new supplier
// @access  Public
router.post('/register', validateSupplierRegistration, registerSupplier);

// @route   POST /api/supplier/auth/login
// @desc    Login supplier
// @access  Public
router.post('/login', validateLogin, loginSupplier);

// @route   GET /api/supplier/auth/profile
// @desc    Get supplier profile
// @access  Private
router.get('/profile', auth, getSupplierProfile);

// @route   PUT /api/supplier/auth/profile
// @desc    Update supplier profile
// @access  Private
router.put('/profile', auth, updateSupplierProfile);

// @route   PUT /api/supplier/auth/change-password
// @desc    Change password
// @access  Private
router.put('/change-password', auth, changePassword);

module.exports = router;