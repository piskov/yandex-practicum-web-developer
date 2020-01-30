const bodyParser = require('body-parser');
const { celebrate, errors, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const NotFoundError = require('./errors/notFoundError');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const routes = require('./routes');


require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(requestLogger);

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(3).max(254),
      password: Joi.string().required().min(8).max(2048),
    }),
  }),
  login);

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required().min(3).max(2048),
      email: Joi.string().required().min(3).max(254),
      password: Joi.string().required().min(8).max(2048),
    }),
  }),
  createUser);

app.use(auth);
app.use('/', routes);

// 404
app.use((request, response, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

// celebrate errors
app.use(errors());

// any other errors
app.use((error, request, response, next) => {
  const { statusCode = 500 } = error;
  let { message } = error;

  if (statusCode === 500) {
    message = 'На сервере произошла ошибка';
  }

  response.status(statusCode).send({ message });
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => { });
