const users = require('../../data/users.json');

module.exports = (request, response) => {
  const user = users.find((u) => u._id === request.params.id);

  if (user === undefined) {
    response.status(404)
      .send({ message: 'Нет пользователя с таким id' });

    return;
  }

  response.send(user);
};
