const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const UnauthorizedError = require('../errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Допустимая длина для имени: 2…30 символов'],
    maxlength: [30, 'Допустимая длина для имени: 2…30 символов'],
    required: [true, 'Не задано имя для пользователя'],
  },
  about: {
    type: String,
    minlength: [2, 'Допустимая длина для описания: 2…30 символов'],
    maxlength: [30, 'Допустимая длина для описания: 2…30 символов'],
    required: [true, 'Не задано описание для пользователя'],
  },
  avatar: {
    type: String,
    required: [true, 'Не задана ссылка на аватар'],
    validate: {
      validator: (input) => validator.isURL(input),
      message: () => 'Некорректная ссылка на аватар',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (input) => validator.isEmail(input),
      message: () => 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

function findUserByCredentials(email, password) {
  const badCredentialsError = new UnauthorizedError('Неправильные почта или пароль');

  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw badCredentialsError;
      }

      return bcrypt.compare(password, user.password)
        .then((isPasswordCorrect) => {
          if (!isPasswordCorrect) {
            throw badCredentialsError;
          }

          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
