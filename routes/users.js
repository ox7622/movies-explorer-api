const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser, getProfile,
} = require('../controllers/users');

module.exports = routerUser;

routerUser.get('/me', celebrate({
  headers: Joi.object().keys({
    cookie: Joi.string().required(),
  }).unknown(true),
}), getProfile);

routerUser.patch('/me', celebrate({
  headers: Joi.object().keys({
    cookie: Joi.string().required(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
  }).unknown(true),
}), updateUser);
