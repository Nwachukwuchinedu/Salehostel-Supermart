const User = require('../../models/User');

// @desc    Get staff dashboard
// @route   GET /api/staff/dashboard
// @access  Private (Staff only)
const getDashboard = async (req, res) => {
  try {
    // Get staff user info
    const staff = await User.findById(req.user.userId).select('-password');
    
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff user not found",
      });
    }

    // Staff dashboard data
    const dashboardData = {
      user: staff,
      stats: {
        totalTasks: 12,
        completedTasks: 8,
        pendingTasks: 4,
        notifications: 3
      },
      recentActivity: [
        {
          id: 1,
          action: "Order #1234 processed",
          time: "2 hours ago"
        },
        {
          id: 2,
          action: "Inventory updated for Product A",
          time: "1 day ago"
        }
      ]
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error("Staff dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching dashboard",
    });
  }
};

module.exports = {
  getDashboard
};