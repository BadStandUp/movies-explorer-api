const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies.controller');
const validateURL = require('../utils/validationConfig');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri().custom(validateURL),
    trailerLink: Joi.string().required().uri().custom(validateURL),
    thumbnail: Joi.string().required().uri().custom(validateURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
