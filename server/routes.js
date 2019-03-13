const path = require('path');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const authCtrl = require('./controllers/authCtrl');
const newsCtrl = require('./controllers/newsCtrl');
const User = mongoose.model('user');

/*
router.get('/', (req, res, next) => {
  const token = req.cookies.token;
  console.log('token?', token);
  if (!!token) {
    User.findOne({ token }).then(user => {
      if (user) {
        req.logIn(user, err => {
          if (err) next(err);
        });
      }
      next();
    });
  } else {
    next();
  }
});
*/


router.post('/api/login', authCtrl.login);
router.post('/api/saveNewUser', authCtrl.register);
router.post('/api/authFromToken', authCtrl.authFromToken);
router.get('/api/getNews', newsCtrl.getAll);
router.post('/api/newNews', newsCtrl.add);


module.exports = router;
