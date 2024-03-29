const User = require('../models/userModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
// const store = require('store2');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = JSON.parse(req.body.tokenData).tokenId;

  if (!token) {
    return next(new ErrorHander('Please login to access resource', 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
