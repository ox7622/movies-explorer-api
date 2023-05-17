const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /^https?:\/\/(wwww.)?[-._~:/?#@!$&'()*+,;=a-zA-Z0-9]+$/.test(link);
      },
    },
  },

  owner: {
    type: mongoose.ObjectId,
    required: true,
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /^https?:\/\/(wwww.)?[-._~:/?#@!$&'()*+,;=a-zA-Z0-9]+$/.test(link);
      },
    },
  },

  imageURL: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /^https?:\/\/(wwww.)?[-._~:/?#@!$&'()*+,;=a-zA-Z0-9]+$/.test(link);
      },
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
