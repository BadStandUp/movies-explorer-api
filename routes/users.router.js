const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users.controller');

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
