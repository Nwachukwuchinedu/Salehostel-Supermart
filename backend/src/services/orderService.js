const Order = require('../models/Order');
const Product = require('../models/Product');
const inventoryService = require('./inventoryService');

// Order Service
class OrderService {
  // Process order delivery (update inventory)
  async processOrderDelivery(orderId, userId) {
    try {
      const order = await Order.findById(orderId).populate('items.product');
      
      if (!order) {
        throw new Error('Order not found');
      }
      
      // For each item in the order, reduce stock
      for (const item of order.items) {
        await inventoryService.recordSale(
          item.product._id,
          item.quantity,
          orderId,
          userId
        );
      }
      
      return { success: true, message: 'Order delivery processed' };
    } catch (error) {
      throw new Error(`Failed to process order delivery: ${error.message}`);
    }
  }
  
  // Process refund
  async processRefund(orderId, amount, reason, userId) {
    try {
      // In a real implementation, this would integrate with a payment provider
      // For now, we'll just return a success response
      
      return {
        success: true,
        refundId: `refund_${Date.now()}`,
        amount,
        reason,
        processedBy: userId,
        processedAt: new Date()
      };
    } catch (error) {
      throw new Error(`Failed to process refund: ${error.message}`);
    }
  }
  
  // Get order analytics
  async getOrderAnalytics() {
    try {
      // Get total orders
      const totalOrders = await Order.countDocuments();
      
      // Get orders by status
      const statusCounts = await Order.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);
      
      // Get orders by payment status
      const paymentStatusCounts = await Order.aggregate([
        {
          $group: {
            _id: '$paymentStatus',
            count: { $sum: 1 }
          }
        }
      ]);
      
      // Get sales data for the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const salesData = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysAgo },
            status: { $ne: 'cancelled' }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
            },
            totalSales: { $sum: '$totalAmount' },
            orderCount: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
      
      // Get top selling products
      const topProducts = await Order.aggregate([
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.product',
            totalQuantity: { $sum: '$items.quantity' },
            totalRevenue: { $sum: '$items.totalPrice' }
          }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 5 },
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
            productName: '$product.name',
            productSku: '$product.sku',
            totalQuantity: 1,
            totalRevenue: 1
          }
        }
      ]);
      
      return {
        totalOrders,
        statusCounts,
        paymentStatusCounts,
        salesData,
        topProducts
      };
    } catch (error) {
      throw new Error(`Failed to get order analytics: ${error.message}`);
    }
  }
  
  // Update order status
  async updateOrderStatus(orderId, status, userId) {
    try {
      const order = await Order.findById(orderId);
      
      if (!order) {
        throw new Error('Order not found');
      }
      
      const previousStatus = order.status;
      order.status = status;
      
      // If order is delivered, set deliveredAt timestamp
      if (status === 'delivered') {
        order.deliveredAt = Date.now();
      }
      
      const updatedOrder = await order.save();
      
      // If status changed to delivered, update inventory
      if (previousStatus !== 'delivered' && status === 'delivered') {
        await this.processOrderDelivery(orderId, userId);
      }
      
      return updatedOrder;
    } catch (error) {
      throw new Error(`Failed to update order status: ${error.message}`);
    }
  }
}

module.exports = new OrderService();