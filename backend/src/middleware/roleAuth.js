const User = require("../models/User");

/**
 * Role-based authorization middleware
 * @param {...string} roles - Allowed roles
 */
const requireRole = (...roles) => {
  return async (req, res, next) => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      // Find user to get current role (in case it changed)
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check if user's role is in the allowed roles
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${roles.join(", ")}`,
        });
      }

      // Update req.user with fresh user data
      req.user = user;
      next();
    } catch (error) {
      console.error("Role authorization error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during authorization",
      });
    }
  };
};

module.exports = requireRole;