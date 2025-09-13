const Product = require('../models/Product');
const StockMovement = require('../models/StockMovement');

// Inventory Service
class InventoryService {
  // Adjust stock levels
  async adjustStock(productId, quantity, reason, userId, notes = '') {
    try {
      // Validate product exists
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
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
        createdBy: userId
      });
      
      await stockMovement.save();
      
      return {
        success: true,
        product: {
          _id: product._id,
          name: product.name,
          sku: product.sku,
          previousStock,
          newStock: product.currentStock
        },
        stockMovement
      };
    } catch (error) {
      throw new Error(`Failed to adjust stock: ${error.message}`);
    }
  }

  // Check if product is low in stock
  async isLowStock(productId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      
      return product.currentStock <= product.minStockLevel;
    } catch (error) {
      throw new Error(`Failed to check stock level: ${error.message}`);
    }
  }

  // Get inventory overview
  async getInventoryOverview() {
    try {
      const totalProducts = await Product.countDocuments({ isActive: true });
      
      const lowStockProducts = await Product.countDocuments({
        currentStock: { $lte: '$minStockLevel' },
        isActive: true
      });
      
      const outOfStockProducts = await Product.countDocuments({
        currentStock: 0,
        isActive: true
      });
      
      // Get recent stock movements (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentMovements = await StockMovement.countDocuments({
        createdAt: { $gte: thirtyDaysAgo }
      });
      
      return {
        totalProducts,
        lowStockProducts,
        outOfStockProducts,
        recentMovements
      };
    } catch (error) {
      throw new Error(`Failed to get inventory overview: ${error.message}`);
    }
  }

  // Create stock movement record
  async createStockMovement(data) {
    try {
      const stockMovement = new StockMovement(data);
      await stockMovement.save();
      return stockMovement;
    } catch (error) {
      throw new Error(`Failed to create stock movement: ${error.message}`);
    }
  }
  
  // Record product purchase (increases stock)
  async recordPurchase(productId, quantity, purchaseId, userId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      
      const previousStock = product.currentStock;
      product.currentStock += quantity;
      await product.save();
      
      const stockMovement = new StockMovement({
        product: productId,
        type: 'purchase',
        quantity: quantity,
        previousStock,
        newStock: product.currentStock,
        referenceId: purchaseId,
        reason: 'Product purchased',
        createdBy: userId
      });
      
      await stockMovement.save();
      
      return {
        success: true,
        product,
        stockMovement
      };
    } catch (error) {
      throw new Error(`Failed to record purchase: ${error.message}`);
    }
  }
  
  // Record product sale (decreases stock)
  async recordSale(productId, quantity, orderId, userId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      
      if (product.currentStock < quantity) {
        throw new Error('Insufficient stock');
      }
      
      const previousStock = product.currentStock;
      product.currentStock -= quantity;
      await product.save();
      
      const stockMovement = new StockMovement({
        product: productId,
        type: 'sale',
        quantity: -quantity,
        previousStock,
        newStock: product.currentStock,
        referenceId: orderId,
        reason: 'Product sold',
        createdBy: userId
      });
      
      await stockMovement.save();
      
      return {
        success: true,
        product,
        stockMovement
      };
    } catch (error) {
      throw new Error(`Failed to record sale: ${error.message}`);
    }
  }
}

module.exports = new InventoryService();