const router = require('express').Router();
const { auth } = require('../middleware/auth.middleware');
const { NotFoundError } = require('../errors/errors');
const { NOT_FOUND_CODE, NOT_FOUND_ERROR_MESSAGE } = require('../utils/constants');

const userRouter = require('./users.router');
const movieRouter = require('./movies.router');
const authRouter = require('./auth.router');

router.use('/', authRouter);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(`${NOT_FOUND_CODE}. ${NOT_FOUND_ERROR_MESSAGE}`));
});

module.exports = router;
