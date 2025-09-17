const express = require('express');
const router = express.Router();
const { 
  login, 
  logout, 
  getProfile, 
  updateProfile, 
  changePassword, 
  refreshToken, 
  getDashboardStats 
} = require('../../controllers/admin/adminAuthController');
const { protect, admin } = require('../../middleware/adminAuth');

router.post('/login', login);
router.post('/logout', protect, admin, logout);
router.post('/refresh', refreshToken);
router.route('/profile')
  .get(protect, admin, getProfile)
  .put(protect, admin, updateProfile);
router.put('/change-password', protect, admin, changePassword);
router.get('/dashboard-stats', protect, admin, getDashboardStats);

module.exports = router;