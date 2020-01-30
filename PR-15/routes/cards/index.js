const cards = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createCard, deleteCard, getCards } = require('../../controllers/cards');

cards.delete('/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteCard);

cards.get('/', getCards);

cards.post('/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().min(3).max(2048),
    }),
  }),
  createCard);

module.exports = cards;
