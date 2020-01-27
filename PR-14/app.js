const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

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

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => { });
