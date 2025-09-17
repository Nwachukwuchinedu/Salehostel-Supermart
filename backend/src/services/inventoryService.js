const Product = require('../models/Product');
const StockMovement = require('../models/StockMovement');
const { createBusinessError } = require('../middleware/errorHandler');

class InventoryService {
  /**
   * Adjust stock levels for a product variant
   */
  static async adjustStock(productId, variantId, quantity, reason, userId, notes = '') {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw createBusinessError('Product not found', 404);
      }

      const variant = product.variants.id(variantId);
      if (!variant) {
        throw createBusinessError('Product variant not found', 404);
      }

      const quantityBefore = variant.currentStock;
      const quantityChanged = quantity - quantityBefore;

      // Record stock movement
      await StockMovement.recordMovement({
        product: productId,
        variantId: variantId,
        movementType: 'adjustment',
        quantityChanged: quantityChanged,
        reason: reason,
        performedBy: userId,
        notes: notes,
        source: 'manual'
      });

      return {
        success: true,
        quantityBefore,
        quantityAfter: quantity,
        quantityChanged
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Record product sale (decreases stock)
   */
  static async recordSale(productId, variantId, quantity, orderId, userId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw createBusinessError('Product not found', 404);
      }

      const variant = product.variants.id(variantId);
      if (!variant) {
        throw createBusinessError('Product variant not found', 404);
      }

      if (variant.currentStock < quantity) {
        throw createBusinessError(
          `Insufficient stock. Available: ${variant.currentStock}, Required: ${quantity}`,
          400
        );
      }

      // Record stock movement
      await StockMovement.recordMovement({
        product: productId,
        variantId: variantId,
        movementType: 'sale',
        quantityChanged: -quantity,
        reason: 'Product sold',
        performedBy: userId,
        reference: orderId,
        referenceType: 'order',
        referenceId: orderId,
        source: 'system'
      });

      // Update product sales statistics
      product.totalSold += quantity;
      product.totalRevenue += (variant.price * quantity);
      await product.save();

      return {
        success: true,
        quantityBefore: variant.currentStock + quantity,
        quantityAfter: variant.currentStock,
        quantitySold: quantity
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Record product purchase (increases stock)
   */
  static async recordPurchase(productId, variantId, quantity, purchaseId, userId, unitCost = null) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw createBusinessError('Product not found', 404);
      }

      const variant = product.variants.id(variantId);
      if (!variant) {
        throw createBusinessError('Product variant not found', 404);
      }

      // Record stock movement
      await StockMovement.recordMovement({
        product: productId,
        variantId: variantId,
        movementType: 'purchase',
        quantityChanged: quantity,
        reason: 'Stock received from supplier',
        performedBy: userId,
        reference: purchaseId,
        referenceType: 'purchase-order',
        referenceId: purchaseId,
        unitCost: unitCost,
        source: 'system'
      });

      return {
        success: true,
        quantityBefore: variant.currentStock - quantity,
        quantityAfter: variant.currentStock,
        quantityAdded: quantity
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if product is low in stock
   */
  static async isLowStock(productId, variantId = null) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return false;
      }

      if (variantId) {
        const variant = product.variants.id(variantId);
        return variant ? variant.currentStock <= variant.minStockLevel : false;
      }

      // Check if any variant is low in stock
      return product.variants.some(variant => 
        variant.currentStock <= variant.minStockLevel && variant.isAvailable
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get inventory overview
   */
  static async getInventoryOverview() {
    try {
      const [
        totalProducts,
        lowStockProducts,
        outOfStockProducts,
        totalValue,
        recentMovements
      ] = await Promise.all([
        Product.countDocuments({ isActive: true }),
        Product.getLowStock(),
        Product.aggregate([
          { $match: { isActive: true } },
          { $unwind: '$variants' },
          { $match: { 'variants.currentStock': 0, 'variants.isAvailable': true } },
          { $count: 'outOfStock' }
        ]),
        this.calculateInventoryValue(),
        StockMovement.find({})
          .populate('product', 'name')
          .populate('performedBy', 'firstName lastName')
          .sort({ createdAt: -1 })
          .limit(10)
      ]);

      return {
        totalProducts,
        lowStockCount: lowStockProducts.length,
        outOfStockCount: outOfStockProducts[0]?.outOfStock || 0,
        totalValue: totalValue.totalValue || 0,
        lowStockProducts: lowStockProducts.slice(0, 10), // Top 10 low stock items
        recentMovements
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Calculate total inventory value
   */
  static async calculateInventoryValue() {
    try {
      const result = await Product.aggregate([
        { $match: { isActive: true } },
        { $unwind: '$variants' },
        { $match: { 'variants.isAvailable': true } },
        {
          $group: {
            _id: null,
            totalValue: {
              $sum: {
                $multiply: ['$variants.currentStock', '$variants.costPrice']
              }
            },
            totalRetailValue: {
              $sum: {
                $multiply: ['$variants.currentStock', '$variants.price']
              }
            },
            totalItems: { $sum: '$variants.currentStock' }
          }
        }
      ]);

      return result[0] || { totalValue: 0, totalRetailValue: 0, totalItems: 0 };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create stock movement record
   */
  static async createStockMovement(data) {
    try {
      return await StockMovement.recordMovement(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get stock movements for a product
   */
  static async getProductStockMovements(productId, options = {}) {
    try {
      return await StockMovement.getProductMovements(productId, null, options);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get low stock alerts
   */
  static async getLowStockAlerts() {
    try {
      return await Product.getLowStock();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Bulk stock update
   */
  static async bulkStockUpdate(updates, userId) {
    try {
      const results = [];
      
      for (const update of updates) {
        const { productId, variantId, quantity, reason, notes } = update;
        
        try {
          const result = await this.adjustStock(
            productId, 
            variantId, 
            quantity, 
            reason || 'Bulk stock update', 
            userId, 
            notes
          );
          
          results.push({
            productId,
            variantId,
            success: true,
            ...result
          });
        } catch (error) {
          results.push({
            productId,
            variantId,
            success: false,
            error: error.message
          });
        }
      }

      return {
        totalUpdates: updates.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Stock audit - compare system stock with physical count
   */
  static async performStockAudit(auditData, userId) {
    try {
      const results = [];
      
      for (const audit of auditData) {
        const { productId, variantId, physicalCount, notes } = audit;
        
        try {
          const product = await Product.findById(productId);
          if (!product) {
            results.push({
              productId,
              variantId,
              success: false,
              error: 'Product not found'
            });
            continue;
          }

          const variant = product.variants.id(variantId);
          if (!variant) {
            results.push({
              productId,
              variantId,
              success: false,
              error: 'Variant not found'
            });
            continue;
          }

          const systemCount = variant.currentStock;
          const difference = physicalCount - systemCount;

          if (difference !== 0) {
            // Record audit adjustment
            await StockMovement.recordMovement({
              product: productId,
              variantId: variantId,
              movementType: 'audit',
              quantityChanged: difference,
              reason: `Stock audit adjustment. Physical: ${physicalCount}, System: ${systemCount}`,
              performedBy: userId,
              notes: notes || '',
              source: 'audit'
            });
          }

          results.push({
            productId,
            variantId,
            success: true,
            systemCount,
            physicalCount,
            difference,
            adjusted: difference !== 0
          });
        } catch (error) {
          results.push({
            productId,
            variantId,
            success: false,
            error: error.message
          });
        }
      }

      return {
        totalAudited: auditData.length,
        adjustmentsMade: results.filter(r => r.success && r.adjusted).length,
        results
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get inventory turnover rate
   */
  static async getInventoryTurnover(startDate, endDate) {
    try {
      const [salesData, averageInventory] = await Promise.all([
        StockMovement.aggregate([
          {
            $match: {
              movementType: 'sale',
              movementDate: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              }
            }
          },
          {
            $group: {
              _id: { product: '$product', variantId: '$variantId' },
              totalSold: { $sum: { $abs: '$quantityChanged' } },
              totalValue: { $sum: '$totalCost' }
            }
          }
        ]),
        this.calculateInventoryValue()
      ]);

      const totalSoldValue = salesData.reduce((sum, item) => sum + (item.totalValue || 0), 0);
      const turnoverRate = averageInventory.totalValue > 0 
        ? totalSoldValue / averageInventory.totalValue 
        : 0;

      return {
        turnoverRate,
        totalSoldValue,
        averageInventoryValue: averageInventory.totalValue,
        period: { startDate, endDate }
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Predict stock requirements based on sales history
   */
  static async predictStockRequirements(productId, variantId, days = 30) {
    try {
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));

      const salesHistory = await StockMovement.find({
        product: productId,
        variantId: variantId,
        movementType: 'sale',
        movementDate: { $gte: startDate, $lte: endDate }
      }).sort({ movementDate: 1 });

      if (salesHistory.length === 0) {
        return {
          averageDailySales: 0,
          predictedRequirement: 0,
          recommendedReorderPoint: 0,
          daysOfStock: 0
        };
      }

      const totalSold = salesHistory.reduce((sum, movement) => 
        sum + Math.abs(movement.quantityChanged), 0
      );
      
      const averageDailySales = totalSold / days;
      const predictedRequirement = Math.ceil(averageDailySales * 30); // 30 days forecast
      
      const product = await Product.findById(productId);
      const variant = product.variants.id(variantId);
      const currentStock = variant.currentStock;
      
      const daysOfStock = averageDailySales > 0 ? currentStock / averageDailySales : Infinity;
      const recommendedReorderPoint = Math.ceil(averageDailySales * 7); // 7 days buffer

      return {
        averageDailySales: Math.round(averageDailySales * 100) / 100,
        predictedRequirement,
        recommendedReorderPoint,
        daysOfStock: Math.round(daysOfStock * 100) / 100,
        currentStock
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = InventoryService;