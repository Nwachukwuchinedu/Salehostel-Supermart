const PurchaseOrder = require('../../models/PurchaseOrder');
const Supplier = require('../../models/Supplier');
const { AppError } = require('../../middleware/errorHandler');

// @desc    Get purchase orders for supplier
// @route   GET /api/supplier/orders
// @access  Private (Supplier)
const getPurchaseOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, startDate, endDate } = req.query;

    // Get supplier profile
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    // Build query
    let query = { supplier: supplier._id };

    if (status) {
      query.status = status;
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
    const orders = await PurchaseOrder.find(query)
      .populate('orderItems.product', 'name')
      .populate('createdBy', 'firstName lastName')
      .populate('approvedBy', 'firstName lastName')
      .sort({ orderDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await PurchaseOrder.countDocuments(query);

    // Calculate summary statistics
    const stats = await PurchaseOrder.aggregate([
      { $match: { supplier: supplier._id } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalValue: { $sum: '$totalAmount' },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'Sent'] }, 1, 0] }
          },
          confirmedOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'Confirmed'] }, 1, 0] }
          },
          deliveredOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'Delivered'] }, 1, 0] }
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
          totalValue: 0,
          pendingOrders: 0,
          confirmedOrders: 0,
          deliveredOrders: 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single purchase order details
// @route   GET /api/supplier/orders/:id
// @access  Private (Supplier)
const getPurchaseOrderDetails = async (req, res, next) => {
  try {
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const order = await PurchaseOrder.findOne({
      _id: req.params.id,
      supplier: supplier._id
    })
      .populate('orderItems.product', 'name variants')
      .populate('createdBy', 'firstName lastName email')
      .populate('approvedBy', 'firstName lastName email')
      .populate('confirmedBy', 'firstName lastName email');

    if (!order) {
      return next(new AppError('Purchase order not found', 404));
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Confirm purchase order
// @route   PUT /api/supplier/orders/:id/confirm
// @access  Private (Supplier)
const confirmPurchaseOrder = async (req, res, next) => {
  try {
    const { expectedDelivery, notes } = req.body;

    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const order = await PurchaseOrder.findOne({
      _id: req.params.id,
      supplier: supplier._id
    });

    if (!order) {
      return next(new AppError('Purchase order not found', 404));
    }

    // Check if order can be confirmed
    if (order.status !== 'Sent') {
      return next(new AppError('Order cannot be confirmed in current status', 400));
    }

    // Confirm the order
    await order.confirmOrder(req.user.userId);
    
    // Update expected delivery if provided
    if (expectedDelivery) {
      order.expectedDelivery = new Date(expectedDelivery);
    }

    if (notes) {
      order.notes = notes;
    }

    await order.save();

    res.json({
      success: true,
      message: 'Purchase order confirmed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order delivery status
// @route   PUT /api/supplier/orders/:id/delivery
// @access  Private (Supplier)
const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { status, deliveryNotes } = req.body;

    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const order = await PurchaseOrder.findOne({
      _id: req.params.id,
      supplier: supplier._id
    });

    if (!order) {
      return next(new AppError('Purchase order not found', 404));
    }

    // Update delivery status
    if (status === 'delivered') {
      await order.markDelivered();
    }

    if (deliveryNotes) {
      order.notes = deliveryNotes;
      await order.save();
    }

    res.json({
      success: true,
      message: 'Delivery status updated successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject purchase order
// @route   PUT /api/supplier/orders/:id/reject
// @access  Private (Supplier)
const rejectPurchaseOrder = async (req, res, next) => {
  try {
    const { rejectionReason } = req.body;

    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const order = await PurchaseOrder.findOne({
      _id: req.params.id,
      supplier: supplier._id
    });

    if (!order) {
      return next(new AppError('Purchase order not found', 404));
    }

    // Check if order can be rejected
    if (!['Sent', 'Draft'].includes(order.status)) {
      return next(new AppError('Order cannot be rejected in current status', 400));
    }

    // Update order status
    order.status = 'Cancelled';
    order.notes = rejectionReason || 'Rejected by supplier';
    await order.save();

    res.json({
      success: true,
      message: 'Purchase order rejected successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order analytics for supplier
// @route   GET /api/supplier/orders/analytics
// @access  Private (Supplier)
const getOrderAnalytics = async (req, res, next) => {
  try {
    const { period = '30d' } = req.query;

    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

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
      case '1y':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 30);
    }

    // Get analytics data
    const analytics = await PurchaseOrder.aggregate([
      {
        $match: {
          supplier: supplier._id,
          orderDate: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalValue: { $sum: '$totalAmount' },
          averageOrderValue: { $avg: '$totalAmount' },
          statusBreakdown: {
            $push: '$status'
          }
        }
      }
    ]);

    // Get monthly trend
    const monthlyTrend = await PurchaseOrder.aggregate([
      {
        $match: {
          supplier: supplier._id,
          orderDate: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$orderDate' },
            month: { $month: '$orderDate' }
          },
          orders: { $sum: 1 },
          value: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      success: true,
      data: {
        period,
        summary: analytics[0] || {
          totalOrders: 0,
          totalValue: 0,
          averageOrderValue: 0,
          statusBreakdown: []
        },
        monthlyTrend,
        supplierRating: supplier.rating,
        deliveryPerformance: supplier.deliveryPerformance
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPurchaseOrders,
  getPurchaseOrderDetails,
  confirmPurchaseOrder,
  updateDeliveryStatus,
  rejectPurchaseOrder,
  getOrderAnalytics
};