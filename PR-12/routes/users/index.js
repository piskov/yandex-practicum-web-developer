const users = require('express').Router();

const allUsers = require('./all');
const singleUser = require('./single');

users.get('/', allUsers);
users.get('/:id', singleUser);

module.exports = users;
