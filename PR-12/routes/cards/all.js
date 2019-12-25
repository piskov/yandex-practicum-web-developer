const cards = require('../../data/cards.json');
const responseHelper = require('../../utils/responseFromData');

module.exports = responseHelper(cards);
