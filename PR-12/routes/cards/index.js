const cards = require('express').Router();
const allCards = require('./all');

cards.get('/', allCards);

module.exports = cards;
