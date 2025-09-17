const Supply = require('../../models/Supply');
const Product = require('../../models/Product');
const Supplier = require('../../models/Supplier');
const StockMovement = require('../../models/StockMovement');
const { AppError } = require('../../middleware/errorHandler');
const InventoryService = require('../../services/inventoryService');

// @desc    Create new supply
// @route   POST /api/supplier/supplies
// @access  Private (Supplier)
const createSupply = async (req, res, next) => {
  try {
    const { supplyItems, notes } = req.body;

    // Get supplier profile
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    // Validate and process supply items
    const processedItems = [];
    let totalAmount = 0;

    for (const item of supplyItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return next(new AppError(`Product not found: ${item.productName}`, 404));
      }

      // Check if supplier supplies this product
      if (product.supplier.toString() !== supplier._id.toString()) {
        return next(new AppError(`You are not authorized to supply ${product.name}`, 403));
      }

      const processedItem = {
        product: product._id,
        productName: product.name,
        packageType: item.packageType,
        quantitySupplied: item.quantitySupplied,
        unitCostPrice: item.unitCostPrice,
        totalCost: item.quantitySupplied * item.unitCostPrice,
        expiryDate: item.expiryDate
      };

      processedItems.push(processedItem);
      totalAmount += processedItem.totalCost;
    }

    // Create supply record
    const supply = await Supply.create({
      supplierName: supplier.companyName,
      supplier: supplier._id,
      supplyItems: processedItems,
      totalAmount,
      receivedBy: req.user.userId, // For now, supplier creates their own supply
      notes,
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      message: 'Supply created successfully',
      data: supply
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get supplier's supply history
// @route   GET /api/supplier/supplies
// @access  Private (Supplier)
const getSupplyHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, startDate, endDate } = req.query;

    // Get supplier profile
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    // Build query
    let query = { supplier: supplier._id };

    if (status) {
      query.status = status;
    }

    if (startDate || endDate) {
      query.supplyDate = {};
      if (startDate) {
        query.supplyDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.supplyDate.$lte = new Date(endDate);
      }
    }

    // Execute query with pagination
    const supplies = await Supply.find(query)
      .populate('supplyItems.product', 'name')
      .populate('receivedBy', 'firstName lastName')
      .sort({ supplyDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Supply.countDocuments(query);

    // Calculate summary statistics
    const stats = await Supply.aggregate([
      { $match: { supplier: supplier._id } },
      {
        $group: {
          _id: null,
          totalSupplies: { $sum: 1 },
          totalValue: { $sum: '$totalAmount' },
          pendingSupplies: {
            $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] }
          },
          verifiedSupplies: {
            $sum: { $cond: [{ $eq: ['$status', 'Verified'] }, 1, 0] }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        supplies,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        },
        stats: stats[0] || {
          totalSupplies: 0,
          totalValue: 0,
          pendingSupplies: 0,
          verifiedSupplies: 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single supply details
// @route   GET /api/supplier/supplies/:id
// @access  Private (Supplier)
const getSupplyDetails = async (req, res, next) => {
  try {
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const supply = await Supply.findOne({
      _id: req.params.id,
      supplier: supplier._id
    })
      .populate('supplyItems.product', 'name variants')
      .populate('receivedBy', 'firstName lastName')
      .populate('supplier', 'companyName contactDetails');

    if (!supply) {
      return next(new AppError('Supply not found', 404));
    }

    res.json({
      success: true,
      data: supply
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update supply
// @route   PUT /api/supplier/supplies/:id
// @access  Private (Supplier)
const updateSupply = async (req, res, next) => {
  try {
    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const supply = await Supply.findOne({
      _id: req.params.id,
      supplier: supplier._id
    });

    if (!supply) {
      return next(new AppError('Supply not found', 404));
    }

    // Only allow updates if supply is still pending
    if (supply.status !== 'Pending') {
      return next(new AppError('Cannot update supply that has been processed', 400));
    }

    const updatedSupply = await Supply.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.json({
      success: true,
      message: 'Supply updated successfully',
      data: updatedSupply
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Confirm supply delivery
// @route   PUT /api/supplier/supplies/:id/confirm
// @access  Private (Supplier)
const confirmSupplyDelivery = async (req, res, next) => {
  try {
    const { deliveryNotes } = req.body;

    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    const supply = await Supply.findOne({
      _id: req.params.id,
      supplier: supplier._id
    });

    if (!supply) {
      return next(new AppError('Supply not found', 404));
    }

    // Update supply status
    supply.status = 'Received';
    supply.notes = deliveryNotes || supply.notes;
    await supply.save();

    // Update inventory for each supply item
    for (const item of supply.supplyItems) {
      await InventoryService.recordPurchase(
        item.product,
        null, // variantId - will be handled in the service
        item.quantitySupplied,
        supply._id,
        req.user.userId,
        item.unitCostPrice
      );
    }

    // Update supplier performance
    await supplier.updatePerformance({
      totalAmount: supply.totalAmount,
      isOnTime: true // This could be calculated based on expected vs actual delivery
    });

    res.json({
      success: true,
      message: 'Supply delivery confirmed and inventory updated',
      data: supply
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get supply analytics
// @route   GET /api/supplier/supplies/analytics
// @access  Private (Supplier)
const getSupplyAnalytics = async (req, res, next) => {
  try {
    const { period = '30d' } = req.query;

    const supplier = await Supplier.findOne({ user: req.user.userId });
    if (!supplier) {
      return next(new AppError('Supplier profile not found', 404));
    }

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    
    switch (period) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(endDate.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 30);
    }

    // Get analytics data
    const analytics = await Supply.aggregate([
      {
        $match: {
          supplier: supplier._id,
          supplyDate: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          totalSupplies: { $sum: 1 },
          totalValue: { $sum: '$totalAmount' },
          averageSupplyValue: { $avg: '$totalAmount' },
          statusBreakdown: {
            $push: '$status'
          }
        }
      }
    ]);

    // Get top supplied products
    const topProducts = await Supply.aggregate([
      {
        $match: {
          supplier: supplier._id,
          supplyDate: { $gte: startDate, $lte: endDate }
        }
      },
      { $unwind: '$supplyItems' },
      {
        $group: {
          _id: '$supplyItems.product',
          productName: { $first: '$supplyItems.productName' },
          totalQuantity: { $sum: '$supplyItems.quantitySupplied' },
          totalValue: { $sum: '$supplyItems.totalCost' },
          suppliesCount: { $sum: 1 }
        }
      },
      { $sort: { totalValue: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      data: {
        period,
        summary: analytics[0] || {
          totalSupplies: 0,
          totalValue: 0,
          averageSupplyValue: 0,
          statusBreakdown: []
        },
        topProducts,
        supplierPerformance: {
          rating: supplier.rating,
          deliveryPerformance: supplier.deliveryPerformance,
          totalSupplies: supplier.performance.totalSupplies,
          totalValue: supplier.performance.totalValue
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSupply,
  getSupplyHistory,
  getSupplyDetails,
  updateSupply,
  confirmSupplyDelivery,
  getSupplyAnalytics
};