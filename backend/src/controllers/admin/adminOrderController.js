const Order = require('../../models/Order');
const User = require('../../models/User');
const orderService = require('../../services/orderService');

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.page) || 1;
    
    const filter = {};
    
    // Apply filters
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.paymentStatus) {
      filter.paymentStatus = req.query.paymentStatus;
    }
    
    if (req.query.customerId) {
      filter.customer = req.query.customerId;
    }
    
    // Search by order number
    if (req.query.search) {
      filter.orderNumber = { $regex: req.query.search, $options: 'i' };
    }
    
    const count = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .populate('customer', 'name email')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    
    res.json({
      success: true,
      orders,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single order
// @route   GET /api/admin/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('items.product', 'name sku images');
    
    if (order) {
      res.json({
        success: true,
        order
      });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (order) {
      const previousStatus = order.status;
      order.status = status;
      
      // If order is delivered, set deliveredAt timestamp
      if (status === 'delivered') {
        order.deliveredAt = Date.now();
      }
      
      const updatedOrder = await order.save();
      
      // If status changed to delivered, update inventory
      if (previousStatus !== 'delivered' && status === 'delivered') {
        await orderService.processOrderDelivery(order._id, req.user._id);
      }
      
      res.json({
        success: true,
        order: updatedOrder
      });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Process refund
// @route   POST /api/admin/orders/:id/refund
// @access  Private
const processRefund = async (req, res) => {
  try {
    const { amount, reason } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (order) {
      // Update order status
      order.status = 'refunded';
      order.paymentStatus = 'refunded';
      
      const updatedOrder = await order.save();
      
      // Process refund through payment service (placeholder)
      const refundResult = await orderService.processRefund(order._id, amount, reason, req.user._id);
      
      res.json({
        success: true,
        order: updatedOrder,
        refund: refundResult
      });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get order analytics
// @route   GET /api/admin/orders/analytics
// @access  Private
const getOrderAnalytics = async (req, res) => {
  try {
    const analytics = await orderService.getOrderAnalytics();
    
    res.json({
      success: true,
      analytics
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getOrders,
  getOrder,
  updateOrderStatus,
  processRefund,
  getOrderAnalytics
};