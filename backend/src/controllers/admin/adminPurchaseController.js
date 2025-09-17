import Purchase, {
  countDocuments,
  find,
  findById,
} from "../../models/Purchase";
import Product from "../../models/Product";
import { recordPurchase } from "../../services/inventoryService";

// @desc    Get all purchases
// @route   GET /api/admin/purchases
// @access  Private
const getPurchases = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.page) || 1;

    const filter = {};

    // Apply filters
    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.supplierId) {
      filter.supplier = req.query.supplierId;
    }

    // Search by purchase number
    if (req.query.search) {
      filter.purchaseNumber = { $regex: req.query.search, $options: "i" };
    }

    const count = await countDocuments(filter);
    const purchases = await find(filter)
      .populate("supplier", "name email")
      .populate("items.product", "name sku")
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      purchases,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create new purchase
// @route   POST /api/admin/purchases
// @access  Private
const createPurchase = async (req, res) => {
  try {
    const { supplier, items, notes, expectedDeliveryDate } = req.body;

    // Calculate totals
    let subtotal = 0;
    let totalQuantity = 0;

    for (const item of items) {
      subtotal += item.costPrice * item.quantity;
      totalQuantity += item.quantity;
    }

    const purchase = new Purchase({
      supplier,
      items,
      subtotal,
      totalQuantity,
      notes,
      expectedDeliveryDate,
      createdBy: req.user._id,
    });

    const createdPurchase = await purchase.save();

    // Populate references
    await createdPurchase.populate("supplier", "name email");
    await createdPurchase.populate("items.product", "name sku");

    res.status(201).json({
      success: true,
      purchase: createdPurchase,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update purchase
// @route   PUT /api/admin/purchases/:id
// @access  Private
const updatePurchase = async (req, res) => {
  try {
    const purchase = await findById(req.params.id);

    if (purchase) {
      // Only allow updates if purchase is not received
      if (purchase.status === "received") {
        return res
          .status(400)
          .json({ message: "Cannot update received purchase" });
      }

      const { supplier, items, notes, expectedDeliveryDate } = req.body;

      // Calculate totals
      let subtotal = 0;
      let totalQuantity = 0;

      for (const item of items) {
        subtotal += item.costPrice * item.quantity;
        totalQuantity += item.quantity;
      }

      purchase.supplier = supplier || purchase.supplier;
      purchase.items = items || purchase.items;
      purchase.subtotal = subtotal;
      purchase.totalQuantity = totalQuantity;
      purchase.notes = notes || purchase.notes;
      purchase.expectedDeliveryDate =
        expectedDeliveryDate || purchase.expectedDeliveryDate;

      const updatedPurchase = await purchase.save();

      // Populate references
      await updatedPurchase.populate("supplier", "name email");
      await updatedPurchase.populate("items.product", "name sku");

      res.json({
        success: true,
        purchase: updatedPurchase,
      });
    } else {
      res.status(404).json({ message: "Purchase not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete purchase
// @route   DELETE /api/admin/purchases/:id
// @access  Private
const deletePurchase = async (req, res) => {
  try {
    const purchase = await findById(req.params.id);

    if (purchase) {
      // Only allow deletion if purchase is not received
      if (purchase.status === "received") {
        return res
          .status(400)
          .json({ message: "Cannot delete received purchase" });
      }

      await purchase.remove();
      res.json({ message: "Purchase removed" });
    } else {
      res.status(404).json({ message: "Purchase not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Receive purchase (update inventory)
// @route   PUT /api/admin/purchases/:id/receive
// @access  Private
const receivePurchase = async (req, res) => {
  try {
    const purchase = await findById(req.params.id);

    if (purchase) {
      // Only allow receiving if purchase is pending
      if (purchase.status !== "pending") {
        return res
          .status(400)
          .json({ message: "Purchase must be pending to receive" });
      }

      // Update purchase status
      purchase.status = "received";
      purchase.receivedAt = Date.now();
      purchase.receivedBy = req.user._id;

      const updatedPurchase = await purchase.save();

      // Update inventory for each item
      for (const item of purchase.items) {
        await recordPurchase(
          item.product,
          item.quantity,
          purchase._id,
          req.user._id
        );
      }

      // Populate references
      await updatedPurchase.populate("supplier", "name email");
      await updatedPurchase.populate("items.product", "name sku");

      res.json({
        success: true,
        purchase: updatedPurchase,
        message: "Purchase received and inventory updated",
      });
    } else {
      res.status(404).json({ message: "Purchase not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
  receivePurchase,
};
