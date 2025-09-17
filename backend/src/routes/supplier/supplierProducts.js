const express = require('express');
const router = express.Router();
const {
  getSupplierProducts,
  getProductDetails,
  addProduct,
  updateProduct,
  updateProductPrices,
  deleteProduct,
  getProductAnalytics
} = require('../../controllers/supplier/supplierProductController');
const { auth } = require('../../middleware/auth');
const { upload } = require('../../middleware/upload');

// @route   GET /api/supplier/products
// @desc    Get products supplied by supplier
// @access  Private
router.get('/', auth, getSupplierProducts);

// @route   GET /api/supplier/products/:id
// @desc    Get single product details
// @access  Private
router.get('/:id', auth, getProductDetails);

// @route   POST /api/supplier/products
// @desc    Add new product
// @access  Private
router.post('/', auth, upload.array('images', 5), addProduct);

// @route   PUT /api/supplier/products/:id
// @desc    Update product
// @access  Private
router.put('/:id', auth, upload.array('images', 5), updateProduct);

// @route   PUT /api/supplier/products/:id/prices
// @desc    Update product prices
// @access  Private
router.put('/:id/prices', auth, updateProductPrices);

// @route   DELETE /api/supplier/products/:id
// @desc    Delete product
// @access  Private
router.delete('/:id', auth, deleteProduct);

// @route   GET /api/supplier/products/:id/analytics
// @desc    Get product performance analytics
// @access  Private
router.get('/:id/analytics', auth, getProductAnalytics);

module.exports = router;