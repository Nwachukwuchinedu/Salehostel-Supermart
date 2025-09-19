const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('../../config/env');
const bcrypt = require('bcryptjs');
const { validateEmail, validatePhone } = require('../../utils/validators');

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @desc    Customer registration
// @route   POST /api/customer/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      whatsappNumber,
      callNumber,
    } = req.body;

    // Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !whatsappNumber ||
      !callNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate phone numbers
    if (!validatePhone(whatsappNumber)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid WhatsApp number",
      });
    }

    if (!validatePhone(callNumber)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid call number",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      whatsappNumber: whatsappNumber.trim(),
      callNumber: callNumber.trim(),
      role: "customer",
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// @desc    Customer login
// @route   POST /api/customer/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ email: email.toLowerCase(), isActive: true });

    if (user && (await user.comparePassword(password))) {
      // Check if user is actually a customer
      if (user.role !== 'customer') {
        return res.status(403).json({ 
          success: false,
          message: `Please login through the ${user.role} portal` 
        });
      }
      
      const token = generateToken(user._id, user.role);
      
      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      res.json({
        success: true,
        message: "Login successful",
        user: userResponse,
        token,
      });
    } else {
      res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login' 
    });
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
      customer.firstName = req.body.firstName || customer.firstName;
      customer.lastName = req.body.lastName || customer.lastName;
      customer.email = req.body.email || customer.email;
      customer.whatsappNumber = req.body.whatsappNumber || customer.whatsappNumber;
      customer.callNumber = req.body.callNumber || customer.callNumber;
      customer.address = req.body.address || customer.address;

      const updatedCustomer = await customer.save();

      res.json({
        success: true,
        customer: {
          _id: updatedCustomer._id,
          firstName: updatedCustomer.firstName,
          lastName: updatedCustomer.lastName,
          email: updatedCustomer.email,
          whatsappNumber: updatedCustomer.whatsappNumber,
          callNumber: updatedCustomer.callNumber,
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