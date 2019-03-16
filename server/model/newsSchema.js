const mongoose = require('mongoose');

let newsSchema = new mongoose.Schema({
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

module.exports = newsSchema;

