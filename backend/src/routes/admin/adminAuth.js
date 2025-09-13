const express = require('express');
const router = express.Router();
const { adminLogin, adminLogout, getAdminProfile, updateAdminProfile } = require('../../controllers/admin/adminAuthController');
const { protect, admin } = require('../../middleware/adminAuth');

router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.route('/profile')
  .get(protect, admin, getAdminProfile)
  .put(protect, admin, updateAdminProfile);

module.exports = router;