const express = require('express');

// Import supplier route modules
const authRoutes = require('./supplierAuth');
const productRoutes = require('./supplierProducts');
const supplyRoutes = require('./supplierSupplies');
const orderRoutes = require('./supplierOrders');

const router = express.Router();

// Mount route modules (auth middleware is applied individually in each route)
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/supplies', supplyRoutes);
router.use('/orders', orderRoutes);

module.exports = router;