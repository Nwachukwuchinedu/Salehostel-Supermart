const Order = require('../../models/Order');
const Product = require('../../models/Product');
const User = require('../../models/User');
const { AppError } = require('../../middleware/errorHandler');
const OrderService = require('../../services/orderService');
const InventoryService = require('../../services/inventoryService');
const NotificationService = require('../../services/notificationService');

// @desc    Get orders for staff to process
// @route   GET /api/staff/orders
// @access  Private (Staff)
const getOrders = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      priority, 
      assignedToMe,
      orderType,
      startDate,
      endDate 
    } = req.query;

    // Build query
    let query = {};

    if (status) {
      if (Array.isArray(status)) {
        query.status = { $in: status };
      } else {
        query.status = status;
      }
    } else {
      // Default to active orders that need staff attention
      query.status = { $in: ['Pending', 'Confirmed', 'Preparing', 'Ready'] };
    }

    if (priority) {
      query.priority = priority;
    }

    if (assignedToMe === 'true') {
      query.handledBy = req.user.userId;
    }

    if (orderType) {
      query.orderType = orderType;
    }

    if (startDate || endDate) {
      query.orderDate = {};
      if (startDate) {
        query.orderDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.orderDate.$lte = new Date(endDate);
      }
    }

    // Execute query with pagination
    const orders = await Order.find(query)
      .populate('customer', 'firstName lastName email whatsappNumber')
      .populate('orderItems.product', 'name variants')
      .populate('handledBy', 'firstName lastName')
      .sort({ 
        priority: -1, // High priority first
        orderDate: 1   // Older orders first
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    // Get order statistics
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] }
          },
          processingOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'Preparing'] }, 1, 0] }
          },
          readyOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'Ready'] }, 1, 0] }
          },
          urgentOrders: {
            $sum: { $cond: [{ $eq: ['$priority', 'urgent'] }, 1, 0] }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        },
        stats: stats[0] || {
          totalOrders: 0,
          pendingOrders: 0,
          processingOrders: 0,
          readyOrders: 0,
          urgentOrders: 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order details
// @route   GET /api/staff/orders/:id
// @access  Private (Staff)
const getOrderDetails = async (req, res, next) => {
  try {
    const order = await OrderService.getOrderDetails(req.params.id);

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/staff/orders/:id/status
// @access  Private (Staff)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    const order = await OrderService.updateOrderStatus(
      req.params.id,
      status,
      req.user.userId,
      notes
    );

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign order to staff member
// @route   PUT /api/staff/orders/:id/assign
// @access  Private (Staff)
const assignOrder = async (req, res, next) => {
  try {
    const { assignTo } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    // If assignTo is provided, assign to that staff member, otherwise assign to current user
    const assigneeId = assignTo || req.user.userId;

    // Verify the assignee is a staff member
    const assignee = await User.findOne({ 
      _id: assigneeId, 
      role: 'staff',
      'staffInfo.isActive': true 
    });

    if (!assignee) {
      return next(new AppError('Invalid staff member for assignment', 400));
    }

    order.handledBy = assigneeId;
    await order.save();

    // Send notification to assigned staff member
    if (assigneeId !== req.user.userId) {
      await NotificationService.sendNotification(
        assigneeId,
        `Order ${order.orderNumber} has been assigned to you`,
        'order_assignment'
      );
    }

    res.json({
      success: true,
      message: 'Order assigned successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create walk-in order
// @route   POST /api/staff/orders
// @access  Private (Staff)
const createWalkInOrder = async (req, res, next) => {
  try {
    const orderData = {
      ...req.body,
      orderType: 'Pickup',
      paymentMethod: 'Cash',
      handledBy: req.user.userId,
      isWalkIn: true
    };

    const order = await OrderService.createOrder(orderData);

    res.status(201).json({
      success: true,
      message: 'Walk-in order created successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Process order payment
// @route   PUT /api/staff/orders/:id/payment
// @access  Private (Staff)
const processPayment = async (req, res, next) => {
  try {
    const { paymentMethod, paymentStatus, amountPaid, notes } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    // Update payment information
    order.paymentMethod = paymentMethod || order.paymentMethod;
    order.paymentStatus = paymentStatus || 'Paid';
    order.amountPaid = amountPaid || order.totalAmount;
    order.paymentDate = new Date();
    order.paymentProcessedBy = req.user.userId;

    if (notes) {
      order.notes = notes;
    }

    // If payment is completed and order is ready, mark as delivered
    if (paymentStatus === 'Paid' && order.status === 'Ready') {
      order.status = 'Delivered';
      order.actualReady = new Date();
    }

    await order.save();

    // Send payment confirmation notification
    if (order.customer) {
      await NotificationService.sendNotification(
        order.customer,
        `Payment received for order ${order.orderNumber}`,
        'payment_confirmation'
      );
    }

    res.json({
      success: true,
      message: 'Payment processed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get staff performance metrics
// @route   GET /api/staff/orders/performance
// @access  Private (Staff)
const getStaffPerformance = async (req, res, next) => {
  try {
    const { period = '30d' } = req.query;

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    
    switch (period) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(endDate.getDate() - 90);
        break;
      default:
        startDate.setDate(endDate.getDate() - 30);
    }

    // Get performance metrics
    const performance = await Order.aggregate([
      {
        $match: {
          handledBy: req.user.userId,
          orderDate: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
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
      }
    ]);

    // Get daily performance trend
    const dailyTrend = await Order.aggregate([
      {
        $match: {
          handledBy: req.user.userId,
          orderDate: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$orderDate' },
            month: { $month: '$orderDate' },
            day: { $dayOfMonth: '$orderDate' }
          },
          orders: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    const performanceData = performance[0] || {
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      completedOrders: 0,
      cancelledOrders: 0
    };

    // Calculate completion rate
    performanceData.completionRate = performanceData.totalOrders > 0 
      ? (performanceData.completedOrders / performanceData.totalOrders * 100).toFixed(2)
      : 0;

    res.json({
      success: true,
      data: {
        period,
        performance: performanceData,
        dailyTrend
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order queue (orders waiting to be processed)
// @route   GET /api/staff/orders/queue
// @access  Private (Staff)
const getOrderQueue = async (req, res, next) => {
  try {
    // Get orders that need immediate attention
    const urgentOrders = await Order.find({
      status: { $in: ['Pending', 'Confirmed'] },
      priority: 'urgent'
    })
      .populate('customer', 'firstName lastName')
      .populate('orderItems.product', 'name')
      .sort({ orderDate: 1 })
      .limit(10);

    const pendingOrders = await Order.find({
      status: 'Pending',
      handledBy: { $exists: false }
    })
      .populate('customer', 'firstName lastName')
      .populate('orderItems.product', 'name')
      .sort({ orderDate: 1 })
      .limit(10);

    const preparingOrders = await Order.find({
      status: 'Preparing',
      handledBy: req.user.userId
    })
      .populate('customer', 'firstName lastName')
      .populate('orderItems.product', 'name')
      .sort({ orderDate: 1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        urgentOrders,
        pendingOrders,
        preparingOrders
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  getOrderDetails,
  updateOrderStatus,
  assignOrder,
  createWalkInOrder,
  processPayment,
  getStaffPerformance,
  getOrderQueue
};