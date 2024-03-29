const status200 = 200;
const notFoundMovieText = 'Такого фильма в базе нет';
const notFoundUserText = 'Такого пользователя в базе нет';
const userExistsText = 'Пользователь с такими данными уже есть в базе';
const badRequestTextMovie = 'Ошибка валидации данных id фильма';
const badRequestTextUser = 'Ошибка валидации данных id пользователя';
const accessErrorMovie = 'У вас нет права удалять этот фильм';
const accessErrorUser = 'Пользователь не авторизован';
const movieDeleted = 'Фильм удален';
const loginErrorText = 'Неправильный логин или пароль';
const loginText = 'Вы успешно вошли';
const logoutText = 'Вы успешно вышли';
const pageNotFoundText = 'Страница не существует';
const serverErrorText = 'На сервере произошла ошибка';
const accountExistsText = 'Пользователь с таким email уже есть в базе';

module.exports = {
  status200,
  accountExistsText,
  notFoundMovieText,
  notFoundUserText,
  userExistsText,
  badRequestTextMovie,
  badRequestTextUser,
  accessErrorMovie,
  accessErrorUser,
  movieDeleted,
  loginText,
  logoutText,
  loginErrorText,
  pageNotFoundText,
  serverErrorText,
};
