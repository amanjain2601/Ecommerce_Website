const express = require('express');
const {
  registerUser,
  loginUser,
  logOut,
  resetPassword,
} = require('../controller/userController');
const router = express.Router();
const { forgotPassword } = require('../controller/userController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logOut);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

module.exports = router;
