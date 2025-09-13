const express = require('express');
const router = express.Router();
const { 
  getProfile,
  updateProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress
} = require('../../controllers/customer/customerProfileController');
const { protect, customer } = require('../../middleware/customerAuth');

router.route('/')
  .get(protect, customer, getProfile)
  .put(protect, customer, updateProfile);

router.route('/addresses')
  .get(protect, customer, getAddresses)
  .post(protect, customer, addAddress)
  .put(protect, customer, updateAddress);

router.route('/addresses/:id')
  .delete(protect, customer, deleteAddress);

module.exports = router;