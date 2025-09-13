const express = require('express');
const router = express.Router();
const { 
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  activateDeactivateUser
} = require('../../controllers/admin/adminUserController');
const { protect, admin } = require('../../middleware/adminAuth');

router.route('/')
  .get(protect, admin, getUsers)
  .post(protect, admin, createUser);

router.route('/:id')
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

router.route('/:id/status')
  .put(protect, admin, activateDeactivateUser);

module.exports = router;