require('dotenv').config();
const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { authorizationRequiredMessage } = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(authorizationRequiredMessage);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
    );
  } catch (err) {
    throw new UnauthorizedError(authorizationRequiredMessage);
  }

  req.user = payload;

  next();
};
