const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const NotFoundError = require('./errors/notFoundError');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', routes);

app.use((request, response, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

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
