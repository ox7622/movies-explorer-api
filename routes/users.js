const routerUser = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validation');
const { updateUser, getProfile } = require('../controllers/users');

routerUser.get('/me', getProfile);

routerUser.patch('/me', validateUpdateUser, updateUser);

module.exports = routerUser;
