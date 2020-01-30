const BadRequestError = require('../errors/badRequestError');

module.exports.sendBadRequestForEmptyBody = (request, response, next) => {
  if (Object.keys(request.body).length !== 0) {
    return false;
  }

  next(new BadRequestError('Пустое тело запроса'));
  return true;
};
