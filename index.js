const express = require('express');
const mongoose = require('mongoose').default;
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/router');
const limiter = require('./middleware/limiter.middleware');
const { requestLogger, errorLogger } = require('./middleware/reqlog.middleware');
const { errorHandler } = require('./middleware/errors.middleware');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bitfilmsdb';
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'some-secret-key';
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected'))
  .catch((err) => {
    console.log(err);
  });

const whitelist = [
  'https://kino.nomoredomains.rocks',
  'http://kino.nomoredomains.rocks',
  'http://localhost:3000',
  'http://localhost:5173',
];

const app = express();
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors({
  origin: whitelist,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
