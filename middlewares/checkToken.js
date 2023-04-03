const jwt = require('jsonwebtoken');

const LoginError = require('../errors/LoginError');

const { TOKEN } = require('../constants/env');
const { accessErrorUser } = require('../constants/constants');

module.exports.checkToken = (req, res, next) => {
  const authData = req.cookies.token;
  if (!authData || authData === undefined) {
    throw new LoginError(accessErrorUser);
  }
  try {
    let verified;
    if (process.env.NODE_ENV !== 'production') {
      verified = jwt.verify(authData, TOKEN);
    } else {
      verified = jwt.verify(authData, process.env.TOKEN);
    }

    if (verified) {
      const user = jwt.decode(authData);
      req.user = user;
      next();
    }
    return authData;
  } catch (err) {
    return next(new LoginError(accessErrorUser));
  }
};
