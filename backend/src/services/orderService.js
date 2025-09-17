const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const InventoryService = require('./inventoryService');
const NotificationService = require('./notificationService');
const { createBusinessError } = require('../middleware/errorHandler');

class OrderService {
  /**
   * Create a new order from cart or direct items
   */
  static async createOrder(orderData, userId = null) {
    try {
      const {
        customerInfo,
        orderItems,
        orderType = 'pickup',
        paymentMethod = 'cash',
        deliveryAddress,
        notes,
        specialInstructions,
        source = 'web'
      } = orderData;

      // Validate and process order items
      const processedItems = await this.validateAndProcessOrderItems(orderItems);
      
      // Calculate totals
      const subtotal = processedItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const deliveryFee = orderType === 'delivery' ? this.calculateDeliveryFee(subtotal) : 0;
      const totalAmount = subtotal + deliveryFee;

      // Create order
      const order = new Order({
        customer: userId,
        customerInfo,
        orderItems: processedItems,
        subtotal,
        deliveryFee,
        totalAmount,
        orderType,
        paymentMethod,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
        notes,
        specialInstructions,
        source,
        status: 'pending'
      });

      await order.save();

      // Reserve stock for order items
      await this.reserveStock(order._id, processedItems);

      // Clear cart if order was created from cart
      if (userId && source !== 'walk-in') {
        const cart = await Cart.findOne({ customer: userId });
        if (cart) {
          await cart.clearCart();
        }
      }

      // Send order confirmation
      await NotificationService.sendOrderConfirmation(order._id);

      // Notify staff about new order
      await NotificationService.sendRoleNotification(
        ['admin', 'staff'],
        `New order received: #${order.orderNumber} - ₦${totalAmount.toLocaleString()}`,
        'info',
        'system'
      );

      return order;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validate and process order items
   */
  static async validateAndProcessOrderItems(orderItems) {
    const processedItems = [];

    for (const item of orderItems) {
      const { product: productId, variantId, quantity } = item;

      // Get product and variant details
      const product = await Product.findById(productId);
      if (!product || !product.isActive) {
        throw createBusinessError(`Product not found or inactive: ${productId}`, 400);
      }

      const variant = product.variants.id(variantId);
      if (!variant || !variant.isAvailable) {
        throw createBusinessError(`Product variant not available: ${product.name}`, 400);
      }

      // Check stock availability
      if (variant.currentStock < quantity) {
        throw createBusinessError(
          `Insufficient stock for ${product.name} (${variant.packageType}). Available: ${variant.currentStock}, Requested: ${quantity}`,
          400
        );
      }

      // Calculate prices
      const unitPrice = variant.price;
      const totalPrice = unitPrice * quantity;

      processedItems.push({
        product: productId,
        productName: product.name,
        variantId,
        packageType: variant.packageType,
        quantity,
        unitPrice,
        totalPrice,
        productSnapshot: {
          description: product.description,
          image: product.primaryImage,
          brand: product.brand,
          specifications: product.specifications
        }
      });
    }

    return processedItems;
  }

  /**
   * Reserve stock for order items
   */
  static async reserveStock(orderId, orderItems) {
    try {
      for (const item of orderItems) {
        await InventoryService.recordSale(
          item.product,
          item.variantId,
          item.quantity,
          orderId,
          null // System generated
        );
      }
    } catch (error) {
      // If stock reservation fails, we should handle this gracefully
      console.error('Stock reservation failed:', error);
      throw createBusinessError('Failed to reserve stock for order', 500);
    }
  }

  /**
   * Calculate delivery fee
   */
  static calculateDeliveryFee(subtotal) {
    // Free delivery for orders above ₦5000
    if (subtotal >= 5000) {
      return 0;
    }
    
    // Base delivery fee
    return 200;
  }

  /**
   * Update order status
   */
  static async updateOrderStatus(orderId, newStatus, userId, notes = '') {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw createBusinessError('Order not found', 404);
      }

      // Validate status transition
      this.validateStatusTransition(order.status, newStatus);

      // Update order status
      await order.updateStatus(newStatus, userId, notes);

      // Send status update notification
      await NotificationService.sendOrderStatusUpdate(orderId, newStatus);

      // Handle special status changes
      await this.handleStatusChange(order, newStatus, userId);

      return order;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validate status transition
   */
  static validateStatusTransition(currentStatus, newStatus) {
    const validTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['preparing', 'cancelled'],
      preparing: ['ready', 'cancelled'],
      ready: ['out-for-delivery', 'delivered', 'cancelled'],
      'out-for-delivery': ['delivered', 'cancelled'],
      delivered: ['refunded'],
      cancelled: [],
      refunded: []
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw createBusinessError(
        `Invalid status transition from ${currentStatus} to ${newStatus}`,
        400
      );
    }
  }

  /**
   * Handle special status changes
   */
  static async handleStatusChange(order, newStatus, userId) {
    switch (newStatus) {
      case 'cancelled':
        // Restore stock for cancelled orders
        await this.restoreStockForCancelledOrder(order, userId);
        break;
      
      case 'delivered':
        // Update customer statistics
        await this.updateCustomerStatistics(order);
        break;
      
      case 'refunded':
        // Handle refund process
        await this.processRefund(order, userId);
        break;
    }
  }

  /**
   * Restore stock for cancelled order
   */
  static async restoreStockForCancelledOrder(order, userId) {
    try {
      for (const item of order.orderItems) {
        await InventoryService.adjustStock(
          item.product,
          item.variantId,
          item.quantity,
          `Stock restored - Order #${order.orderNumber} cancelled`,
          userId,
          'add'
        );
      }
    } catch (error) {
      console.error('Failed to restore stock for cancelled order:', error);
    }
  }

  /**
   * Update customer statistics
   */
  static async updateCustomerStatistics(order) {
    if (order.customer) {
      try {
        const User = require('../models/User');
        await User.findByIdAndUpdate(order.customer, {
          $inc: {
            'customerInfo.totalOrders': 1,
            'customerInfo.totalSpent': order.totalAmount,
            'customerInfo.loyaltyPoints': Math.floor(order.totalAmount / 100) // 1 point per ₦100
          }
        });
      } catch (error) {
        console.error('Failed to update customer statistics:', error);
      }
    }
  }

  /**
   * Process refund
   */
  static async processRefund(order, userId, refundAmount = null, reason = '') {
    try {
      const refundAmountToProcess = refundAmount || order.totalAmount;
      
      order.refundAmount = refundAmountToProcess;
      order.refundReason = reason;
      order.refundDate = new Date();
      order.refundedBy = userId;
      
      await order.save();

      // Restore stock
      await this.restoreStockForCancelledOrder(order, userId);

      // Update customer statistics (subtract from totals)
      if (order.customer) {
        const User = require('../models/User');
        await User.findByIdAndUpdate(order.customer, {
          $inc: {
            'customerInfo.totalSpent': -refundAmountToProcess,
            'customerInfo.loyaltyPoints': -Math.floor(refundAmountToProcess / 100)
          }
        });
      }

      // Send refund notification
      await NotificationService.sendNotification(
        order.customer,
        `Refund processed for order #${order.orderNumber}. Amount: ₦${refundAmountToProcess.toLocaleString()}`,
        'info',
        'email'
      );

      return order;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get order analytics
   */
  static async getOrderAnalytics(dateRange = {}) {
    try {
      const { startDate, endDate } = dateRange;
      const matchStage = {};
      
      if (startDate || endDate) {
        matchStage.orderDate = {};
        if (startDate) matchStage.orderDate.$gte = new Date(startDate);
        if (endDate) matchStage.orderDate.$lte = new Date(endDate);
      }

      const [
        orderStats,
        statusBreakdown,
        revenueByDay,
        topProducts,
        averageOrderValue
      ] = await Promise.all([
        Order.getStatistics(dateRange),
        this.getOrderStatusBreakdown(matchStage),
        this.getRevenueByDay(matchStage),
        this.getTopSellingProducts(matchStage),
        this.getAverageOrderValue(matchStage)
      ]);

      return {
        orderStats: orderStats[0] || {},
        statusBreakdown,
        revenueByDay,
        topProducts,
        averageOrderValue: averageOrderValue[0]?.avgValue || 0
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get order status breakdown
   */
  static async getOrderStatusBreakdown(matchStage) {
    return await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { count: -1 } }
    ]);
  }

  /**
   * Get revenue by day
   */
  static async getRevenueByDay(matchStage) {
    return await Order.aggregate([
      { $match: { ...matchStage, status: { $ne: 'cancelled' } } },
      {
        $group: {
          _id: {
            year: { $year: '$orderDate' },
            month: { $month: '$orderDate' },
            day: { $dayOfMonth: '$orderDate' }
          },
          revenue: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);
  }

  /**
   * Get top selling products
   */
  static async getTopSellingProducts(matchStage, limit = 10) {
    return await Order.aggregate([
      { $match: { ...matchStage, status: { $ne: 'cancelled' } } },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: {
            product: '$orderItems.product',
            productName: '$orderItems.productName',
            packageType: '$orderItems.packageType'
          },
          totalQuantity: { $sum: '$orderItems.quantity' },
          totalRevenue: { $sum: '$orderItems.totalPrice' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: limit }
    ]);
  }

  /**
   * Get average order value
   */
  static async getAverageOrderValue(matchStage) {
    return await Order.aggregate([
      { $match: { ...matchStage, status: { $ne: 'cancelled' } } },
      {
        $group: {
          _id: null,
          avgValue: { $avg: '$totalAmount' },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' }
        }
      }
    ]);
  }

  /**
   * Get orders by customer
   */
  static async getCustomerOrders(customerId, options = {}) {
    try {
      const { page = 1, limit = 10, status } = options;
      const skip = (page - 1) * limit;
      
      const filter = { customer: customerId };
      if (status) {
        filter.status = status;
      }

      const [orders, totalCount] = await Promise.all([
        Order.find(filter)
          .populate('orderItems.product', 'name images')
          .sort({ orderDate: -1 })
          .skip(skip)
          .limit(limit),
        Order.countDocuments(filter)
      ]);

      return {
        orders,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalItems: totalCount,
          itemsPerPage: limit
        }
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search orders
   */
  static async searchOrders(query, options = {}) {
    try {
      const { page = 1, limit = 20, status, orderType, dateRange } = options;
      const skip = (page - 1) * limit;

      const filter = {};
      
      // Text search
      if (query) {
        filter.$or = [
          { orderNumber: new RegExp(query, 'i') },
          { 'customerInfo.name': new RegExp(query, 'i') },
          { 'customerInfo.whatsappNumber': new RegExp(query, 'i') },
          { 'customerInfo.email': new RegExp(query, 'i') }
        ];
      }

      // Status filter
      if (status) {
        filter.status = status;
      }

      // Order type filter
      if (orderType) {
        filter.orderType = orderType;
      }

      // Date range filter
      if (dateRange?.startDate || dateRange?.endDate) {
        filter.orderDate = {};
        if (dateRange.startDate) filter.orderDate.$gte = new Date(dateRange.startDate);
        if (dateRange.endDate) filter.orderDate.$lte = new Date(dateRange.endDate);
      }

      const [orders, totalCount] = await Promise.all([
        Order.find(filter)
          .populate('customer', 'firstName lastName')
          .populate('handledBy', 'firstName lastName')
          .populate('orderItems.product', 'name images')
          .sort({ orderDate: -1 })
          .skip(skip)
          .limit(limit),
        Order.countDocuments(filter)
      ]);

      return {
        orders,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalItems: totalCount,
          itemsPerPage: limit
        }
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get order details with full information
   */
  static async getOrderDetails(orderId) {
    try {
      const order = await Order.findById(orderId)
        .populate('customer', 'firstName lastName email whatsappNumber customerInfo')
        .populate('handledBy', 'firstName lastName')
        .populate('deliveredBy', 'firstName lastName')
        .populate('orderItems.product', 'name images category supplier')
        .populate('statusHistory.updatedBy', 'firstName lastName');

      if (!order) {
        throw createBusinessError('Order not found', 404);
      }

      return order;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderService;