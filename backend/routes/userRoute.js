const express = require('express');
const {
  registerUser,
  loginUser,
  logOut,
  resetPassword,
  getUserDetail,
  updatePassword,
  updateProfile,
} = require('../controller/userController');
const router = express.Router();
const { forgotPassword } = require('../controller/userController');
const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logOut);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserDetail);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

module.exports = router;
