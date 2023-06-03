const { logoutMessage } = require('../constants');

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: logoutMessage });
};
