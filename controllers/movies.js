const Movie = require('../models/movie');

const {
  status200,
} = require('../constants/status');

const { decodeToken } = require('../utils/auth');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({});
    return res.status(status200).json(movie);
  } catch (err) {
    return next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const ownerId = decodeToken(req.user);
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: ownerId,
    });
    return res.status(status200).json(movie);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequestError('Ошибка валидации данных карточки'));
    }
    return next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  const ownerId = decodeToken(req.user);
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new NotFoundError('Фильм не найден');
    }
    if (movie.owner.toString() === ownerId._id.toString()) {
      await Movie.findByIdAndRemove(id);
      return res.status(status200).json({ message: 'Фильм удален' });
    }
    throw new AccessError('У вас нет права удалять этот фильм');
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequestError('Ошибка валидации данных id фильм'));
    }
    return next(err);
  }
};

// module.exports.likemovie = async (req, res, next) => {
//   const ownerId = decodeToken(req.user);
//   const { id } = req.params;
//   try {
//     const movie = await movie.findByIdAndUpdate(
//       id,
//       { $addToSet: { likes: ownerId._id } }, // добавить _id в массив, если его там нет
//       { new: true },
//     );
//     if (!movie) {
//       throw new NotFoundError('Такой карточки нет');
//     }
//     return res.status(status200).json(movie);
//   } catch (err) {
//     if (err.name === 'ValidationError' || err.name === 'CastError') {
//       return next(new BadRequestError('Ошибка валидации данных id карточки'));
//     }
//     return next(err);
//   }
// };

// module.exports.dislikemovie = async (req, res, next) => {
//   const ownerId = decodeToken(req.user);
//   const { id } = req.params;
//   try {
//     const movie = await Movie.findByIdAndUpdate(
//       id,
//       { $pull: { likes: ownerId._id } },
//       { new: true },
//     );
//     if (!movie) {
//       throw new NotFoundError('Такой карточки нет');
//     }
//     return res.status(status200).json(movie);
//   } catch (err) {
//     if (err.name === 'ValidationError' || err.name === 'CastError') {
//       return next(new BadRequestError('Ошибка валидации данных id карточки'));
//     }
//     return next(err);
//   }
// };
