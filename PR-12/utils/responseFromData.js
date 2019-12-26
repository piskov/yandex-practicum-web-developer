const readJsonFromFile = require('./readJsonFromFile');

module.exports = (fileName) => async (request, response) => {
  const [data, error] = await readJsonFromFile(fileName);

  if (error !== null) {
    return response.status(500)
      .json({ message: 'Внутренняя ошибка сервера: не удалось считать файл с данными' });
  }

  return response.json(data);
};
