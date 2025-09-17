const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { AppError } = require('../../middleware/errorHandler');

// @desc    Login staff
// @route   POST /api/staff/auth/login
// @access  Public
const loginStaff = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and is staff
    const user = await User.findOne({ 
      email, 
      role: 'staff',
      isActive: true 
    }).select('+password');

    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Check if staff account is active
    if (!user.staffInfo?.isActive) {
      return next(new AppError('Staff account is deactivated', 401));
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        role: user.role,
        employeeId: user.staffInfo?.employeeId
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

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
          role: user.role,
          employeeId: user.staffInfo?.employeeId,
          permissions: user.staffInfo?.permissions || [],
          shiftTimes: user.staffInfo?.shiftTimes
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get staff profile
// @route   GET /api/staff/auth/profile
// @access  Private (Staff)
const getStaffProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          whatsappNumber: user.whatsappNumber,
          callNumber: user.callNumber,
          role: user.role,
          employeeId: user.staffInfo?.employeeId,
          permissions: user.staffInfo?.permissions || [],
          shiftTimes: user.staffInfo?.shiftTimes,
          isActive: user.staffInfo?.isActive,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update staff profile
// @route   PUT /api/staff/auth/profile
// @access  Private (Staff)
const updateStaffProfile = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      whatsappNumber,
      callNumber,
      shiftTimes
    } = req.body;

    const updateData = {
      firstName,
      lastName,
      whatsappNumber,
      callNumber
    };

    // Update shift times if provided
    if (shiftTimes) {
      updateData['staffInfo.shiftTimes'] = shiftTimes;
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          whatsappNumber: user.whatsappNumber,
          callNumber: user.callNumber,
          role: user.role,
          employeeId: user.staffInfo?.employeeId,
          permissions: user.staffInfo?.permissions || [],
          shiftTimes: user.staffInfo?.shiftTimes,
          isActive: user.staffInfo?.isActive
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/staff/auth/change-password
// @access  Private (Staff)
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

// @desc    Clock in/out (for shift tracking)
// @route   POST /api/staff/auth/clock
// @access  Private (Staff)
const clockInOut = async (req, res, next) => {
  try {
    const { action } = req.body; // 'in' or 'out'

    const user = await User.findById(req.user.userId);
    
    if (!user.staffInfo) {
      user.staffInfo = {};
    }

    if (!user.staffInfo.clockHistory) {
      user.staffInfo.clockHistory = [];
    }

    const clockEntry = {
      action,
      timestamp: new Date(),
      date: new Date().toISOString().split('T')[0]
    };

    user.staffInfo.clockHistory.push(clockEntry);

    // Keep only last 30 days of clock history
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    user.staffInfo.clockHistory = user.staffInfo.clockHistory.filter(
      entry => new Date(entry.timestamp) > thirtyDaysAgo
    );

    await user.save();

    res.json({
      success: true,
      message: `Clocked ${action} successfully`,
      data: {
        action,
        timestamp: clockEntry.timestamp
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get clock history
// @route   GET /api/staff/auth/clock-history
// @access  Private (Staff)
const getClockHistory = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const user = await User.findById(req.user.userId);
    
    let clockHistory = user.staffInfo?.clockHistory || [];

    // Filter by date range if provided
    if (startDate || endDate) {
      clockHistory = clockHistory.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        if (startDate && entryDate < new Date(startDate)) return false;
        if (endDate && entryDate > new Date(endDate)) return false;
        return true;
      });
    }

    // Group by date and calculate hours worked
    const dailySummary = {};
    
    clockHistory.forEach(entry => {
      const date = entry.date;
      if (!dailySummary[date]) {
        dailySummary[date] = {
          date,
          clockIn: null,
          clockOut: null,
          hoursWorked: 0
        };
      }

      if (entry.action === 'in') {
        dailySummary[date].clockIn = entry.timestamp;
      } else if (entry.action === 'out') {
        dailySummary[date].clockOut = entry.timestamp;
      }

      // Calculate hours worked if both clock in and out exist
      if (dailySummary[date].clockIn && dailySummary[date].clockOut) {
        const clockIn = new Date(dailySummary[date].clockIn);
        const clockOut = new Date(dailySummary[date].clockOut);
        dailySummary[date].hoursWorked = (clockOut - clockIn) / (1000 * 60 * 60); // Convert to hours
      }
    });

    res.json({
      success: true,
      data: {
        clockHistory,
        dailySummary: Object.values(dailySummary).sort((a, b) => new Date(b.date) - new Date(a.date))
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginStaff,
  getStaffProfile,
  updateStaffProfile,
  changePassword,
  clockInOut,
  getClockHistory
};