const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

const {
  CREATED_CODE,
  INCORRECT_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGE,
} = require('../utils/constants');
const {
  IncorrectError,
  AuthorizationError,
  ConflictError,
} = require('../errors/errors');

module.exports.register = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => {
      res.status(CREATED_CODE).send({
        name, email,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectError(`${INCORRECT_ERROR_MESSAGE} при создании пользователя`));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким Email уже зарегистрирован'));
      }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError(AUTH_ERROR_MESSAGE);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationError(AUTH_ERROR_MESSAGE);
        }
        return user;
      });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};
