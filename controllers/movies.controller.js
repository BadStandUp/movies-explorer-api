const mongoose = require('mongoose');
const Movie = require('../models/user.model');

const {
  NOT_FOUND_MOVIE_MESSAGE,
  CREATED_CODE,
  INCORRECT_ERROR_MESSAGE,
  OK_CODE,
} = require('../utils/constants');
const { IncorrectError, NotFoundError, ForbiddenError } = require('../errors/errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(OK_CODE).send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(CREATED_CODE).send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectError(`${INCORRECT_ERROR_MESSAGE} при создании карточки`));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_MOVIE_MESSAGE);
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Доступ запрещён');
      }
      movie.deleteOne()
        .then(() => {
          res.status(OK_CODE).send({ message: 'Фильм удалён' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectError(`${INCORRECT_ERROR_MESSAGE} фильма`));
      }
      return next(err);
    });
};
