const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
  },
  theme: {
    type: String,
  },
  user: {
    type: Object,
  }
});

