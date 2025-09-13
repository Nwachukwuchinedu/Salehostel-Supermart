const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('../../config/env');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

// @desc    Admin login
// @route   POST /api/admin/auth/login
// @access  Public
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (user && (user.role === 'admin' || user.role === 'super_admin') && (await user.comparePassword(password))) {
      res.json({
        success: true,
        admin: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
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

// @desc    Admin logout
// @route   POST /api/admin/auth/logout
// @access  Private
const adminLogout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// @desc    Get admin profile
// @route   GET /api/admin/auth/profile
// @access  Private
const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user._id).select('-password');
    res.json({ admin });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update admin profile
// @route   PUT /api/admin/auth/profile
// @access  Private
const updateAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user._id);

    if (admin) {
      admin.name = req.body.name || admin.name;
      admin.email = req.body.email || admin.email;

      const updatedAdmin = await admin.save();

      res.json({
        success: true,
        admin: {
          _id: updatedAdmin._id,
          name: updatedAdmin.name,
          email: updatedAdmin.email,
          role: updatedAdmin.role,
        },
        token: generateToken(updatedAdmin._id),
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  adminLogin,
  adminLogout,
  getAdminProfile,
  updateAdminProfile,
};