const express = require('express');
const router = express.Router();
const { 
  getProducts,
  getProduct,
  searchProducts,
  getCategories,
  getFeaturedProducts
} = require('../../controllers/customer/customerProductController');

router.route('/')
  .get(getProducts);

router.route('/search')
  .get(searchProducts);

router.route('/categories')
  .get(getCategories);

router.route('/featured')
  .get(getFeaturedProducts);

router.route('/:id')
  .get(getProduct);

module.exports = router;