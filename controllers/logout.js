module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
};
