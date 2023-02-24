require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { cors } = require('./middlewares/cors');

const { errorLogger, requestLogger } = require('./middlewares/logger');

const { errorHandler } = require('./middlewares/errorHandler');

const { login, createUser, logout } = require('./controllers/users');

const { checkToken } = require('./middlewares/checkToken');
const router = require('./routes/index');

const { NotFoundError } = require('./errors/NotFoundError');
const { validateCreateUser, validateLogin } = require('./middlewares/validation');
const { PORT, DB_LINK } = require('./constants/env');

const { limiter } = require('./middlewares/rateLimiter');
const { pageNotFoundText } = require('./constants/constants');

mongoose.set('strictQuery', true);

const app = express();
app.use(express.json());

app.use(cors);
app.use(helmet());
app.use(cookieParser());

// подключаемся к серверу mongo
mongoose.connect(process.env.NODE_ENV !== 'production' ? DB_LINK : process.env.DB_LINK, {
  useNewUrlParser: true,
}, () => {
  console.log('Connected to Mongo db');
});

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.post('/signout', checkToken, logout);

app.use('/', checkToken, router);

app.use(errorLogger);
app.use(errors());

app.all('/*', (req, res) => {
  res.status(404).json({ message: pageNotFoundText });
});
app.use(limiter);
app.use(errorHandler);

app.listen(process.env.NODE_ENV !== 'production' ? PORT : process.env.PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
