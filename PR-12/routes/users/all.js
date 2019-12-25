const users = require('../../data/users.json');
const responseHelper = require('../../utils/responseFromData');

module.exports = responseHelper(users);
