const wrongPassOrEmailMessage = 'Неправильные почта или пароль';
const incorrectEmailMessage = 'Некорректный формат электронной почты';
const incorrectLinkMessage = 'Некорректный формат ссылки';
const userAlreadyExistsMessage = 'Пользователь с таким email уже существует';
const userNotFoundMessage = 'Пользователь с указанным _id не найден';
const movieNotFoundMessage = 'Фильм с указанным _id не найден';
const cannotDeleteMessage = 'Вы не можете удалить этот фильм';
const deletedMessage = 'Фильм удален';

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const CREATED = 201;

module.exports = {
  wrongPassOrEmailMessage,
  incorrectEmailMessage,
  incorrectLinkMessage,
  userAlreadyExistsMessage,
  userNotFoundMessage,
  movieNotFoundMessage,
  cannotDeleteMessage,
  deletedMessage,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  SERVER_ERROR,
  CREATED,
};
