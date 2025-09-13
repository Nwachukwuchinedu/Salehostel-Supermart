const Order = require('../../models/Order');
const Product = require('../../models/Product');
const User = require('../../models/User');
const Purchase = require('../../models/Purchase');

// @desc    Get sales report
// @route   GET /api/admin/reports/sales
// @access  Private
const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate, period } = req.query;
    
    // Set default date range (last 30 days)
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Get sales data grouped by period
    const matchCondition = {
      createdAt: { $gte: start, $lte: end },
      status: { $ne: 'cancelled' }
    };
    
    let groupBy;
    switch (period) {
      case 'daily':
        groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
        break;
      case 'weekly':
        groupBy = { $dateToString: { format: '%Y-%U', date: '$createdAt' } };
        break;
      case 'monthly':
        groupBy = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };
        break;
      default:
        groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    }
    
    const salesData = await Order.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: groupBy,
          totalSales: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
          totalItems: { $sum: { $sum: '$items.quantity' } }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Get summary statistics
    const summary = await Order.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
          avgOrderValue: { $avg: '$totalAmount' }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: salesData,
      summary: summary[0] || { totalSales: 0, totalOrders: 0, avgOrderValue: 0 },
      period: period || 'daily'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get inventory report
// @route   GET /api/admin/reports/inventory
// @access  Private
const getInventoryReport = async (req, res) => {
  try {
    // Get product counts by stock status
    const totalProducts = await Product.countDocuments();
    
    const lowStockProducts = await Product.countDocuments({
      currentStock: { $lte: '$minStockLevel' },
      isActive: true
    });
    
    const outOfStockProducts = await Product.countDocuments({
      currentStock: 0,
      isActive: true
    });
    
    const overStockProducts = await Product.countDocuments({
      currentStock: { $gte: '$maxStockLevel' },
      maxStockLevel: { $exists: true, $ne: null },
      isActive: true
    });
    
    // Get top low stock products
    const lowStockItems = await Product.find({
      currentStock: { $lte: '$minStockLevel' },
      isActive: true
    })
    .select('name sku currentStock minStockLevel unit')
    .sort({ currentStock: 1 })
    .limit(10);
    
    res.json({
      success: true,
      summary: {
        totalProducts,
        lowStockProducts,
        outOfStockProducts,
        overStockProducts
      },
      lowStockItems
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get profit & loss report
// @route   GET /api/admin/reports/profit-loss
// @access  Private
const getProfitLossReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Set default date range (last 30 days)
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Get sales revenue
    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 }
        }
      }
    ]);
    
    // Get cost of goods sold (simplified - would need more detailed tracking in real app)
    const purchaseData = await Purchase.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: 'received'
        }
      },
      {
        $group: {
          _id: null,
          totalCost: { $sum: '$subtotal' }
        }
      }
    ]);
    
    const revenue = salesData[0]?.totalRevenue || 0;
    const cost = purchaseData[0]?.totalCost || 0;
    const profit = revenue - cost;
    const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
    
    res.json({
      success: true,
      data: {
        revenue,
        cost,
        profit,
        profitMargin
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get customer report
// @route   GET /api/admin/reports/customers
// @access  Private
const getCustomerReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Set default date range (last 30 days)
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Get customer statistics
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    
    const newCustomers = await User.countDocuments({
      role: 'customer',
      createdAt: { $gte: start, $lte: end }
    });
    
    // Get top customers by order value
    const topCustomers = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: '$customer',
          totalSpent: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'customerInfo'
        }
      },
      {
        $unwind: '$customerInfo'
      },
      {
        $project: {
          customerId: '$_id',
          name: '$customerInfo.name',
          email: '$customerInfo.email',
          totalSpent: 1,
          orderCount: 1
        }
      }
    ]);
    
    res.json({
      success: true,
      summary: {
        totalCustomers,
        newCustomers
      },
      topCustomers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get product performance report
// @route   GET /api/admin/reports/products
// @access  Private
const getProductPerformance = async (req, res) => {
  try {
    const { startDate, endDate, sortBy = 'revenue' } = req.query;
    
    // Set default date range (last 30 days)
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Get top selling products
    const topProducts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: { $ne: 'cancelled' }
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.totalPrice' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: sortBy === 'quantity' ? { totalQuantity: -1 } : { totalRevenue: -1 } },
      { $limit: 20 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $project: {
          productId: '$_id',
          productName: '$product.name',
          productSku: '$product.sku',
          totalQuantity: 1,
          totalRevenue: 1,
          orderCount: 1,
          avgPrice: { $divide: ['$totalRevenue', '$totalQuantity'] }
        }
      }
    ]);
    
    res.json({
      success: true,
      topProducts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSalesReport,
  getInventoryReport,
  getProfitLossReport,
  getCustomerReport,
  getProductPerformance
};