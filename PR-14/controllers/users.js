const { ObjectId } = require('mongoose').Types;
const User = require('../models/user');

module.exports.createUser = (request, response) => {
  if (Object.keys(request.body).length === 0) {
    response.status(400).send({ message: 'Пустое тело запроса' });
    return;
  }

  const { name, about, avatar } = request.body;
  const userModel = new User({ name, about, avatar });

  const validationErrors = userModel.validateSync();
  if (validationErrors) {
    const errorMessage = Object.values(validationErrors.errors)
      .map((error) => error.message);

    response.status(400).send({ errors: errorMessage });
    return;
  }

  User.create(userModel)
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
