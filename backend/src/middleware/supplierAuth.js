const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Supplier = require('../models/Supplier');
const { AppError } = require('./errorHandler');

// Middleware to protect supplier routes
const supplierAuth = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
      return next(new AppError('Not authorized to access this route', 401));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return next(new AppError('No user found with this token', 401));
      }

      // Check if user is a supplier
      if (user.role !== 'supplier') {
        return next(new AppError('Not authorized as supplier', 403));
      }

      // Check if user is active
      if (!user.isActive) {
        return next(new AppError('User account is deactivated', 401));
      }

      // Get supplier profile
      const supplier = await Supplier.findOne({ user: user._id });
      if (!supplier) {
        return next(new AppError('Supplier profile not found', 404));
      }

      // Check if supplier is active
      if (!supplier.isActive) {
        return next(new AppError('Supplier account is deactivated', 401));
      }

      // Add user and supplier to request
      req.user = {
        userId: user._id,
        role: user.role,
        supplierId: supplier._id,
        isVerified: supplier.isVerified
      };

      next();
    } catch (error) {
      return next(new AppError('Not authorized to access this route', 401));
    }
  } catch (error) {
    next(error);
  }
};

// Middleware to check if supplier is verified
const requireVerifiedSupplier = (req, res, next) => {
  if (!req.user.isVerified) {
    return next(new AppError('Supplier account must be verified to perform this action', 403));
  }
  next();
};

module.exports = {
  supplierAuth,
  requireVerifiedSupplier
};