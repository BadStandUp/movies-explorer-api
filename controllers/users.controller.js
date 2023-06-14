const mongoose = require('mongoose');
const User = require('../models/user.model');

const {
  NOT_FOUND_USER_MESSAGE,
  INCORRECT_ERROR_MESSAGE,
  OK_CODE,
} = require('../utils/constants');
const {
  IncorrectError,
  NotFoundError,
} = require('../errors/errors');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(NOT_FOUND_USER_MESSAGE);
      }
      return res.status(OK_CODE).send({ user });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, info, next) => {
  User.findByIdAndUpdate(req.user._id, info, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(NOT_FOUND_USER_MESSAGE);
      }
      return res.status(OK_CODE).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new IncorrectError(`${INCORRECT_ERROR_MESSAGE} при обновлении пользователя`));
      }
      return next(err);
    });
};
