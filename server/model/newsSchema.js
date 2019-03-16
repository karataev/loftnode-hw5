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

newsSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = newsSchema;

