const users = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  userIdValidation,
  updateUserValidation,
} = require('../middlewares/validation');

users.get('/me', userIdValidation, getUser);
users.patch('/me', updateUserValidation, updateUser);

module.exports = users;
