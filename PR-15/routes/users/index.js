const users = require('express').Router();
const { getUserById, getUsers } = require('../../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUserById);

module.exports = users;
