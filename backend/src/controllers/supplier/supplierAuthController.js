const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Supplier = require('../../models/Supplier');
const { AppError } = require('../../middleware/errorHandler');

// @desc    Register supplier
// @route   POST /api/supplier/auth/register
// @access  Public
const registerSupplier = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      whatsappNumber,
      callNumber,
      companyName,
      suppliedCategories,
      address,
      paymentTerms
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('User with this email already exists', 400));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      whatsappNumber,
      callNumber,
      role: 'supplier'
    });

    // Create supplier profile
    const supplier = await Supplier.create({
      user: user._id,
      companyName,
      contactPerson: {
        firstName,
        lastName
      },
      contactDetails: {
        email,
        phone: callNumber,
        whatsapp: whatsappNumber
      },
      address,
      suppliedCategories,
      paymentTerms: paymentTerms || 'Cash on Delivery'
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        role: user.role,
        supplierId: supplier._id
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      success: true,
      message: 'Supplier registered successfully',
      data: {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        },
        supplier: {
          id: supplier._id,
          companyName: supplier.companyName,
          suppliedCategories: supplier.suppliedCategories,
          isVerified: supplier.isVerified
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login supplier
// @route   POST /api/supplier/auth/login
// @access  Public
const loginSupplier = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and is a supplier
    const user = await User.findOne({ email, role: 'supplier' }).select('+password');
    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Get supplier profile
    const supplier = await Supplier.findOne({ user: user._id });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        role: user.role,
        supplierId: supplier._id
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        },
        supplier: {
          id: supplier._id,
          companyName: supplier.companyName,
          suppliedCategories: supplier.suppliedCategories,
          isVerified: supplier.isVerified,
          rating: supplier.rating
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get supplier profile
// @route   GET /api/supplier/auth/profile
// @access  Private (Supplier)
const getSupplierProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    const supplier = await Supplier.findOne({ user: req.user.userId });

    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    res.json({
      success: true,
      data: {
        user,
        supplier
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update supplier profile
// @route   PUT /api/supplier/auth/profile
// @access  Private (Supplier)
const updateSupplierProfile = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      whatsappNumber,
      callNumber,
      companyName,
      contactPerson,
      contactDetails,
      address,
      suppliedCategories,
      paymentTerms,
      bankDetails
    } = req.body;

    // Update user information
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        firstName,
        lastName,
        whatsappNumber,
        callNumber
      },
      { new: true, runValidators: true }
    ).select('-password');

    // Update supplier information
    const supplier = await Supplier.findOneAndUpdate(
      { user: req.user.userId },
      {
        companyName,
        contactPerson,
        contactDetails,
        address,
        suppliedCategories,
        paymentTerms,
        bankDetails
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user,
        supplier
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/supplier/auth/change-password
// @access  Private (Supplier)
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user.userId).select('+password');

    // Check current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return next(new AppError('Current password is incorrect', 400));
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedNewPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerSupplier,
  loginSupplier,
  getSupplierProfile,
  updateSupplierProfile,
  changePassword
};