const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/env');

const customerAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (req.user && req.user.role === 'customer') {
        next();
      } else {
        res.status(403).json({ message: 'Not authorized as customer' });
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = customerAuth;