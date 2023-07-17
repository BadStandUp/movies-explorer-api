const ERROR_CODE = 400;
const CREATED_CODE = 201;
const DEFAULT_ERROR_CODE = 500;
const NOT_FOUND_CODE = 404;
const UNAUTHORIZED_CODE = 401;
const CONFLICT_CODE = 409;
const INCORRECT_CODE = 400;
const OK_CODE = 200;

const NOT_FOUND_MOVIE_MESSAGE = 'Передан несуществующий _id фильма.';
const NOT_FOUND_USER_MESSAGE = 'Пользователь по указанному _id не найден.';
const INCORRECT_ERROR_MESSAGE = 'Переданы некорректные данные';
const DEFAULT_ERROR_MESSAGE = 'Ошибка по умолчанию.';
const NOT_FOUND_ERROR_MESSAGE = '404. Такой страницы не существует.';
const AUTH_ERROR_MESSAGE = 'Неправильные почта или пароль';
const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация';

module.exports = {
  ERROR_CODE,
  CREATED_CODE,
  DEFAULT_ERROR_CODE,
  NOT_FOUND_CODE,
  CONFLICT_CODE,
  INCORRECT_CODE,
  OK_CODE,
  NOT_FOUND_MOVIE_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  INCORRECT_ERROR_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  UNAUTHORIZED_CODE,
  AUTH_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
};
