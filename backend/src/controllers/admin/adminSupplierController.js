const User = require("../../models/User");
const Supplier = require("../../models/Supplier");
const Supply = require("../../models/Supply");
const PurchaseOrder = require("../../models/PurchaseOrder");
const { AppError } = require("../../middleware/errorHandler");
const bcrypt = require("bcryptjs");

// @desc    Get all suppliers
// @route   GET /api/admin/suppliers
// @access  Private (Admin)
const getSuppliers = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      category,
      isVerified,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build query
    let query = {};

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { "contactPerson.firstName": { $regex: search, $options: "i" } },
        { "contactPerson.lastName": { $regex: search, $options: "i" } },
        { "contactDetails.email": { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.isActive = status === "active";
    }

    if (category) {
      query.suppliedCategories = { $in: [category] };
    }

    if (isVerified !== undefined) {
      query.isVerified = isVerified === "true";
    }

    // Build sort criteria
    const sortCriteria = {};
    sortCriteria[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute query with pagination
    const suppliers = await Supplier.find(query)
      .populate("user", "firstName lastName email isActive lastLogin")
      .sort(sortCriteria)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Supplier.countDocuments(query);

    // Get supplier statistics
    const stats = await Supplier.aggregate([
      {
        $group: {
          _id: null,
          totalSuppliers: { $sum: 1 },
          activeSuppliers: {
            $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
          },
          verifiedSuppliers: {
            $sum: { $cond: [{ $eq: ["$isVerified", true] }, 1, 0] },
          },
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        suppliers,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
        },
        stats: stats[0] || {
          totalSuppliers: 0,
          activeSuppliers: 0,
          verifiedSuppliers: 0,
          averageRating: 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single supplier details
// @route   GET /api/admin/suppliers/:id
// @access  Private (Admin)
const getSupplierDetails = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id)
      .populate("user", "firstName lastName email isActive lastLogin createdAt")
      .populate("verifiedBy", "firstName lastName");

    if (!supplier) {
      return next(new AppError("Supplier not found", 404));
    }

    // Get supplier's recent supplies
    const recentSupplies = await Supply.find({ supplier: supplier._id })
      .populate("supplyItems.product", "name")
      .sort({ supplyDate: -1 })
      .limit(5);

    // Get supplier's purchase orders
    const purchaseOrders = await PurchaseOrder.find({ supplier: supplier._id })
      .sort({ orderDate: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        supplier,
        recentSupplies,
        purchaseOrders,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new supplier
// @route   POST /api/admin/suppliers
// @access  Private (Admin)
const createSupplier = async (req, res, next) => {
  try {
    const {
      // User details
      firstName,
      lastName,
      email,
      password,
      whatsappNumber,
      callNumber,
      // Supplier details
      companyName,
      contactPerson,
      businessInfo,
      contactDetails,
      address,
      suppliedCategories,
      paymentTerms,
      creditLimit,
      bankDetails,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("User with this email already exists", 400));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      whatsappNumber,
      callNumber,
      role: "supplier",
    });

    // Handle document uploads
    const documents = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        documents.push({
          type: file.fieldname,
          fileName: file.originalname,
          fileUrl: file.path,
        });
      });
    }

    // Create supplier profile
    const supplier = await Supplier.create({
      user: user._id,
      companyName,
      contactPerson: contactPerson || {
        firstName,
        lastName,
      },
      businessInfo,
      contactDetails: contactDetails || {
        email,
        phone: callNumber,
        whatsapp: whatsappNumber,
      },
      address,
      suppliedCategories,
      paymentTerms: paymentTerms || "Cash on Delivery",
      creditLimit: creditLimit || 0,
      bankDetails,
      documents,
      isVerified: false, // Admin needs to verify manually
    });

    res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
        supplier,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update supplier
// @route   PUT /api/admin/suppliers/:id
// @access  Private (Admin)
const updateSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return next(new AppError("Supplier not found", 404));
    }

    // Handle document uploads
    if (req.files && req.files.length > 0) {
      const newDocuments = req.files.map((file) => ({
        type: file.fieldname,
        fileName: file.originalname,
        fileUrl: file.path,
      }));

      req.body.documents = [...(supplier.documents || []), ...newDocuments];
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("user", "firstName lastName email");

    res.json({
      success: true,
      message: "Supplier updated successfully",
      data: updatedSupplier,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete supplier
// @route   DELETE /api/admin/suppliers/:id
// @access  Private (Admin)
const deleteSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return next(new AppError("Supplier not found", 404));
    }

    // Check if supplier has active supplies or orders
    const activeSupplies = await Supply.countDocuments({
      supplier: supplier._id,
      status: { $in: ["Pending", "Received"] },
    });

    const activePurchaseOrders = await PurchaseOrder.countDocuments({
      supplier: supplier._id,
      status: { $in: ["Sent", "Confirmed"] },
    });

    if (activeSupplies > 0 || activePurchaseOrders > 0) {
      return next(
        new AppError(
          "Cannot delete supplier with active supplies or orders",
          400
        )
      );
    }

    // Deactivate instead of deleting to maintain data integrity
    supplier.isActive = false;
    await supplier.save();

    // Also deactivate the user account
    await User.findByIdAndUpdate(supplier.user, { isActive: false });

    res.json({
      success: true,
      message: "Supplier deactivated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify supplier
// @route   PUT /api/admin/suppliers/:id/verify
// @access  Private (Admin)
const verifySupplier = async (req, res, next) => {
  try {
    const { verificationNotes } = req.body;

    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return next(new AppError("Supplier not found", 404));
    }

    await supplier.verify(req.user._id);

    if (verificationNotes) {
      supplier.notes = verificationNotes;
      await supplier.save();
    }

    res.json({
      success: true,
      message: "Supplier verified successfully",
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get supplier performance metrics
// @route   GET /api/admin/suppliers/:id/performance
// @access  Private (Admin)
const getSupplierPerformance = async (req, res, next) => {
  try {
    const { period = "30d" } = req.query;

    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return next(new AppError("Supplier not found", 404));
    }

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();

    switch (period) {
      case "7d":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(endDate.getDate() - 90);
        break;
      case "1y":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 30);
    }

    // Get performance metrics
    const performance = await Supply.aggregate([
      {
        $match: {
          supplier: supplier._id,
          supplyDate: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalSupplies: { $sum: 1 },
          totalValue: { $sum: "$totalAmount" },
          averageSupplyValue: { $avg: "$totalAmount" },
          onTimeDeliveries: {
            $sum: { $cond: [{ $eq: ["$status", "Verified"] }, 1, 0] },
          },
        },
      },
    ]);

    // Get top supplied products
    const topProducts = await Supply.aggregate([
      {
        $match: {
          supplier: supplier._id,
          supplyDate: { $gte: startDate, $lte: endDate },
        },
      },
      { $unwind: "$supplyItems" },
      {
        $group: {
          _id: "$supplyItems.product",
          productName: { $first: "$supplyItems.productName" },
          totalQuantity: { $sum: "$supplyItems.quantitySupplied" },
          totalValue: { $sum: "$supplyItems.totalCost" },
        },
      },
      { $sort: { totalValue: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      success: true,
      data: {
        supplier: {
          id: supplier._id,
          companyName: supplier.companyName,
          rating: supplier.rating,
          deliveryPerformance: supplier.deliveryPerformance,
        },
        performance: performance[0] || {
          totalSupplies: 0,
          totalValue: 0,
          averageSupplyValue: 0,
          onTimeDeliveries: 0,
        },
        topProducts,
        period,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get supplier analytics overview
// @route   GET /api/admin/suppliers/analytics
// @access  Private (Admin)
const getSupplierAnalytics = async (req, res, next) => {
  try {
    const { period = "30d" } = req.query;

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();

    switch (period) {
      case "7d":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(endDate.getDate() - 90);
        break;
      case "1y":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 30);
    }

    // Get overall supplier analytics
    const analytics = await Supplier.aggregate([
      {
        $lookup: {
          from: "supplies",
          localField: "_id",
          foreignField: "supplier",
          as: "supplies",
          pipeline: [
            {
              $match: {
                supplyDate: { $gte: startDate, $lte: endDate },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          totalSupplies: { $size: "$supplies" },
          totalSupplyValue: { $sum: "$supplies.totalAmount" },
        },
      },
      {
        $group: {
          _id: null,
          totalSuppliers: { $sum: 1 },
          activeSuppliers: {
            $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
          },
          verifiedSuppliers: {
            $sum: { $cond: [{ $eq: ["$isVerified", true] }, 1, 0] },
          },
          totalSupplies: { $sum: "$totalSupplies" },
          totalSupplyValue: { $sum: "$totalSupplyValue" },
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    // Get top performing suppliers
    const topSuppliers = await Supplier.aggregate([
      {
        $lookup: {
          from: "supplies",
          localField: "_id",
          foreignField: "supplier",
          as: "supplies",
          pipeline: [
            {
              $match: {
                supplyDate: { $gte: startDate, $lte: endDate },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          totalSupplyValue: { $sum: "$supplies.totalAmount" },
          totalSupplies: { $size: "$supplies" },
        },
      },
      {
        $match: {
          totalSupplies: { $gt: 0 },
        },
      },
      { $sort: { totalSupplyValue: -1 } },
      { $limit: 10 },
      {
        $project: {
          companyName: 1,
          rating: 1,
          deliveryPerformance: 1,
          totalSupplyValue: 1,
          totalSupplies: 1,
          isVerified: 1,
        },
      },
    ]);

    // Get category distribution
    const categoryDistribution = await Supplier.aggregate([
      { $unwind: "$suppliedCategories" },
      {
        $group: {
          _id: "$suppliedCategories",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        period,
        overview: analytics[0] || {
          totalSuppliers: 0,
          activeSuppliers: 0,
          verifiedSuppliers: 0,
          totalSupplies: 0,
          totalSupplyValue: 0,
          averageRating: 0,
        },
        topSuppliers,
        categoryDistribution,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSuppliers,
  getSupplierDetails,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  verifySupplier,
  getSupplierPerformance,
  getSupplierAnalytics,
};
