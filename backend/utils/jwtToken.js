//Creating token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };

  // const tokenData = {
  //   tokenId: token,
  //   tokenExpiry: Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  // };

  // store('token', tokenData);
  // console.log(store.get('token'));

  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
