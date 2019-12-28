const users = require('express').Router();
const { createUser, getUserById, getUsers } = require('../../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUserById);
users.post('/', createUser);

module.exports = users;
