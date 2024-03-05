const Movie = require('../models/movie');

const {
  status200, badRequestTextMovie, notFoundMovieText, movieDeleted, accessErrorMovie,
} = require('../constants/constants');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');

module.exports.getMovies = async (req, res) => {
  const movie = await Movie.find({ owner: req.user._id }).exec();
  return res.status(status200).json(movie);
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({
      ...req.body, owner: req.user._id,
    });

    return res.status(status200).json(movie);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequestError(badRequestTextMovie));
    }
    return next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new NotFoundError(notFoundMovieText);
    }
    if (movie.owner.toString() === req.user._id.toString()) {
      await Movie.findByIdAndRemove(id);
      return res.status(status200).json(movie);
    }
    throw new AccessError(accessErrorMovie);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequestError(badRequestTextMovie));
    }
    return next(err);
  }
};
