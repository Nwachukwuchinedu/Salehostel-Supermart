const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { asyncHandler, sendSuccess, createBusinessError } = require('../../middleware/errorHandler');
const { validationResult } = require('express-validator');

/**
 * @desc    Admin login
 * @route   POST /api/admin/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by credentials
    const user = await User.findByCredentials(email, password);
    
    // Check if user is admin
    if (user.role !== 'admin') {
      throw createBusinessError('Access denied. Admin privileges required.', 403);
    }

    // Generate tokens
    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    
    // Save refresh token
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    // Remove sensitive data
    const userResponse = user.toJSON();
    delete userResponse.refreshTokens;

    sendSuccess(res, {
      user: userResponse,
      token,
      refreshToken
    }, 'Login successful');

  } catch (error) {
    throw error;
  }
});

/**
 * @desc    Get admin profile
 * @route   GET /api/admin/auth/profile
 * @access  Private (Admin)
 */
const getProfile = asyncHandler(async (req, res) => {
  sendSuccess(res, req.user, 'Profile retrieved successfully');
});

/**
 * @desc    Update admin profile
 * @route   PUT /api/admin/auth/profile
 * @access  Private (Admin)
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, whatsappNumber, callNumber, dateOfBirth, gender } = req.body;

  const user = await User.findById(req.user._id);
  
  if (!user) {
    throw createBusinessError('User not found', 404);
  }

  // Update fields
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (whatsappNumber) user.whatsappNumber = whatsappNumber;
  if (callNumber) user.callNumber = callNumber;
  if (dateOfBirth) user.dateOfBirth = dateOfBirth;
  if (gender) user.gender = gender;

  await user.save();

  sendSuccess(res, user, 'Profile updated successfully');
});

/**
 * @desc    Change admin password
 * @route   PUT /api/admin/auth/change-password
 * @access  Private (Admin)
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, password } = req.body;

  const user = await User.findById(req.user._id).select('+password');
  
  if (!user) {
    throw createBusinessError('User not found', 404);
  }

  // Verify current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    throw createBusinessError('Current password is incorrect', 400);
  }

  // Update password
  user.password = password;
  await user.save();

  sendSuccess(res, null, 'Password changed successfully');
});

/**
 * @desc    Admin logout
 * @route   POST /api/admin/auth/logout
 * @access  Private (Admin)
 */
const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    // Remove refresh token from user's token list
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { refreshTokens: { token: refreshToken } }
    });
  }

  sendSuccess(res, null, 'Logged out successfully');
});

/**
 * @desc    Refresh admin token
 * @route   POST /api/admin/auth/refresh
 * @access  Public
 */
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    throw createBusinessError('Refresh token is required', 400);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user || user.role !== 'admin') {
      throw createBusinessError('Invalid refresh token', 401);
    }

    // Check if refresh token exists in user's token list
    const tokenExists = user.refreshTokens.some(tokenObj => tokenObj.token === token);
    
    if (!tokenExists) {
      throw createBusinessError('Invalid refresh token', 401);
    }

    // Generate new tokens
    const newToken = user.generateAuthToken();
    const newRefreshToken = user.generateRefreshToken();
    
    // Replace old refresh token with new one
    user.refreshTokens = user.refreshTokens.filter(tokenObj => tokenObj.token !== token);
    user.refreshTokens.push({ token: newRefreshToken });
    await user.save();

    sendSuccess(res, {
      token: newToken,
      refreshToken: newRefreshToken
    }, 'Token refreshed successfully');

  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      throw createBusinessError('Invalid or expired refresh token', 401);
    }
    throw error;
  }
});

/**
 * @desc    Get admin dashboard stats
 * @route   GET /api/admin/auth/dashboard-stats
 * @access  Private (Admin)
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const Order = require('../../models/Order');
  const Product = require('../../models/Product');
  const InventoryService = require('../../services/inventoryService');

  // Get today's date range
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

  const [
    todayOrders,
    todayRevenue,
    totalProducts,
    lowStockCount,
    inventoryValue
  ] = await Promise.all([
    Order.countDocuments({
      orderDate: { $gte: startOfDay, $lt: endOfDay },
      status: { $ne: 'cancelled' }
    }),
    Order.aggregate([
      {
        $match: {
          orderDate: { $gte: startOfDay, $lt: endOfDay },
          status: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]),
    Product.countDocuments({ isActive: true }),
    Product.getLowStock().then(products => products.length),
    InventoryService.calculateInventoryValue()
  ]);

  const stats = {
    todayOrders,
    todayRevenue: todayRevenue[0]?.total || 0,
    totalProducts,
    lowStockCount,
    inventoryValue: inventoryValue.totalValue || 0
  };

  sendSuccess(res, stats, 'Dashboard stats retrieved successfully');
});

module.exports = {
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  refreshToken,
  getDashboardStats
};