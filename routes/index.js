const Router = require('express').Router();
const routerUser = require('./users');
const routerMovie = require('./movies');

const { checkToken } = require('../middlewares/checkToken');
const NotFoundError = require('../errors/NotFoundError');
const { pageNotFoundText } = require('../constants/constants');
const {
  validateLogin, validateCreateUser,
} = require('../middlewares/validation');
const {
  login, logout, createUser,
} = require('../controllers/users');

Router.post('/signin', validateLogin, login);
Router.post('/signup', validateCreateUser, createUser);

Router.use(checkToken);
Router.post('/signout', logout);

Router.use('/movies', routerMovie);
Router.use('/users', routerUser);

Router.all('/*', () => {
  throw new NotFoundError(pageNotFoundText);
});

module.exports = Router;
