const { ObjectId } = require('mongoose').Types;

const Card = require('../models/card');

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const UnauthorizedError = require('../errors/unauthorizedError');


module.exports.createCard = (request, response, next) => {
  const { name, link } = request.body;
  const owner = request.user._id;

  const cardModel = new Card({ name, link, owner });

  const validationErrors = cardModel.validateSync();
  if (validationErrors) {
    const errorMessage = Object.values(validationErrors.errors)
      .map((error) => error.message);

    next(new BadRequestError(errorMessage));
    return;
  }

  Card.create(cardModel)
    .then((card) => response.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (request, response, next) => {
  const { cardId } = request.params;

  if (!ObjectId.isValid(cardId)) {
    next(new BadRequestError('Неверный id карточки'));
    return;
  }

  Card.findById(cardId)
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Нет карточки с таким id');
      }

      if (card.owner.toString() !== request.user._id) {
        throw new UnauthorizedError('Карточка вам не принадлежит');
      }
    })
    .then(() => {
      Card.findByIdAndDelete(cardId)
        .then((card) => {
          if (card === null) {
            throw new NotFoundError('Нет карточки с таким id');
          }

          return response.json({ data: card });
        });
    })
    .catch(next);
};

module.exports.getCards = (request, response, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => response.send({ data: cards }))
    .catch(next);
};
