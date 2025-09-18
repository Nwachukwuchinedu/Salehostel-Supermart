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
      isActive: true
    }).select('name units');

    // Filter products with low stock in any unit
    const productsWithLowStock = lowStockProducts.filter(product =>
      product.units.some(unit => unit.stockQuantity <= unit.minStockLevel)
    );

    res.json({
      success: true,
      overview,
      lowStockCount: productsWithLowStock.length,
      lowStockProducts: productsWithLowStock
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
    const { productId, unitType, quantity, reason, notes } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the specific unit to adjust
    const unitIndex = product.units.findIndex(unit => unit.unitType === unitType);
    if (unitIndex === -1) {
      return res.status(404).json({ message: 'Unit type not found for this product' });
    }

    // Update product stock for specific unit
    const previousStock = product.units[unitIndex].stockQuantity;
    product.units[unitIndex].stockQuantity = quantity;
    await product.save();

    // Create stock movement record
    const stockMovement = new StockMovement({
      product: productId,
      type: 'adjustment',
      quantity: quantity - previousStock,
      previousStock,
      newStock: quantity,
      referenceType: 'adjustment',
      referenceId: productId,
      notes: `${reason} - Unit: ${unitType}`,
      createdBy: req.user._id
    });

    await stockMovement.save();

    res.json({
      success: true,
      message: 'Stock adjusted successfully',
      product: {
        _id: product._id,
        name: product.name,
        unitType,
        previousStock,
        newStock: quantity
      },
      stockMovement
    });
  } catch (error) {
    console.error('Error adjusting stock:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
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
      isActive: true
    })
      .select('name units')
      .sort({ name: 1 });

    // Filter products with low stock in any unit
    const lowStockProducts = products.filter(product =>
      product.units.some(unit => unit.stockQuantity <= unit.minStockLevel)
    ).map(product => ({
      _id: product._id,
      name: product.name,
      lowStockUnits: product.units.filter(unit => unit.stockQuantity <= unit.minStockLevel)
    }));

    res.json({
      success: true,
      products: lowStockProducts,
      count: lowStockProducts.length
    });
  } catch (error) {
    console.error('Error getting low stock alerts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getInventoryOverview,
  adjustStock,
  getStockMovements,
  getLowStockAlerts
};