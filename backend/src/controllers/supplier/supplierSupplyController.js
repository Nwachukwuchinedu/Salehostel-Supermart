const Supply = require('../../models/Supply');
const Product = require('../../models/Product');
const StockMovement = require('../../models/StockMovement');

// @desc    Get all supplies for a supplier
// @route   GET /api/supplier/supplies
// @access  Private (Supplier)
const getSupplies = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.page) || 1;

    const filter = { supplier: req.user._id };
    
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const count = await Supply.countDocuments(filter);
    const supplies = await Supply.find(filter)
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

// @desc    Get single supply
// @route   GET /api/supplier/supplies/:id
// @access  Private (Supplier)
const getSupply = async (req, res) => {
  try {
    const supply = await Supply.findOne({
      _id: req.params.id,
      supplier: req.user._id
    }).populate('receivedBy', 'firstName lastName');

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

// @desc    Create new supply
// @route   POST /api/supplier/supplies
// @access  Private (Supplier)
const createSupply = async (req, res) => {
  try {
    const supply = new Supply({
      supplier: req.user._id,
      productName: req.body.productName,
      quantity: req.body.quantity,
      numberOfQuantity: req.body.numberOfQuantity,
      pricePerUnit: req.body.pricePerUnit,
      notes: req.body.notes
    });

    const createdSupply = await supply.save();
    res.status(201).json({
      success: true,
      supply: createdSupply
    });
  } catch (error) {
    console.error('Error creating supply:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update supply
// @route   PUT /api/supplier/supplies/:id
// @access  Private (Supplier)
const updateSupply = async (req, res) => {
  try {
    const supply = await Supply.findOne({
      _id: req.params.id,
      supplier: req.user._id
    });

    if (!supply) {
      return res.status(404).json({ message: 'Supply not found' });
    }

    // Only allow updates if status is pending
    if (supply.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot update supply that has been received or cancelled' });
    }

    supply.productName = req.body.productName || supply.productName;
    supply.quantity = req.body.quantity || supply.quantity;
    supply.numberOfQuantity = req.body.numberOfQuantity || supply.numberOfQuantity;
    supply.pricePerUnit = req.body.pricePerUnit || supply.pricePerUnit;
    supply.notes = req.body.notes || supply.notes;

    const updatedSupply = await supply.save();
    res.json({
      success: true,
      supply: updatedSupply
    });
  } catch (error) {
    console.error('Error updating supply:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Cancel supply
// @route   PUT /api/supplier/supplies/:id/cancel
// @access  Private (Supplier)
const cancelSupply = async (req, res) => {
  try {
    const supply = await Supply.findOne({
      _id: req.params.id,
      supplier: req.user._id
    });

    if (!supply) {
      return res.status(404).json({ message: 'Supply not found' });
    }

    if (supply.status === 'received') {
      return res.status(400).json({ message: 'Cannot cancel supply that has been received' });
    }

    supply.status = 'cancelled';
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

// @desc    Get supply statistics
// @route   GET /api/supplier/supplies/stats
// @access  Private (Supplier)
const getSupplyStats = async (req, res) => {
  try {
    const supplierId = req.user._id;
    
    const totalSupplies = await Supply.countDocuments({ supplier: supplierId });
    const pendingSupplies = await Supply.countDocuments({ 
      supplier: supplierId, 
      status: 'pending' 
    });
    const receivedSupplies = await Supply.countDocuments({ 
      supplier: supplierId, 
      status: 'received' 
    });
    const cancelledSupplies = await Supply.countDocuments({ 
      supplier: supplierId, 
      status: 'cancelled' 
    });

    // Calculate total value
    const supplies = await Supply.find({ 
      supplier: supplierId, 
      status: 'received' 
    });
    const totalValue = supplies.reduce((sum, supply) => sum + supply.totalPrice, 0);

    // This month's supplies
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const thisMonthSupplies = await Supply.find({
      supplier: supplierId,
      status: 'received',
      receivedAt: { $gte: startOfMonth }
    });
    const thisMonthValue = thisMonthSupplies.reduce((sum, supply) => sum + supply.totalPrice, 0);

    res.json({
      success: true,
      stats: {
        totalSupplies,
        pendingSupplies,
        receivedSupplies,
        cancelledSupplies,
        totalValue,
        thisMonthValue,
        thisMonthCount: thisMonthSupplies.length
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
  createSupply,
  updateSupply,
  cancelSupply,
  getSupplyStats
};
