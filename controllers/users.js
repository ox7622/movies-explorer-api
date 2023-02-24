const bcrypt = require('bcrypt');
const User = require('../models/user');
const { cookieDomain } = require('../constants/env');
const {
  status200,
  userExistsText,
  badRequestTextUser,
  notFoundUserText,
  accountExistsText,
  loginErrorText,
  loginText,
  logoutText,
} = require('../constants/constants');
const { createToken } = require('../utils/auth');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const AccountExistsError = require('../errors/AccountExistsError');
const LoginError = require('../errors/LoginError');

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      ...req.body, password: hash,
    });
    return res.status(status200).json({
      name: user.name, email: user.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new AccountExistsError(userExistsText));
    }
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequestError(badRequestTextUser));
    }
    return next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  if (!User.findById(req.user._id)) {
    throw new NotFoundError(notFoundUserText);
  }
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
      },
    );
    return res.status(status200).json(user);
  } catch (err) {
    if (err.code === 11000) {
      return next(new AccountExistsError(accountExistsText));
    }
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequestError(badRequestTextUser));
    }
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new LoginError(loginErrorText);
    }
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const token = createToken(user);
      return res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 30 * 24 * 3600000,
        domain: process.env.NODE_ENV !== 'production'
          ? cookieDomain : process.env.cookieDomain,
      }).status(status200).json({ message: loginText });
    }
    throw new LoginError(loginErrorText);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequestError(badRequestTextUser));
    }
    return next(err);
  }
};

module.exports.logout = (req, res, next) => res.clearCookie('token', {
  path: '/',
  domain: process.env.NODE_ENV !== 'production' ? cookieDomain : process.env.cookieDomain,
}).status(status200).json({ message: logoutText });

module.exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError(notFoundUserText);
    }
    return res.status(status200).json(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequestError(badRequestTextUser));
    }
    return next(err);
  }
};
