const Order = require('../../models/Order');
const { updateStockFromOrder } = require('../../services/inventoryService');

// GET /api/customer/orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json({ success: true, orders });
  } catch (error) {
    console.error('getOrders error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

// POST /api/customer/orders
const createOrder = async (req, res) => {
  try {
    const { items = [], shippingAddress = {}, billingAddress = {}, notes, paymentMethod = 'cash_on_delivery' } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order items required' });
    }

    // Compute totals
    let subtotal = 0;
    const normalizedItems = items.map((it) => {
      const quantity = Number(it.quantity || 0);
      const price = Number(it.price || 0);
      const totalPrice = quantity * price;
      subtotal += totalPrice;
      return {
        product: it.product,
        quantity,
        price,
        totalPrice,
        unitType: it.unitType, // keep if sent for inventory update
      };
    });

    const shipping = Number(req.body.shipping || 0);
    const tax = Number(req.body.tax || 0);
    const totalAmount = subtotal + shipping + tax;

    // Create order
    const order = new Order({
      customer: req.user._id,
      items: normalizedItems.map(({ unitType, ...rest }) => rest),
      subtotal,
      tax,
      shipping,
      totalAmount,
      paymentMethod,
      shippingAddress: {
        name: shippingAddress.name || `${req.user.firstName || ''} ${req.user.lastName || ''}`.trim(),
        street: shippingAddress.street || shippingAddress.address || 'N/A',
        city: shippingAddress.city || 'N/A',
        state: shippingAddress.state || 'N/A',
        zipCode: shippingAddress.zipCode || '000000',
        country: shippingAddress.country || 'NG',
        phone: shippingAddress.phone || req.user.callNumber || req.user.whatsappNumber || ''
      },
      billingAddress: {
        name: (billingAddress.name || shippingAddress.name) || `${req.user.firstName || ''} ${req.user.lastName || ''}`.trim(),
        street: (billingAddress.street || billingAddress.address) || shippingAddress.street || 'N/A',
        city: billingAddress.city || shippingAddress.city || 'N/A',
        state: billingAddress.state || shippingAddress.state || 'N/A',
        zipCode: billingAddress.zipCode || shippingAddress.zipCode || '000000',
        country: billingAddress.country || shippingAddress.country || 'NG',
        phone: billingAddress.phone || shippingAddress.phone || req.user.callNumber || ''
      },
      notes: notes || ''
    });

    const created = await order.save();

    // Update stock and record movements
    try {
      await updateStockFromOrder(
        normalizedItems.map((it) => ({
          product: it.product,
          unitType: it.unitType,
          quantity: it.quantity,
          orderId: created._id,
        }))
      );
    } catch (stockErr) {
      console.error('Stock update failed after order save, rolling back order id:', created._id, stockErr);
      await Order.findByIdAndDelete(created._id);
      return res.status(400).json({ success: false, message: stockErr.message || 'Insufficient stock' });
    }

    res.status(201).json({ success: true, order: created });
  } catch (error) {
    console.error('createOrder error:', error);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};

// GET /api/customer/orders/:id
const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, customer: req.user._id }).select('-__v');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    console.error('getOrder error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch order' });
  }
};

// GET /api/customer/orders/:id/track
const trackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, customer: req.user._id }).select('status trackingNumber estimatedDeliveryDate createdAt updatedAt');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, tracking: order });
  } catch (error) {
    console.error('trackOrder error:', error);
    res.status(500).json({ success: false, message: 'Failed to track order' });
  }
};

module.exports = {
  getOrders,
  createOrder,
  getOrder,
  trackOrder,
};
