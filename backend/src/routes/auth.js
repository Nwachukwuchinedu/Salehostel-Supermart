const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    Universal login for all user types
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, userType } = req.body;

    // Find user by email and role
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      role: userType,
      isActive: true 
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials or user type'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        status: 'error',
        message: 'Account is temporarily locked due to too many failed login attempts'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      // Increment login attempts
      await user.incLoginAttempts();
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Prepare user data (exclude sensitive fields)
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      whatsappNumber: user.whatsappNumber,
      callNumber: user.callNumber,
      isActive: user.isActive,
      createdAt: user.createdAt
    };

    // Add role-specific data
    if (user.role === 'supplier' && user.supplierInfo) {
      userData.supplierInfo = user.supplierInfo;
    }
    
    if (user.role === 'staff' && user.staffInfo) {
      userData.staffInfo = user.staffInfo;
    }

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

// Validation middleware
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('userType')
    .isIn(['admin', 'supplier', 'staff', 'customer'])
    .withMessage('Invalid user type')
];

// Routes
router.post('/login', loginValidation, login);

module.exports = router;