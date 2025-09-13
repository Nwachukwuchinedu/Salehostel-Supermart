const Order = require('../../models/Order');
const Product = require('../../models/Product');
const Cart = require('../../models/Cart');

// @desc    Get customer orders
// @route   GET /api/customer/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.page) || 1;
    
    const filter = { customer: req.user._id };
    
    // Apply status filter
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    const count = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
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

// @desc    Create new order
// @route   POST /api/customer/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { 
      items, 
      shippingAddress, 
      billingAddress, 
      paymentMethod, 
      notes 
    } = req.body;
    
    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }
    
    // Calculate order totals
    let subtotal = 0;
    let totalQuantity = 0;
    
    // Validate each item and check stock
    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.product}` });
      }
      
      if (product.currentStock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.currentStock}` 
        });
      }
      
      item.price = product.sellingPrice;
      item.totalPrice = product.sellingPrice * item.quantity;
      subtotal += item.totalPrice;
      totalQuantity += item.quantity;
    }
    
    // Calculate tax and shipping (simplified)
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over ₦100
    const totalAmount = subtotal + tax + shipping;
    
    const order = new Order({
      customer: req.user._id,
      items,
      subtotal,
      tax,
      shipping,
      totalAmount,
      shippingAddress,
      billingAddress,
      paymentMethod,
      notes
    });
    
    const createdOrder = await order.save();
    
    // Clear customer cart
    await Cart.findOneAndDelete({ customer: req.user._id });
    
    res.status(201).json({
      success: true,
      order: createdOrder
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single order
// @route   GET /api/customer/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      customer: req.user._id
    }).populate('items.product', 'name sku images');
    
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

// @desc    Track order status
// @route   GET /api/customer/orders/:id/track
// @access  Private/Customer
const trackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      customer: req.user._id
    }).select('orderNumber status trackingNumber estimatedDeliveryDate deliveredAt');
    
    if (order) {
      res.json({
        success: true,
        order: {
          orderNumber: order.orderNumber,
          status: order.status,
          trackingNumber: order.trackingNumber,
          estimatedDeliveryDate: order.estimatedDeliveryDate,
          deliveredAt: order.deliveredAt
        }
      });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getOrders,
  createOrder,
  getOrder,
  trackOrder
};