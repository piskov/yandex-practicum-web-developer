module.exports.getJwtSecret = () => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  return NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
};
