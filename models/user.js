const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { BadRequestError } = require('../errors/BadRequestError');
const wrongPassOrEmailMessage = require('../constants');
const incorrectEmailMessage = require('../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unqiue: true,
    validate: {
      validator: (v) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(v);
      },
      message: incorrectEmailMessage,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new BadRequestError(wrongPassOrEmailMessage);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new BadRequestError(wrongPassOrEmailMessage);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
