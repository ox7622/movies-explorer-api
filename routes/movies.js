const { celebrate, Joi } = require('celebrate');
const routerMovie = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

module.exports = routerMovie;

routerMovie.get(
  '/',
  celebrate({
    headers: Joi.object().keys({
      cookie: Joi.string().required(),
    }).unknown(true),
  }),
  getMovies,
);

routerMovie.post('/', celebrate({
  headers: Joi.object().keys({
    cookie: Joi.string().required(),
  }).unknown(true),
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    description: Joi.string().required(),
    year: Joi.string().required(),
    duration: Joi.number().required(),
    trailerLink: Joi.string().required()
      .regex(/^https?:\/\/(wwww.)?[-._~:/?#@!$&'()*+,;=a-zA-Z0-9]+$/),
    thumbnail: Joi.string().required()
      .regex(/^https?:\/\/(wwww.)?[-._~:/?#@!$&'()*+,;=a-zA-Z0-9]+$/),
    image: Joi.string().required()
      .regex(/^https?:\/\/(wwww.)?[-._~:/?#@!$&'()*+,;=a-zA-Z0-9]+$/),
    movieId: Joi.number().required(),
  }).unknown(true),
}), createMovie);

routerMovie.delete('/:id', celebrate({
  headers: Joi.object().keys({
    cookie: Joi.string().required(),
  }).unknown(true),
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }).unknown(true),
}), deleteMovie);
