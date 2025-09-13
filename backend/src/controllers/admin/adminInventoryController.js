const Product = require('../../models/Product');
const StockMovement = require('../../models/StockMovement');
const inventoryService = require('../../services/inventoryService');

// @desc    Get inventory overview
// @route   GET /api/admin/inventory
// @access  Private
const getInventoryOverview = async (req, res) => {
  try {
    const overview = await inventoryService.getInventoryOverview();
    
    // Get low stock products
    const lowStockProducts = await Product.find({
      currentStock: { $lte: '$minStockLevel' },
      isActive: true
    }).select('name sku currentStock minStockLevel');
    
    res.json({
      success: true,
      overview,
      lowStockCount: lowStockProducts.length,
      lowStockProducts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Adjust stock manually
// @route   POST /api/admin/inventory/adjust
// @access  Private
const adjustStock = async (req, res) => {
  try {
    const { productId, quantity, reason, notes } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Update product stock
    const previousStock = product.currentStock;
    product.currentStock = quantity;
    await product.save();
    
    // Create stock movement record
    const stockMovement = new StockMovement({
      product: productId,
      type: 'manual_adjustment',
      quantity: quantity - previousStock,
      previousStock,
      newStock: quantity,
      reason,
      notes,
      createdBy: req.user._id
    });
    
    await stockMovement.save();
    
    res.json({
      success: true,
      message: 'Stock adjusted successfully',
      product: {
        _id: product._id,
        name: product.name,
        sku: product.sku,
        previousStock,
        newStock: product.currentStock
      },
      stockMovement
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get stock movements
// @route   GET /api/admin/inventory/movements
// @access  Private
const getStockMovements = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.page) || 1;
    
    const filter = {};
    
    if (req.query.productId) {
      filter.product = req.query.productId;
    }
    
    if (req.query.type) {
      filter.type = req.query.type;
    }
    
    const count = await StockMovement.countDocuments(filter);
    const movements = await StockMovement.find(filter)
      .populate('product', 'name sku')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    
    res.json({
      success: true,
      movements,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get low stock alerts
// @route   GET /api/admin/inventory/alerts
// @access  Private
const getLowStockAlerts = async (req, res) => {
  try {
    const products = await Product.find({
      currentStock: { $lte: '$minStockLevel' },
      isActive: true
    })
    .select('name sku currentStock minStockLevel unit')
    .sort({ currentStock: 1 });
    
    res.json({
      success: true,
      products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getInventoryOverview,
  adjustStock,
  getStockMovements,
  getLowStockAlerts
};