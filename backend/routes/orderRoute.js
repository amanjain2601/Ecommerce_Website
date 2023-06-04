const express = require('express');
const {
  newOrder,
  getSingleOrder,
  myOrders,
  updateOrder,
  getAllOrders,
  deleteOrder,
} = require('../controller/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').post(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').post(isAuthenticatedUser, myOrders);
router
  .route('/admin/orders')
  .post(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);
router
  .route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
  .delete(deleteOrder);

module.exports = router;
