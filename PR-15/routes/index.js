const routes = require('express').Router();

const cards = require('./cards');
const users = require('./users');

routes.use('/cards', cards);
routes.use('/users', users);

module.exports = routes;
