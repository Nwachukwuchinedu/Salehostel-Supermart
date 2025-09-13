const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('../../config/env');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

// @desc    Customer registration
// @route   POST /api/customer/auth/register
// @access  Public
const register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = new User({
      name,
      email,
      password,
      role: 'customer',
      phone
    });

    const createdUser = await user.save();

    res.status(201).json({
      success: true,
      customer: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        phone: createdUser.phone,
      },
      token: generateToken(createdUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Customer login
// @route   POST /api/customer/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (user && user.role === 'customer' && (await user.comparePassword(password))) {
      res.json({
        success: true,
        customer: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Customer logout
// @route   POST /api/customer/auth/logout
// @access  Private
const logout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// @desc    Get customer profile
// @route   GET /api/customer/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const customer = await User.findById(req.user._id).select('-password');
    res.json({ customer });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update customer profile
// @route   PUT /api/customer/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const customer = await User.findById(req.user._id);

    if (customer) {
      customer.name = req.body.name || customer.name;
      customer.email = req.body.email || customer.email;
      customer.phone = req.body.phone || customer.phone;
      customer.address = req.body.address || customer.address;

      const updatedCustomer = await customer.save();

      res.json({
        success: true,
        customer: {
          _id: updatedCustomer._id,
          name: updatedCustomer.name,
          email: updatedCustomer.email,
          phone: updatedCustomer.phone,
          address: updatedCustomer.address,
        },
        token: generateToken(updatedCustomer._id),
      });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Forgot password
// @route   POST /api/customer/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  // Implementation would integrate with email service
  res.json({ message: 'Password reset instructions sent to your email' });
};

// @desc    Reset password
// @route   POST /api/customer/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  // Implementation would handle password reset with token
  res.json({ message: 'Password reset successfully' });
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
};