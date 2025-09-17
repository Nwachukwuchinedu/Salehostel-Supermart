const jwt = require('jsonwebtoken');
const User = require('../models/User');

// General authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password -refreshTokens');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token. User not found.'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Account is deactivated. Please contact administrator.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired. Please login again.'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Authentication error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Role-based authorization middleware factory
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: `Access denied. Required role: ${roles.join(' or ')}`
      });
    }

    next();
  };
};

// Admin authorization middleware
const adminAuth = [auth, authorize('admin')];

// Supplier authorization middleware
const supplierAuth = [auth, authorize('supplier')];

// Staff authorization middleware
const staffAuth = [auth, authorize('staff')];

// Customer authorization middleware
const customerAuth = [auth, authorize('customer')];

// Admin or Staff authorization middleware
const adminOrStaffAuth = [auth, authorize('admin', 'staff')];

// Admin or Supplier authorization middleware
const adminOrSupplierAuth = [auth, authorize('admin', 'supplier')];

// Optional authentication middleware (for public endpoints that can benefit from user context)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password -refreshTokens');
      
      if (user && user.isActive) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Ignore authentication errors for optional auth
    next();
  }
};

// Permission-based authorization middleware
const hasPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    // Admin has all permissions
    if (req.user.role === 'admin') {
      return next();
    }

    // Check staff permissions
    if (req.user.role === 'staff') {
      const staffPermissions = req.user.staffInfo?.permissions || [];
      
      if (!staffPermissions.includes(permission)) {
        return res.status(403).json({
          status: 'error',
          message: `Access denied. Required permission: ${permission}`
        });
      }
    } else {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. Insufficient permissions.'
      });
    }

    next();
  };
};

// Resource ownership middleware (for users accessing their own resources)
const ownerOrAdmin = (resourceUserField = 'user') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    // Admin can access any resource
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if user owns the resource
    const resourceUserId = req.params.userId || req.body[resourceUserField] || req.query[resourceUserField];
    
    if (resourceUserId && resourceUserId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. You can only access your own resources.'
      });
    }

    next();
  };
};

// Supplier resource access middleware
const supplierResourceAuth = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    // Admin can access any supplier resource
    if (req.user.role === 'admin') {
      return next();
    }

    // Supplier can only access their own resources
    if (req.user.role === 'supplier') {
      const supplierId = req.params.supplierId || req.body.supplier || req.query.supplier;
      
      if (supplierId && supplierId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Access denied. You can only access your own supplier resources.'
        });
      }
      
      return next();
    }

    res.status(403).json({
      status: 'error',
      message: 'Access denied. Insufficient permissions.'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Authorization error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Rate limiting for authentication endpoints
const authRateLimit = (req, res, next) => {
  // This would typically use a more sophisticated rate limiting solution
  // For now, we'll rely on the global rate limiter
  next();
};

// Refresh token middleware
const refreshTokenAuth = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({
        status: 'error',
        message: 'Refresh token is required'
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid refresh token'
      });
    }

    // Check if refresh token exists in user's token list
    const tokenExists = user.refreshTokens.some(tokenObj => tokenObj.token === refreshToken);
    
    if (!tokenExists) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid refresh token'
      });
    }

    req.user = user;
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid or expired refresh token'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Refresh token validation error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  auth,
  authorize,
  adminAuth,
  supplierAuth,
  staffAuth,
  customerAuth,
  adminOrStaffAuth,
  adminOrSupplierAuth,
  optionalAuth,
  hasPermission,
  ownerOrAdmin,
  supplierResourceAuth,
  authRateLimit,
  refreshTokenAuth
};