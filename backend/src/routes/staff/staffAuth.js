const express = require('express');
const router = express.Router();
const {
  loginStaff,
  getStaffProfile,
  updateStaffProfile,
  changePassword,
  clockInOut,
  getClockHistory
} = require('../../controllers/staff/staffAuthController');
const { auth } = require('../../middleware/auth');
const { validateLogin } = require('../../middleware/validation');

// @route   POST /api/staff/auth/login
// @desc    Login staff
// @access  Public
router.post('/login', validateLogin, loginStaff);

// @route   GET /api/staff/auth/profile
// @desc    Get staff profile
// @access  Private
router.get('/profile', auth, getStaffProfile);

// @route   PUT /api/staff/auth/profile
// @desc    Update staff profile
// @access  Private
router.put('/profile', auth, updateStaffProfile);

// @route   PUT /api/staff/auth/change-password
// @desc    Change password
// @access  Private
router.put('/change-password', auth, changePassword);

// @route   POST /api/staff/auth/clock
// @desc    Clock in/out for shift tracking
// @access  Private
router.post('/clock', auth, clockInOut);

// @route   GET /api/staff/auth/clock-history
// @desc    Get clock history
// @access  Private
router.get('/clock-history', auth, getClockHistory);

module.exports = router;