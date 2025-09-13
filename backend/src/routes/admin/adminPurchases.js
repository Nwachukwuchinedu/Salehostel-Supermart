const express = require('express');
const router = express.Router();
const { protect, admin } = require('../../middleware/adminAuth');

// Placeholder routes - will implement controller functions later
router.get('/', protect, admin, (req, res) => {
  res.json({ message: 'Get all purchases' });
});

router.post('/', protect, admin, (req, res) => {
  res.json({ message: 'Create new purchase' });
});

router.put('/:id', protect, admin, (req, res) => {
  res.json({ message: 'Update purchase' });
});

router.delete('/:id', protect, admin, (req, res) => {
  res.json({ message: 'Delete purchase' });
});

router.post('/bulk', protect, admin, (req, res) => {
  res.json({ message: 'Bulk import purchases' });
});

module.exports = router;