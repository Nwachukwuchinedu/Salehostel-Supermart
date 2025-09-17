const express = require("express");
const router = express.Router();
const {
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
  receivePurchase,
} = require("../../controllers/admin/adminPurchaseController").default;
const { protect, admin } = require("../../middleware/adminAuth");

router
  .route("/")
  .get(protect, admin, getPurchases)
  .post(protect, admin, createPurchase);

router
  .route("/:id")
  .put(protect, admin, updatePurchase)
  .delete(protect, admin, deletePurchase);

router.route("/:id/receive").put(protect, admin, receivePurchase);

module.exports = router;
