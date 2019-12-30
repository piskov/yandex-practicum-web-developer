const { ObjectId } = require('mongoose').Types;
const Card = require('../models/card');

module.exports.createCard = (request, response) => {
  if (Object.keys(request.body).length === 0) {
    response.status(400).send({ message: 'Пустое тело запроса' });
    return;
  }

  const { name, link } = request.body;
  const owner = request.user._id;

  const cardModel = new Card({ name, link, owner });

  const validationErrors = cardModel.validateSync();
  if (validationErrors) {
    const errorMessage = Object.values(validationErrors.errors)
      .map((error) => error.message);

    response.status(400).send({ errors: errorMessage });
    return;
  }

  Card.create(cardModel)
    .then((card) => response.send({ data: card }))
    .catch(() => response.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (request, response) => {
  const { cardId } = request.params;

  if (cardId === undefined) {
    response.status(400).send({ message: 'Не указан id карточки' });
    return;
  }

  if (!ObjectId.isValid(cardId)) {
    response.status(400).send({ message: 'Неверный id карточки' });
    return;
  }

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (card === null) {
        return response.status(404)
          .json({ message: 'Нет карточки с таким id' });
      }

      return response.json({ data: card });
    })
    .catch(() => response.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getCards = (request, response) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => response.send({ data: cards }))
    .catch(() => response.status(500).send({ message: 'Произошла ошибка' }));
};
