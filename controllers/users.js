const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { ConflictError } = require('../errors/ConflictError');
const { NotFoundError } = require('../errors/NotFoundError');

const userAlreadyExistsMessage = require('../constants');
const userNotFoundMessage = require('../constants');

const CREATED = require('../constants');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError(userAlreadyExistsMessage);
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          email,
          password: hash,
        }))
        .then((user) => res.status(CREATED).send({
          name: user.name,
          email: user.email,
        }))
        .catch(next);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundMessage);
      }
      return res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
    },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundMessage);
      }
      return res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch(next);
};
