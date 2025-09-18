const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Find user and add to request
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }
};

module.exports = auth;