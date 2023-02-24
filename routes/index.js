const Router = require('express').Router();
const { validateCreateMovie, validateDeleteMovie, validateUpdateUser } = require('../middlewares/validation');

const {
  updateUser, getProfile,
} = require('../controllers/users');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

module.exports = Router;

Router.get('/movies', getMovies);

Router.post('/movies', validateCreateMovie, createMovie);

Router.delete('/movies/:id', validateDeleteMovie, deleteMovie);

Router.get('/users/me', getProfile);

Router.patch('/users/me', validateUpdateUser, updateUser);
