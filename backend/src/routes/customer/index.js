const express = require('express');
const { customerAuth, optionalAuth } = require('../../middleware/auth');

// Import customer route modules
const authRoutes = require('./customerAuth');
const productRoutes = require('./customerProducts');
const cartRoutes = require('./customerCart');
const orderRoutes = require('./customerOrders');
const profileRoutes = require('./customerProfile');

const router = express.Router();

// Public routes (no authentication required)
router.use('/auth', authRoutes);
router.use('/products', optionalAuth, productRoutes); // Optional auth for personalized experience

// Protected routes (customer authentication required)
router.use('/cart', customerAuth, cartRoutes);
router.use('/orders', customerAuth, orderRoutes);
router.use('/profile', customerAuth, profileRoutes);

module.exports = router;