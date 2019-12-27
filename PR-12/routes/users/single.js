const readJsonFromFile = require('../../utils/readJsonFromFile');

module.exports = async (request, response) => {
  const [data, error] = await readJsonFromFile('users.json');
  if (error !== null) {
    return response.status(500)
      .json({ message: 'Не удалось считать файл с данными' });
  }

  const user = data.find((u) => u._id === request.params.id);

  if (user === undefined) {
    return response.status(404)
      .json({ message: 'Нет пользователя с таким id' });
  }

  return response.json(user);
};
