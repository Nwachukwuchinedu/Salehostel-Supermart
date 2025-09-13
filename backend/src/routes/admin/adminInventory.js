const express = require('express');
const router = express.Router();
const { protect, admin } = require('../../middleware/adminAuth');

// Placeholder routes - will implement controller functions later
router.get('/', protect, admin, (req, res) => {
  res.json({ message: 'Get full inventory overview' });
});

router.put('/:id', protect, admin, (req, res) => {
  res.json({ message: 'Manual stock adjustment' });
});

router.get('/movements', protect, admin, (req, res) => {
  res.json({ message: 'Get stock movement history' });
});

router.get('/alerts', protect, admin, (req, res) => {
  res.json({ message: 'Get low stock alerts' });
});

router.post('/adjust', protect, admin, (req, res) => {
  res.json({ message: 'Bulk stock adjustments' });
});

module.exports = router;