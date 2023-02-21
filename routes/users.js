const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser, getProfile,
} = require('../controllers/users');

module.exports = routerUser;

// routerUser.get('/', celebrate({
//   headers: Joi.object().keys({
//     cookie: Joi.string().required(),
//   }).unknown(true),
// }), getUsers);

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

// routerUser.patch('/me/avatar', celebrate({
//   headers: Joi.object().keys({
//     cookie: Joi.string().required(),
//   }).unknown(true),
//   body: Joi.object().keys({
//     avatar: Joi.string().required()
//       .regex(/^https?:\/\/(wwww.)?[-._~:/?#@!$&'()*+,;=a-zA-Z0-9]+$/),
//   }).unknown(true),
// }), updateAvatar);

// routerUser.get('/:id', celebrate({
//   headers: Joi.object().keys({
//     cookie: Joi.string().required(),
//   }).unknown(true),
//   params: Joi.object().keys({
//     id: Joi.string().hex().length(24).required(),
//   }),
// }), findUser);
