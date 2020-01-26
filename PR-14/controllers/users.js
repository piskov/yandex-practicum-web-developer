const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;

const { getJwtSecret } = require('../tools/getJwtSecret');
const { sendBadRequestForEmptyBody } = require('../tools/responseHelper');
const User = require('../models/user');


module.exports.createUser = (request, response) => {
  if (sendBadRequestForEmptyBody(request, response)) {
    return;
  }

  // eslint-disable-next-line object-curly-newline
  const { name, about, avatar, email, password } = request.body;

  // eslint-disable-next-line object-curly-newline
  const userModel = new User({ name, about, avatar, email, password });

  const validationErrors = userModel.validateSync();
  if (validationErrors) {
    const errorMessage = Object.values(validationErrors.errors)
      .map((error) => error.message);

    response.status(400).send({ errors: errorMessage });
    return;
  }

  bcrypt.hash(userModel.password, 10)
    .then((hash) => {
      userModel.password = hash;
      User.create(userModel);
    })
    .then((user) => response.send({ data: user }))
    .catch(() => response.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (request, response) => {
  const userId = request.params.id;

  if (userId === undefined) {
    response.status(400).send({ message: 'Не указан id пользователя' });
    return;
  }

  if (!ObjectId.isValid(userId)) {
    response.status(400).send({ message: 'Неверный id пользователя' });
    return;
  }

  User.findById(userId)
    .then((user) => {
      if (user === null) {
        return response.status(404)
          .json({ message: 'Нет пользователя с таким id' });
      }

      return response.json({ data: user });
    })
    .catch(() => response.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUsers = (request, response) => {
  User.find({})
    .then((users) => response.send({ data: users }))
    .catch(() => response.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.login = (request, response) => {
  if (sendBadRequestForEmptyBody(request, response)) {
    return;
  }

  const { email, password } = request.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        getJwtSecret(),
        { expiresIn: '7d' },
      );

      response
        .cookie('token', token, {
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch((error) => {
      response.status(401).send({ message: error.message });
    });
};
