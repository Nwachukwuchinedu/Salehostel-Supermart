const User = require('../../models/User');

// @desc    Get supplier dashboard
// @route   GET /api/supplier/dashboard
// @access  Private (Supplier only)
const getDashboard = async (req, res) => {
  try {
    // Get supplier user info
    const supplier = await User.findById(req.user.userId).select('-password');
    
    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier user not found",
      });
    }

    // Supplier dashboard data
    const dashboardData = {
      user: supplier,
      stats: {
        totalSupplies: 24,
        pendingSupplies: 5,
        completedSupplies: 19,
        totalEarnings: 12500
      },
      recentSupplies: [
        {
          id: 1,
          product: "Product A",
          quantity: 100,
          status: "Delivered"
        },
        {
          id: 2,
          product: "Product B",
          quantity: 50,
          status: "Pending"
        }
      ]
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error("Supplier dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching dashboard",
    });
  }
};

module.exports = {
  getDashboard
};