const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('../tools/getJwtSecret');

const handleAuthError = (response) => {
  response.status(401).send({ message: 'Необходима авторизация' });
};

module.exports = (request, response, next) => {
  const { token } = request.cookies;
  if (!token) {
    handleAuthError(response);
    return;
  }

  try {
    request.user = jwt.verify(token, getJwtSecret());
  } catch (err) {
    handleAuthError(response);
    return;
  }

  next();
};
