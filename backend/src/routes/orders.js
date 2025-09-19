const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// @desc    Get all orders (role-based: admin sees all, others see their own)
// @route   GET /api/orders
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const query = req.user && req.user.role === 'admin' ? {} : { customer: req.user._id };
    const orders = await Order.find(query).sort({ createdAt: -1 }).select('-__v');
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error while fetching orders" });
  }
});

// @desc    Get single order (role-based access)
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).select('-__v');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if ((req.user.role !== 'admin') && String(order.customer) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching order' });
  }
});

module.exports = router;
