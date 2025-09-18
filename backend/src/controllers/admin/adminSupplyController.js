const Supply = require('../../models/Supply');
const Product = require('../../models/Product');
const StockMovement = require('../../models/StockMovement');

// @desc    Get all supplies (Admin view)
// @route   GET /api/admin/supplies
// @access  Private (Admin)
const getSupplies = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.page) || 1;

    const filter = {};
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.supplier) {
      filter.supplier = req.query.supplier;
    }

    const count = await Supply.countDocuments(filter);
    const supplies = await Supply.find(filter)
      .populate('supplier', 'firstName lastName email')
      .populate('receivedBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      supplies,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    console.error('Error getting supplies:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single supply (Admin view)
// @route   GET /api/admin/supplies/:id
// @access  Private (Admin)
const getSupply = async (req, res) => {
  try {
    const supply = await Supply.findById(req.params.id)
      .populate('supplier', 'firstName lastName email whatsappNumber callNumber')
      .populate('receivedBy', 'firstName lastName');

    if (supply) {
      res.json({
        success: true,
        supply
      });
    } else {
      res.status(404).json({ message: 'Supply not found' });
    }
  } catch (error) {
    console.error('Error getting supply:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Receive supply (Admin action)
// @route   PUT /api/admin/supplies/:id/receive
// @access  Private (Admin)
const receiveSupply = async (req, res) => {
  try {
    const supply = await Supply.findById(req.params.id);

    if (!supply) {
      return res.status(404).json({ message: 'Supply not found' });
    }

    if (supply.status !== 'pending') {
      return res.status(400).json({ message: 'Supply has already been processed' });
    }

    // Find matching product
    const product = await Product.findOne({
      name: { $regex: new RegExp(supply.productName, 'i') }
    });

    if (!product) {
      return res.status(404).json({ 
        message: 'Product not found. Please create the product first or check the product name.' 
      });
    }

    // Find matching unit type
    const unitIndex = product.units.findIndex(unit => unit.unitType === supply.quantity);
    if (unitIndex === -1) {
      return res.status(404).json({ 
        message: `Unit type "${supply.quantity}" not found for product "${product.name}". Available units: ${product.units.map(u => u.unitType).join(', ')}` 
      });
    }

    // Update product stock
    const previousStock = product.units[unitIndex].stockQuantity;
    product.units[unitIndex].stockQuantity += supply.numberOfQuantity;
    
    // Update cost price if provided
    if (supply.pricePerUnit > 0) {
      product.units[unitIndex].costPrice = supply.pricePerUnit;
    }
    
    await product.save();

    // Update supply status
    supply.status = 'received';
    supply.receivedBy = req.user._id;
    supply.receivedAt = new Date();
    await supply.save();

    // Create stock movement record
    const stockMovement = new StockMovement({
      product: product._id,
      type: 'in',
      quantity: supply.numberOfQuantity,
      previousStock,
      newStock: product.units[unitIndex].stockQuantity,
      referenceType: 'supply',
      referenceId: supply._id,
      notes: `Supply received from ${supply.supplier} - ${supply.productName} (${supply.quantity})`,
      createdBy: req.user._id
    });
    
    await stockMovement.save();

    res.json({
      success: true,
      message: 'Supply received successfully',
      supply,
      product: {
        _id: product._id,
        name: product.name,
        unitType: supply.quantity,
        previousStock,
        newStock: product.units[unitIndex].stockQuantity
      },
      stockMovement
    });
  } catch (error) {
    console.error('Error receiving supply:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Cancel supply (Admin action)
// @route   PUT /api/admin/supplies/:id/cancel
// @access  Private (Admin)
const cancelSupply = async (req, res) => {
  try {
    const supply = await Supply.findById(req.params.id);

    if (!supply) {
      return res.status(404).json({ message: 'Supply not found' });
    }

    if (supply.status === 'received') {
      return res.status(400).json({ message: 'Cannot cancel supply that has been received' });
    }

    supply.status = 'cancelled';
    supply.receivedBy = req.user._id;
    await supply.save();

    res.json({
      success: true,
      message: 'Supply cancelled successfully',
      supply
    });
  } catch (error) {
    console.error('Error cancelling supply:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get supply statistics (Admin view)
// @route   GET /api/admin/supplies/stats
// @access  Private (Admin)
const getSupplyStats = async (req, res) => {
  try {
    const totalSupplies = await Supply.countDocuments();
    const pendingSupplies = await Supply.countDocuments({ status: 'pending' });
    const receivedSupplies = await Supply.countDocuments({ status: 'received' });
    const cancelledSupplies = await Supply.countDocuments({ status: 'cancelled' });

    // Calculate total value
    const supplies = await Supply.find({ status: 'received' });
    const totalValue = supplies.reduce((sum, supply) => sum + supply.totalPrice, 0);

    // This month's supplies
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const thisMonthSupplies = await Supply.find({
      status: 'received',
      receivedAt: { $gte: startOfMonth }
    });
    const thisMonthValue = thisMonthSupplies.reduce((sum, supply) => sum + supply.totalPrice, 0);

    // Top suppliers
    const supplierStats = await Supply.aggregate([
      { $match: { status: 'received' } },
      {
        $group: {
          _id: '$supplier',
          totalSupplies: { $sum: 1 },
          totalValue: { $sum: '$totalPrice' }
        }
      },
      { $sort: { totalValue: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'supplier'
        }
      },
      { $unwind: '$supplier' },
      {
        $project: {
          supplierName: { $concat: ['$supplier.firstName', ' ', '$supplier.lastName'] },
          totalSupplies: 1,
          totalValue: 1
        }
      }
    ]);

    res.json({
      success: true,
      stats: {
        totalSupplies,
        pendingSupplies,
        receivedSupplies,
        cancelledSupplies,
        totalValue,
        thisMonthValue,
        thisMonthCount: thisMonthSupplies.length,
        topSuppliers: supplierStats
      }
    });
  } catch (error) {
    console.error('Error getting supply stats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getSupplies,
  getSupply,
  receiveSupply,
  cancelSupply,
  getSupplyStats
};
