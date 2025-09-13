const express = require('express');
const router = express.Router();

// Placeholder routes - will implement controller functions later
router.get('/', (req, res) => {
  res.json({ message: 'Get products for shop (public)' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get single product (public)' });
});

router.get('/search', (req, res) => {
  res.json({ message: 'Search products (public)' });
});

router.get('/categories', (req, res) => {
  res.json({ message: 'Get categories (public)' });
});

router.get('/featured', (req, res) => {
  res.json({ message: 'Get featured products' });
});

module.exports = router;