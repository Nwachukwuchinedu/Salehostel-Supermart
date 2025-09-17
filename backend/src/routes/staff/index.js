const express = require('express');

// Import staff route modules
const authRoutes = require('./staffAuth');
const orderRoutes = require('./staffOrders');
const inventoryRoutes = require('./staffInventory');

const router = express.Router();

// Mount route modules (auth middleware is applied individually in each route)
router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/inventory', inventoryRoutes);

module.exports = router;