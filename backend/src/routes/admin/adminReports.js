const express = require('express');
const router = express.Router();
const { 
  getSalesReport,
  getInventoryReport,
  getProfitLossReport,
  getCustomerReport,
  getProductPerformance
} = require('../../controllers/admin/adminReportController');
const { protect, admin } = require('../../middleware/adminAuth');

router.route('/sales')
  .get(protect, admin, getSalesReport);

router.route('/inventory')
  .get(protect, admin, getInventoryReport);

router.route('/profit-loss')
  .get(protect, admin, getProfitLossReport);

router.route('/customers')
  .get(protect, admin, getCustomerReport);

router.route('/products')
  .get(protect, admin, getProductPerformance);

module.exports = router;