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
// @access  Public
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Get the first unit's price (in a real implementation, you might want to specify which unit)
    const unit = product.units && product.units.length > 0 ? product.units[0] : null;
    if (!unit) {
      return res.status(400).json({ message: 'Product has no units defined' });
    }
    
    // Check stock (using stockQuantity from the first unit)
    if (unit.stockQuantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    if (req.user) {
      // Authenticated user - save to database
      let cart = await Cart.findOne({ customer: req.user._id });
      
      if (!cart) {
        cart = new Cart({ customer: req.user._id, items: [] });
      }
      
      // Check if product already in cart
      const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      
      if (existingItemIndex > -1) {
        // Update quantity
        cart.items[existingItemIndex].quantity += quantity;
        // Update totalPrice
        cart.items[existingItemIndex].totalPrice = cart.items[existingItemIndex].quantity * cart.items[existingItemIndex].price;
      } else {
        // Add new item with required fields
        cart.items.push({ 
          product: productId, 
          quantity,
          price: unit.price,
          totalPrice: unit.price * quantity
        });
      }
      
      await cart.save();
      
      // Populate product details
      await cart.populate('items.product', 'name sku images sellingPrice');
      
      res.json({
        success: true,
        cart
      });
    } else {
      // Unauthenticated user - return item data for localStorage
      const cartItem = {
        product: {
          _id: product._id,
          name: product.name,
          images: product.images,
          sellingPrice: unit.price
        },
        quantity,
        price: unit.price,
        totalPrice: unit.price * quantity
      };
      
      res.json({
        success: true,
        item: cartItem
      });
    }
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update cart item
// @route   PUT /api/customer/cart/:productId
// @access  Public
const updateCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Get the first unit's price (in a real implementation, you might want to specify which unit)
    const unit = product.units && product.units.length > 0 ? product.units[0] : null;
    if (!unit) {
      return res.status(400).json({ message: 'Product has no units defined' });
    }
    
    if (unit.stockQuantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    if (req.user) {
      // Authenticated user - update in database
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
        // Update quantity and totalPrice
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].totalPrice = unit.price * quantity;
      }
      
      await cart.save();
      
      // Populate product details
      await cart.populate('items.product', 'name sku images sellingPrice');
      
      res.json({
        success: true,
        cart
      });
    } else {
      // Unauthenticated user - return updated item data
      const updatedItem = {
        product: {
          _id: product._id,
          name: product.name,
          images: product.images,
          sellingPrice: unit.price
        },
        quantity,
        price: unit.price,
        totalPrice: unit.price * quantity
      };
      
      res.json({
        success: true,
        item: updatedItem
      });
    }
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/customer/cart/:productId
// @access  Public
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    if (req.user) {
      // Authenticated user - remove from database
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
    } else {
      // Unauthenticated user - confirm removal
      res.json({
        success: true,
        message: 'Item removed from cart'
      });
    }
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Clear cart
// @route   DELETE /api/customer/cart
// @access  Public
const clearCart = async (req, res) => {
  try {
    if (req.user) {
      // Authenticated user - clear database cart
      const cart = await Cart.findOne({ customer: req.user._id });
      
      if (cart) {
        cart.items = [];
        await cart.save();
      }
      
      res.json({
        success: true,
        message: 'Cart cleared successfully'
      });
    } else {
      // Unauthenticated user - confirm clearing
      res.json({
        success: true,
        message: 'Cart cleared successfully'
      });
    }
  } catch (error) {
    console.error('Clear cart error:', error);
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
