const express = require('express');
const router = express.Router();
const { protect, admin } = require('../../middleware/adminAuth');

// Placeholder routes - will implement controller functions later
router.get('/sales', protect, admin, (req, res) => {
  res.json({ message: 'Sales reports' });
});

router.get('/inventory', protect, admin, (req, res) => {
  res.json({ message: 'Inventory reports' });
});

router.get('/profit-loss', protect, admin, (req, res) => {
  res.json({ message: 'Profit & loss reports' });
});

router.get('/customers', protect, admin, (req, res) => {
  res.json({ message: 'Customer analytics' });
});

router.get('/products', protect, admin, (req, res) => {
  res.json({ message: 'Product performance' });
});

module.exports = router;