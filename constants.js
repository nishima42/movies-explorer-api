const wrongPassOrEmailMessage = 'Неправильные почта или пароль';
const incorrectEmailMessage = 'Некорректный формат электронной почты';
const incorrectLinkMessage = 'Некорректный формат ссылки';
const userAlreadyExistsMessage = 'Пользователь с таким email уже существует';
const userNotFoundMessage = 'Пользователь с указанным _id не найден';
const movieNotFoundMessage = 'Фильм с указанным _id не найден';
const cannotDeleteMessage = 'Вы не можете удалить этот фильм';
const movieDeletedMessage = 'Фильм удален';
const authorizationRequiredMessage = 'Необходима авторизация';
const incorrectDataMessage = 'Переданы некорректные данные';
const serverErrorMessage = 'На сервере произошла ошибка';
const pageNotFoundMessage = 'Запрашиваемый ресурс не найден';
const logoutMessage = 'Пользователь успешно вышел из системы';

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;
const CREATED = 201;

const duplicateErrorCode = 11000;

module.exports = {
  wrongPassOrEmailMessage,
  incorrectEmailMessage,
  incorrectLinkMessage,
  userAlreadyExistsMessage,
  userNotFoundMessage,
  movieNotFoundMessage,
  cannotDeleteMessage,
  movieDeletedMessage,
  authorizationRequiredMessage,
  incorrectDataMessage,
  serverErrorMessage,
  pageNotFoundMessage,
  logoutMessage,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
  CREATED,
  duplicateErrorCode,
};
