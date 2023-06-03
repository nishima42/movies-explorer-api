const {
  BAD_REQUEST,
  CONFLICT,
  SERVER_ERROR,
} = require('../constants');

const {
  duplicateErrorCode,
  userAlreadyExistsMessage,
  incorrectDataMessage,
  serverErrorMessage,
} = require('../constants');

const { BadRequestError } = require('../errors/BadRequestError');

module.exports.handleErrors = (err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: incorrectDataMessage });
    return next();
  }
  if (err.name === 'ValidationError' || err instanceof BadRequestError) {
    res.status(BAD_REQUEST).send({ message: incorrectDataMessage });
    return next();
  }
  if (err.code === duplicateErrorCode) {
    res.status(CONFLICT).send({ message: userAlreadyExistsMessage });
    return next();
  }
  const { statusCode = SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR ? serverErrorMessage : message,
  });
  return next();
};
