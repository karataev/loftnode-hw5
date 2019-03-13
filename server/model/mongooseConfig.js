const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function addListeners() {
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open');
  });

  mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ' + err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection disconnected app termination');
      process.exit(0);
    });
  });
}

function registerSchemas() {
  mongoose.model('user', require('./userSchema'));
}

function init() {
  addListeners();
  registerSchemas();
}

function connect() {
  const url = 'mongodb+srv://admin:admin@mycluster-vr8ob.mongodb.net/test?retryWrites=true';
  mongoose.connect(url, { useNewUrlParser: true });
}

module.exports = {
  init,
  connect,
};
