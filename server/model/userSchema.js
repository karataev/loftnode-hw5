const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
    unique: true,
  },
  hash: {
    type: String,
    required: [true, 'Password required'],
  },
  token: {
    type: String,
  },
});

UserSchema.methods.isValidPassword = function(password) {
  return bCrypt.compareSync(password, this.hash);
};

UserSchema.methods.setPassword = function(password) {
  this.hash = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

UserSchema.methods.setToken = function(token) {
  this.token = token;
};

module.exports = UserSchema;
