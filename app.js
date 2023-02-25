require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { cors } = require('./middlewares/cors');

const { errorLogger, requestLogger } = require('./middlewares/logger');

const { errorHandler } = require('./middlewares/errorHandler');

const router = require('./routes/index');

const { PORT, DB_LINK } = require('./constants/env');

const { limiter } = require('./middlewares/rateLimiter');

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
app.use(limiter);

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(process.env.NODE_ENV !== 'production' ? PORT : process.env.PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
