const express = require('express');
const {
  registerUser,
  loginUser,
  logOut,
  resetPassword,
  getUserDetail,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require('../controller/userController');
const router = express.Router();
const { forgotPassword } = require('../controller/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logOut);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').post(isAuthenticatedUser, getUserDetail);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router
  .route('/admin/users')
  .post(isAuthenticatedUser, authorizeRoles('admin'), getAllUser);

router
  .route('/admin/user/:id')
  .post(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)
  .delete(deleteUser);

module.exports = router;
