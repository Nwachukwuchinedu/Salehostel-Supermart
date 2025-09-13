const express = require('express');
const router = express.Router();
const { 
  getInventoryOverview,
  adjustStock,
  getStockMovements,
  getLowStockAlerts
} = require('../../controllers/admin/adminInventoryController');
const { protect, admin } = require('../../middleware/adminAuth');

router.route('/')
  .get(protect, admin, getInventoryOverview);

router.route('/adjust')
  .post(protect, admin, adjustStock);

router.route('/movements')
  .get(protect, admin, getStockMovements);

router.route('/alerts')
  .get(protect, admin, getLowStockAlerts);

module.exports = router;