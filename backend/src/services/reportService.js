const Order = require('../models/Order');
const Product = require('../models/Product');
const Supply = require('../models/Supply');
const StockMovement = require('../models/StockMovement');
const User = require('../models/User');

class ReportService {
  /**
   * Generate sales report
   */
  static async generateSalesReport(startDate, endDate, filters = {}) {
    try {
      const matchStage = {
        orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
        status: { $in: ['Delivered', 'Completed'] }
      };

      // Apply additional filters
      if (filters.category) {
        matchStage['orderItems.product.productGroup'] = filters.category;
      }

      if (filters.paymentMethod) {
        matchStage.paymentMethod = filters.paymentMethod;
      }

      if (filters.orderType) {
        matchStage.orderType = filters.orderType;
      }

      // Sales summary
      const salesSummary = await Order.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: '$totalAmount' },
            totalItems: { $sum: { $sum: '$orderItems.quantity' } },
            averageOrderValue: { $avg: '$totalAmount' }
          }
        }
      ]);

      // Daily sales trend
      const dailySales = await Order.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: {
              year: { $year: '$orderDate' },
              month: { $month: '$orderDate' },
              day: { $dayOfMonth: '$orderDate' }
            },
            orders: { $sum: 1 },
            revenue: { $sum: '$totalAmount' },
            items: { $sum: { $sum: '$orderItems.quantity' } }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
      ]);

      // Top selling products
      const topProducts = await Order.aggregate([
        { $match: matchStage },
        { $unwind: '$orderItems' },
        {
          $group: {
            _id: '$orderItems.product',
            productName: { $first: '$orderItems.productName' },
            totalQuantity: { $sum: '$orderItems.quantity' },
            totalRevenue: { $sum: '$orderItems.totalPrice' },
            orderCount: { $sum: 1 }
          }
        },
        { $sort: { totalRevenue: -1 } },
        { $limit: 10 }
      ]);

      // Payment method breakdown
      const paymentMethods = await Order.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: '$paymentMethod',
            count: { $sum: 1 },
            revenue: { $sum: '$totalAmount' }
          }
        }
      ]);

      return {
        period: { startDate, endDate },
        summary: salesSummary[0] || {
          totalOrders: 0,
          totalRevenue: 0,
          totalItems: 0,
          averageOrderValue: 0
        },
        dailySales,
        topProducts,
        paymentMethods,
        generatedAt: new Date()
      };
    } catch (error) {
      throw new Error(`Failed to generate sales report: ${error.message}`);
    }
  }

  /**
   * Generate inventory report
   */
  static async generateInventoryReport(filters = {}) {
    try {
      const matchStage = { isActive: true };

      if (filters.category) {
        matchStage.productGroup = filters.category;
      }

      if (filters.supplier) {
        matchStage.supplier = filters.supplier;
      }

      // Inventory summary
      const inventorySummary = await Product.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            totalStock: { $sum: { $sum: '$variants.quantity' } },
            totalValue: { $sum: { $sum: { $multiply: ['$variants.quantity', '$variants.price'] } } },
            lowStockProducts: {
              $sum: {
                $cond: [
                  { $lt: [{ $sum: '$variants.quantity' }, { $min: '$variants.minStockLevel' }] },
                  1,
                  0
                ]
              }
            },
            outOfStockProducts: {
              $sum: {
                $cond: [
                  { $eq: [{ $sum: '$variants.quantity' }, 0] },
                  1,
                  0
                ]
              }
            }
          }
        }
      ]);

      // Category breakdown
      const categoryBreakdown = await Product.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: '$productGroup',
            productCount: { $sum: 1 },
            totalStock: { $sum: { $sum: '$variants.quantity' } },
            totalValue: { $sum: { $sum: { $multiply: ['$variants.quantity', '$variants.price'] } } }
          }
        },
        { $sort: { totalValue: -1 } }
      ]);

      // Low stock items
      const lowStockItems = await Product.aggregate([
        { $match: matchStage },
        { $unwind: '$variants' },
        {
          $match: {
            $expr: { $lte: ['$variants.quantity', '$variants.minStockLevel'] }
          }
        },
        {
          $project: {
            name: 1,
            productGroup: 1,
            packageType: '$variants.packageType',
            currentStock: '$variants.quantity',
            minStockLevel: '$variants.minStockLevel',
            stockValue: { $multiply: ['$variants.quantity', '$variants.price'] }
          }
        },
        { $sort: { currentStock: 1 } }
      ]);

      // Stock movements summary (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const stockMovements = await StockMovement.aggregate([
        { $match: { date: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: '$movementType',
            count: { $sum: 1 },
            totalQuantity: { $sum: '$quantityChanged' }
          }
        }
      ]);

      return {
        summary: inventorySummary[0] || {
          totalProducts: 0,
          totalStock: 0,
          totalValue: 0,
          lowStockProducts: 0,
          outOfStockProducts: 0
        },
        categoryBreakdown,
        lowStockItems,
        stockMovements,
        generatedAt: new Date()
      };
    } catch (error) {
      throw new Error(`Failed to generate inventory report: ${error.message}`);
    }
  }

  /**
   * Generate supplier performance report
   */
  static async generateSupplierReport(startDate, endDate, supplierId = null) {
    try {
      const matchStage = {
        supplyDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
      };

      if (supplierId) {
        matchStage.supplier = supplierId;
      }

      // Supplier performance summary
      const supplierPerformance = await Supply.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: '$supplier',
            supplierName: { $first: '$supplierName' },
            totalSupplies: { $sum: 1 },
            totalValue: { $sum: '$totalAmount' },
            averageSupplyValue: { $avg: '$totalAmount' },
            verifiedSupplies: {
              $sum: { $cond: [{ $eq: ['$status', 'Verified'] }, 1, 0] }
            },
            pendingSupplies: {
              $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] }
            }
          }
        },
        { $sort: { totalValue: -1 } }
      ]);

      // Supply trend over time
      const supplyTrend = await Supply.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: {
              year: { $year: '$supplyDate' },
              month: { $month: '$supplyDate' }
            },
            supplies: { $sum: 1 },
            value: { $sum: '$totalAmount' }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
      ]);

      // Top supplied products
      const topSuppliedProducts = await Supply.aggregate([
        { $match: matchStage },
        { $unwind: '$supplyItems' },
        {
          $group: {
            _id: '$supplyItems.product',
            productName: { $first: '$supplyItems.productName' },
            totalQuantity: { $sum: '$supplyItems.quantitySupplied' },
            totalValue: { $sum: '$supplyItems.totalCost' },
            supplierCount: { $addToSet: '$supplier' }
          }
        },
        {
          $addFields: {
            supplierCount: { $size: '$supplierCount' }
          }
        },
        { $sort: { totalValue: -1 } },
        { $limit: 10 }
      ]);

      return {
        period: { startDate, endDate },
        supplierPerformance,
        supplyTrend,
        topSuppliedProducts,
        generatedAt: new Date()
      };
    } catch (error) {
      throw new Error(`Failed to generate supplier report: ${error.message}`);
    }
  }

  /**
   * Generate customer analytics report
   */
  static async generateCustomerReport(startDate, endDate) {
    try {
      const matchStage = {
        orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
        status: { $in: ['Delivered', 'Completed'] }
      };

      // Customer summary
      const customerSummary = await Order.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: null,
            totalCustomers: { $addToSet: '$customer' },
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: '$totalAmount' },
            averageOrderValue: { $avg: '$totalAmount' }
          }
        },
        {
          $addFields: {
            totalCustomers: { $size: '$totalCustomers' },
            ordersPerCustomer: { $divide: ['$totalOrders', { $size: '$totalCustomers' }] }
          }
        }
      ]);

      // Top customers
      const topCustomers = await Order.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: '$customer',
            customerName: { $first: '$customerInfo.name' },
            totalOrders: { $sum: 1 },
            totalSpent: { $sum: '$totalAmount' },
            averageOrderValue: { $avg: '$totalAmount' },
            lastOrderDate: { $max: '$orderDate' }
          }
        },
        { $sort: { totalSpent: -1 } },
        { $limit: 10 }
      ]);

      // Order type distribution
      const orderTypeDistribution = await Order.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: '$orderType',
            count: { $sum: 1 },
            revenue: { $sum: '$totalAmount' }
          }
        }
      ]);

      return {
        period: { startDate, endDate },
        summary: customerSummary[0] || {
          totalCustomers: 0,
          totalOrders: 0,
          totalRevenue: 0,
          averageOrderValue: 0,
          ordersPerCustomer: 0
        },
        topCustomers,
        orderTypeDistribution,
        generatedAt: new Date()
      };
    } catch (error) {
      throw new Error(`Failed to generate customer report: ${error.message}`);
    }
  }

  /**
   * Generate staff performance report
   */
  static async generateStaffReport(startDate, endDate, staffId = null) {
    try {
      const matchStage = {
        orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
        handledBy: { $exists: true }
      };

      if (staffId) {
        matchStage.handledBy = staffId;
      }

      // Staff performance
      const staffPerformance = await Order.aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: 'users',
            localField: 'handledBy',
            foreignField: '_id',
            as: 'staff'
          }
        },
        { $unwind: '$staff' },
        {
          $group: {
            _id: '$handledBy',
            staffName: { $first: { $concat: ['$staff.firstName', ' ', '$staff.lastName'] } },
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: '$totalAmount' },
            averageOrderValue: { $avg: '$totalAmount' },
            completedOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'Delivered'] }, 1, 0] }
            },
            cancelledOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'Cancelled'] }, 1, 0] }
            }
          }
        },
        {
          $addFields: {
            completionRate: {
              $multiply: [
                { $divide: ['$completedOrders', '$totalOrders'] },
                100
              ]
            }
          }
        },
        { $sort: { totalRevenue: -1 } }
      ]);

      return {
        period: { startDate, endDate },
        staffPerformance,
        generatedAt: new Date()
      };
    } catch (error) {
      throw new Error(`Failed to generate staff report: ${error.message}`);
    }
  }
}

module.exports = ReportService;