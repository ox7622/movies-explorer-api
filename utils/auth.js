const jwt = require('jsonwebtoken');

const { TOKEN } = require('../constants/env');

module.exports.createToken = (user) => {
  const token = jwt.sign(
    { _id: user._id },
    process.env.NODE_ENV !== 'production' ? TOKEN : process.env.TOKEN,
    { expiresIn: '7d' },
  );
  return token;
};
