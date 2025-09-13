const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../../controllers/admin/adminProductController');
const { protect, admin } = require('../../middleware/adminAuth');

router.route('/')
  .get(protect, admin, getProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .get(protect, admin, getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// Categories routes
router.route('/categories')
  .get(protect, admin, getCategories)
  .post(protect, admin, createCategory);

router.route('/categories/:id')
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

module.exports = router;