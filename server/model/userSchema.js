const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const utils = require('./utils');

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
  access_token: {
    type: String,
  },
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  surName: {
    type: String,
  },
  permission: {
    type: Object,
  }
});

UserSchema.methods.isValidPassword = function(password) {
  return bCrypt.compareSync(password, this.hash);
};

UserSchema.methods.setPassword = function(password) {
  this.hash = utils.generateHash(password);
};

UserSchema.methods.setToken = function(token) {
  this.access_token = token;
};

module.exports = UserSchema;
