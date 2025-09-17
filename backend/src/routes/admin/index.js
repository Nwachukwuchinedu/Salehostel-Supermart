const express = require('express');
const { adminAuth } = require('../../middleware/auth');

// Import admin route modules
const authRoutes = require('./adminAuth');
const productRoutes = require('./adminProducts');
const supplierRoutes = require('./adminSuppliers');
const purchaseRoutes = require('./adminPurchases');
const orderRoutes = require('./adminOrders');
const inventoryRoutes = require('./adminInventory');
const userRoutes = require('./adminUsers');
const reportRoutes = require('./adminReports');

const router = express.Router();

// Apply admin authentication to all admin routes
router.use(adminAuth);

// Mount route modules
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/purchases', purchaseRoutes);
router.use('/orders', orderRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/users', userRoutes);
router.use('/reports', reportRoutes);

module.exports = router;