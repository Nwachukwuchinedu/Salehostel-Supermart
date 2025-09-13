const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

// @desc    Get user cart
// @route   GET /api/customer/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ customer: req.user._id }).populate('items.product', 'name sku images sellingPrice');
    
    if (!cart) {
      cart = new Cart({ customer: req.user._id, items: [] });
      await cart.save();
    }
    
    res.json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add item to cart
// @route   POST /api/customer/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.currentStock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ customer: req.user._id });
    
    if (!cart) {
      cart = new Cart({ customer: req.user._id, items: [] });
    }
    
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ product: productId, quantity });
    }
    
    await cart.save();
    
    // Populate product details
    await cart.populate('items.product', 'name sku images sellingPrice');
    
    res.json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update cart item
// @route   PUT /api/customer/cart/:productId
// @access  Private
const updateCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.currentStock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    const cart = await Cart.findOne({ customer: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }
    
    await cart.save();
    
    // Populate product details
    await cart.populate('items.product', 'name sku images sellingPrice');
    
    res.json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/customer/cart/:productId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const cart = await Cart.findOne({ customer: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    
    await cart.save();
    
    // Populate product details
    await cart.populate('items.product', 'name sku images sellingPrice');
    
    res.json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Clear cart
// @route   DELETE /api/customer/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ customer: req.user._id });
    
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    
    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart
};