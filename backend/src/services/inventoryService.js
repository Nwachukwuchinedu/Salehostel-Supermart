const Product = require('../models/Product');
const StockMovement = require('../models/StockMovement');
const Supply = require('../models/Supply');

// Get inventory overview with statistics
const getInventoryOverview = async () => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });
    
    // Get all products with their units
    const products = await Product.find({ isActive: true }).select('name units');
    
    // Calculate total stock value and low stock items
    let totalStockValue = 0;
    let lowStockItems = 0;
    let totalUnits = 0;
    
    products.forEach(product => {
      product.units.forEach(unit => {
        totalStockValue += (unit.stockQuantity * unit.price);
        totalUnits += unit.stockQuantity;
        
        if (unit.stockQuantity <= unit.minStockLevel) {
          lowStockItems++;
        }
      });
    });
    
    // Get recent stock movements
    const recentMovements = await StockMovement.find()
      .populate('product', 'name')
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Get pending supplies
    const pendingSupplies = await Supply.countDocuments({ status: 'pending' });
    
    return {
      totalProducts,
      totalUnits,
      totalStockValue,
      lowStockItems,
      pendingSupplies,
      recentMovements
    };
  } catch (error) {
    console.error('Error getting inventory overview:', error);
    throw error;
  }
};

// Update stock when supply is received
const updateStockFromSupply = async (supplyId, productId, unitType, quantity, costPrice) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    const unitIndex = product.units.findIndex(unit => unit.unitType === unitType);
    if (unitIndex === -1) {
      throw new Error('Unit type not found');
    }
    
    const previousStock = product.units[unitIndex].stockQuantity;
    product.units[unitIndex].stockQuantity += quantity;
    
    if (costPrice > 0) {
      product.units[unitIndex].costPrice = costPrice;
    }
    
    await product.save();
    
    // Create stock movement record
    const stockMovement = new StockMovement({
      product: productId,
      type: 'in',
      quantity,
      previousStock,
      newStock: product.units[unitIndex].stockQuantity,
      referenceType: 'supply',
      referenceId: supplyId,
      notes: `Supply received - ${unitType}`,
      createdBy: null // Will be set by the controller
    });
    
    return { product, stockMovement };
  } catch (error) {
    console.error('Error updating stock from supply:', error);
    throw error;
  }
};

// Update stock when order is placed
const updateStockFromOrder = async (orderItems) => {
  try {
    const stockMovements = [];
    
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      
      const unitIndex = product.units.findIndex(unit => unit.unitType === item.unitType);
      if (unitIndex === -1) {
        throw new Error(`Unit type not found: ${item.unitType}`);
      }
      
      if (product.units[unitIndex].stockQuantity < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name} (${item.unitType})`);
      }
      
      const previousStock = product.units[unitIndex].stockQuantity;
      product.units[unitIndex].stockQuantity -= item.quantity;
      
      await product.save();
      
      // Create stock movement record
      const stockMovement = new StockMovement({
        product: item.product,
        type: 'out',
        quantity: item.quantity,
        previousStock,
        newStock: product.units[unitIndex].stockQuantity,
        referenceType: 'order',
        referenceId: item.orderId,
        notes: `Order placed - ${item.unitType}`,
        createdBy: null // Will be set by the controller
      });
      
      stockMovements.push(stockMovement);
    }
    
    await StockMovement.insertMany(stockMovements);
    return stockMovements;
  } catch (error) {
    console.error('Error updating stock from order:', error);
    throw error;
  }
};

// Get low stock alerts
const getLowStockAlerts = async () => {
  try {
    const products = await Product.find({ isActive: true }).select('name units');
    
    const lowStockProducts = products.filter(product => 
      product.units.some(unit => unit.stockQuantity <= unit.minStockLevel)
    ).map(product => ({
      _id: product._id,
      name: product.name,
      lowStockUnits: product.units.filter(unit => unit.stockQuantity <= unit.minStockLevel)
    }));
    
    return lowStockProducts;
  } catch (error) {
    console.error('Error getting low stock alerts:', error);
    throw error;
  }
};

// Get stock movements with filters
const getStockMovements = async (filters = {}) => {
  try {
    const query = {};
    
    if (filters.productId) {
      query.product = filters.productId;
    }
    
    if (filters.type) {
      query.type = filters.type;
    }
    
    if (filters.dateFrom || filters.dateTo) {
      query.createdAt = {};
      if (filters.dateFrom) {
        query.createdAt.$gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        query.createdAt.$lte = new Date(filters.dateTo);
      }
    }
    
    const movements = await StockMovement.find(query)
      .populate('product', 'name')
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 });
    
    return movements;
  } catch (error) {
    console.error('Error getting stock movements:', error);
    throw error;
  }
};

// Get inventory report
const getInventoryReport = async (filters = {}) => {
  try {
    const query = { isActive: true };
    
    if (filters.categoryId) {
      query.category = filters.categoryId;
    }
    
    const products = await Product.find(query)
      .populate('category', 'name')
      .select('name category units');
    
    const report = products.map(product => {
      const totalStock = product.units.reduce((sum, unit) => sum + unit.stockQuantity, 0);
      const totalValue = product.units.reduce((sum, unit) => sum + (unit.stockQuantity * unit.price), 0);
      const lowStockUnits = product.units.filter(unit => unit.stockQuantity <= unit.minStockLevel);
      
      return {
        _id: product._id,
        name: product.name,
        category: product.category.name,
        totalStock,
        totalValue,
        lowStockUnits: lowStockUnits.length,
        units: product.units.map(unit => ({
          unitType: unit.unitType,
          stockQuantity: unit.stockQuantity,
          minStockLevel: unit.minStockLevel,
          price: unit.price,
          isLowStock: unit.stockQuantity <= unit.minStockLevel
        }))
      };
    });
    
    return report;
  } catch (error) {
    console.error('Error getting inventory report:', error);
    throw error;
  }
};

module.exports = {
  getInventoryOverview,
  updateStockFromSupply,
  updateStockFromOrder,
  getLowStockAlerts,
  getStockMovements,
  getInventoryReport
};