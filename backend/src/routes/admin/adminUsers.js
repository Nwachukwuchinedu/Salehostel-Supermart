const express = require('express');
const router = express.Router();
const { protect, admin } = require('../../middleware/adminAuth');

// Placeholder routes - will implement controller functions later
router.get('/', protect, admin, (req, res) => {
  res.json({ message: 'Get all users' });
});

router.post('/', protect, admin, (req, res) => {
  res.json({ message: 'Create new user' });
});

router.put('/:id', protect, admin, (req, res) => {
  res.json({ message: 'Update user' });
});

router.delete('/:id', protect, admin, (req, res) => {
  res.json({ message: 'Delete user' });
});

router.put('/:id/status', protect, admin, (req, res) => {
  res.json({ message: 'Activate/deactivate user' });
});

module.exports = router;