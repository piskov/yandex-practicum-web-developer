const cards = require('express').Router();
const { createCard, deleteCard, getCards } = require('../../controllers/cards');

cards.delete('/:cardId', deleteCard);
cards.get('/', getCards);
cards.post('/', createCard);

module.exports = cards;
