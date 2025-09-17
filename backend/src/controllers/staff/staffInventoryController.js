const Product = require('../../models/Product');
const StockMovement = require('../../models/StockMovement');
const { AppError } = require('../../middleware/errorHandler');
const InventoryService = require('../../services/inventoryService');

// @desc    Get inventory overview for staff
// @route   GET /api/staff/inventory
// @access  Private (Staff)
const getInventoryOverview = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      category, 
      status,
      location,
      sortBy = 'name'
    } = req.query;

    // Build query
    let query = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (category) {
      query.productGroup = category;
    }

    // Filter by stock status
    if (status) {
      switch (status) {
        case 'low_stock':
          // This will be handled in aggregation
          break;
        case 'out_of_stock':
          query['variants.quantity'] = 0;
          break;
        case 'in_stock':
          query['variants.quantity'] = { $gt: 0 };
          break;
      }
    }

    // Build sort criteria
    let sortCriteria = {};
    switch (sortBy) {
      case 'name':
        sortCriteria.name = 1;
        break;
      case 'stock_asc':
        sortCriteria['totalStock'] = 1;
        break;
      case 'stock_desc':
        sortCriteria['totalStock'] = -1;
        break;
      case 'updated':
        sortCriteria.updatedAt = -1;
        break;
      default:
        sortCriteria.name = 1;
    }

    // Use aggregation to calculate stock levels
    const pipeline = [
      { $match: query },
      {
        $addFields: {
          totalStock: { $sum: '$variants.quantity' },
          minStockLevel: { $min: '$variants.minStockLevel' },
          isLowStock: {
            $lt: [{ $sum: '$variants.quantity' }, { $min: '$variants.minStockLevel' }]
          }
        }
      }
    ];

    // Add low stock filter if specified
    if (status === 'low_stock') {
      pipeline.push({
        $match: { isLowStock: true }
      });
    }

    // Add sorting and pagination
    pipeline.push(
      { $sort: sortCriteria },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) }
    );

    // Add population
    pipeline.push(
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'supplier',
          foreignField: '_id',
          as: 'supplier'
        }
      }
    );

    const products = await Product.aggregate(pipeline);

    // Get total count for pagination
    const totalPipeline = [
      { $match: query },
      {
        $addFields: {
          isLowStock: {
            $lt: [{ $sum: '$variants.quantity' }, { $min: '$variants.minStockLevel' }]
          }
        }
      }
    ];

    if (status === 'low_stock') {
      totalPipeline.push({ $match: { isLowStock: true } });
    }

    totalPipeline.push({ $count: 'total' });
    const totalResult = await Product.aggregate(totalPipeline);
    const total = totalResult[0]?.total || 0;

    // Get inventory statistics
    const stats = await InventoryService.getInventoryOverview();

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        },
        stats
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update stock levels
// @route   PUT /api/staff/inventory/:id/stock
// @access  Private (Staff)
const updateStock = async (req, res, next) => {
  try {
    const { variantId, quantity, reason, notes } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Find the variant
    const variant = product.variants.id(variantId);
    if (!variant) {
      return next(new AppError('Product variant not found', 404));
    }

    const oldQuantity = variant.quantity;
    const adjustment = quantity - oldQuantity;

    // Update the variant quantity
    variant.quantity = quantity;
    await product.save();

    // Record stock movement
    await InventoryService.adjustStock(
      product._id,
      variantId,
      adjustment,
      reason || 'Staff adjustment',
      req.user.userId,
      notes
    );

    res.json({
      success: true,
      message: 'Stock updated successfully',
      data: {
        product: product.name,
        variant: variant.packageType,
        oldQuantity,
        newQuantity: quantity,
        adjustment
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get low stock alerts
// @route   GET /api/staff/inventory/alerts
// @access  Private (Staff)
const getLowStockAlerts = async (req, res, next) => {
  try {
    const alerts = await InventoryService.getLowStockAlerts();

    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get stock movements
// @route   GET /api/staff/inventory/movements
// @access  Private (Staff)
const getStockMovements = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      productId, 
      movementType,
      startDate,
      endDate 
    } = req.query;

    let query = {};

    if (productId) {
      query.product = productId;
    }

    if (movementType) {
      query.movementType = movementType;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    const movements = await StockMovement.find(query)
      .populate('product', 'name')
      .populate('performedBy', 'firstName lastName')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await StockMovement.countDocuments(query);

    res.json({
      success: true,
      data: {
        movements,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Perform stock count/audit
// @route   POST /api/staff/inventory/stock-count
// @access  Private (Staff)
const performStockCount = async (req, res, next) => {
  try {
    const { productId, variantId, physicalCount, notes } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    const variant = product.variants.id(variantId);
    if (!variant) {
      return next(new AppError('Product variant not found', 404));
    }

    const systemCount = variant.quantity;
    const difference = physicalCount - systemCount;

    // If there's a difference, adjust the stock
    if (difference !== 0) {
      await InventoryService.adjustStock(
        productId,
        variantId,
        difference,
        'Stock count adjustment',
        req.user.userId,
        notes || `Physical count: ${physicalCount}, System count: ${systemCount}`
      );

      // Update the variant quantity
      variant.quantity = physicalCount;
      await product.save();
    }

    // Record the stock count
    const stockCount = {
      product: productId,
      variant: variantId,
      systemCount,
      physicalCount,
      difference,
      countedBy: req.user.userId,
      countDate: new Date(),
      notes
    };

    res.json({
      success: true,
      message: difference === 0 ? 'Stock count matches system' : 'Stock adjusted based on physical count',
      data: stockCount
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search inventory
// @route   GET /api/staff/inventory/search
// @access  Private (Staff)
const searchInventory = async (req, res, next) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q) {
      return res.json({
        success: true,
        data: []
      });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
        { 'variants.packageType': { $regex: q, $options: 'i' } }
      ],
      isActive: true
    })
      .select('name variants productGroup')
      .limit(parseInt(limit));

    // Format results for quick access
    const results = products.map(product => ({
      id: product._id,
      name: product.name,
      category: product.productGroup,
      variants: product.variants.map(variant => ({
        id: variant._id,
        packageType: variant.packageType,
        quantity: variant.quantity,
        price: variant.price,
        isLowStock: variant.quantity <= variant.minStockLevel
      }))
    }));

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get inventory summary for dashboard
// @route   GET /api/staff/inventory/summary
// @access  Private (Staff)
const getInventorySummary = async (req, res, next) => {
  try {
    // Get quick stats for staff dashboard
    const summary = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalStock: { $sum: { $sum: '$variants.quantity' } },
          lowStockProducts: {
            $sum: {
              $cond: [
                { $lt: [{ $sum: '$variants.quantity' }, { $min: '$variants.minStockLevel' }] },
                1,
                0
              ]
            }
          },
          outOfStockProducts: {
            $sum: {
              $cond: [
                { $eq: [{ $sum: '$variants.quantity' }, 0] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    // Get recent stock movements
    const recentMovements = await StockMovement.find()
      .populate('product', 'name')
      .populate('performedBy', 'firstName lastName')
      .sort({ date: -1 })
      .limit(5);

    // Get top low stock items
    const lowStockItems = await Product.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$variants' },
      {
        $match: {
          $expr: { $lte: ['$variants.quantity', '$variants.minStockLevel'] }
        }
      },
      {
        $project: {
          name: 1,
          packageType: '$variants.packageType',
          currentStock: '$variants.quantity',
          minStockLevel: '$variants.minStockLevel'
        }
      },
      { $sort: { currentStock: 1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      data: {
        summary: summary[0] || {
          totalProducts: 0,
          totalStock: 0,
          lowStockProducts: 0,
          outOfStockProducts: 0
        },
        recentMovements,
        lowStockItems
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInventoryOverview,
  updateStock,
  getLowStockAlerts,
  getStockMovements,
  performStockCount,
  searchInventory,
  getInventorySummary
};