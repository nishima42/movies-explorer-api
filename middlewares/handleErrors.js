const {
  BAD_REQUEST,
  CONFLICT,
  SERVER_ERROR,
  duplicateErrorCode,
  userAlreadyExistsMessage,
  incorrectDataMessage,
  serverErrorMessage,
} = require('../constants');

const { BadRequestError } = require('../errors/BadRequestError');

// eslint-disable-next-line no-unused-vars
module.exports.handleErrors = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(BAD_REQUEST).send({ message: incorrectDataMessage });
  }
  if (err.name === 'ValidationError' || err instanceof BadRequestError) {
    return res.status(BAD_REQUEST).send({ message: incorrectDataMessage });
  }
  if (err.code === duplicateErrorCode) {
    return res.status(CONFLICT).send({ message: userAlreadyExistsMessage });
  }
  const { statusCode = SERVER_ERROR, message } = err;
  return res.status(statusCode).send({
    message: statusCode === SERVER_ERROR ? serverErrorMessage : message,
  });
};
