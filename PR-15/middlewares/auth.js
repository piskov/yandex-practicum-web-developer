const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const { getJwtSecret } = require('../tools/getJwtSecret');

module.exports = (request, response, next) => {
  const unauthorizedError = new UnauthorizedError('Неправильные почта или пароль');

  const { token } = request.cookies;
  if (!token) {
    next(unauthorizedError);
    return;
  }

  try {
    request.user = jwt.verify(token, getJwtSecret());
  } catch (err) {
    next(unauthorizedError);
    return;
  }

  next();
};
