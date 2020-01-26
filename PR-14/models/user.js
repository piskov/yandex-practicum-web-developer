const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Допустимая длина для имени: 2…30 символов'],
    maxlength: [30, 'Допустимая длина для имени: 2…30 символов'],
    required: [true, 'Не задано имя для пользователя'],
  },
  about: {
    type: String,
    minlength: [2, 'Допустимая длина для описания: 2…30 символов'],
    maxlength: [30, 'Допустимая длина для описания: 2…30 символов'],
    required: [true, 'Не задано описание для пользователя'],
  },
  avatar: {
    type: String,
    match: [
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
      'Некорректная ссылка на аватар',
    ],
    required: [true, 'Не задана ссылка на аватар'],
  },
});

module.exports = mongoose.model('user', userSchema);
