const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AppError } = require('./errorHandler');

// Middleware to protect staff routes
const staffAuth = async (req, res, next) => {
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

      // Check if user is staff
      if (user.role !== 'staff') {
        return next(new AppError('Not authorized as staff', 403));
      }

      // Check if user is active
      if (!user.isActive) {
        return next(new AppError('User account is deactivated', 401));
      }

      // Check if staff account is active
      if (!user.staffInfo?.isActive) {
        return next(new AppError('Staff account is deactivated', 401));
      }

      // Add user to request
      req.user = {
        userId: user._id,
        role: user.role,
        employeeId: user.staffInfo?.employeeId,
        permissions: user.staffInfo?.permissions || []
      };

      next();
    } catch (error) {
      return next(new AppError('Not authorized to access this route', 401));
    }
  } catch (error) {
    next(error);
  }
};

// Middleware to check specific staff permissions
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      return next(new AppError(`Permission required: ${permission}`, 403));
    }
    next();
  };
};

// Middleware to check multiple permissions (user needs at least one)
const requireAnyPermission = (permissions) => {
  return (req, res, next) => {
    const hasPermission = permissions.some(permission => 
      req.user.permissions.includes(permission)
    );
    
    if (!hasPermission) {
      return next(new AppError(`One of these permissions required: ${permissions.join(', ')}`, 403));
    }
    next();
  };
};

// Middleware to check if staff can manage orders
const canManageOrders = requireAnyPermission(['manage_orders', 'process_orders', 'view_orders']);

// Middleware to check if staff can manage inventory
const canManageInventory = requireAnyPermission(['manage_inventory', 'update_stock', 'view_inventory']);

// Middleware to check if staff can handle payments
const canHandlePayments = requirePermission('handle_payments');

module.exports = {
  staffAuth,
  requirePermission,
  requireAnyPermission,
  canManageOrders,
  canManageInventory,
  canHandlePayments
};