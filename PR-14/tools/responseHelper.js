module.exports.sendBadRequestForEmptyBody = (request, response) => {
  if (Object.keys(request.body).length !== 0) {
    return false;
  }

  response.status(400).send({ message: 'Пустое тело запроса' });
  return true;
};
