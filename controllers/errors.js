const {
  NOT_FOUND,
  pageNotFoundMessage,
} = require('../constants');

module.exports.handleNotFound = (req, res) => {
  res.status(NOT_FOUND).send({ message: pageNotFoundMessage });
};
