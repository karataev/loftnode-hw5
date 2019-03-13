const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const url = 'mongodb+srv://admin:admin@mycluster-vr8ob.mongodb.net/test?retryWrites=true';

mongoose.connect(url, { useNewUrlParser: true });

require('./user');
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
