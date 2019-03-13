const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('user');

function login(req, res, next) {
  let body = JSON.parse(req.body);
  const {username, password} = req.body;
  passport.authenticate('local', (err, user, info) => {
    console.log('z', err, user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/');
    }
    req.logIn(user, err => {
      if (err) next(err);
      return res.redirect('/profile');
    });
  })(req, res, next);

}

function register(req, res, next) {
  let body = JSON.parse(req.body);
  const { username, password } = body;
  console.log('!!', body);

  User.findOne({ username }).then(user => {
    console.log('user?', user);
    if (user) {
      // req.flash('message', 'Пользователь с таким email уже существует');
      res.redirect('/');
    } else {
      const newUser = new User();
      newUser.username = username;
      newUser.setPassword(password);
      newUser
        .save()
        .then(user => {
          req.logIn(user, err => {
            if (err) next(err);
            return res.redirect('/');
          });
        })
        .catch(next);
    }
  });
}

module.exports = {
  login,
  register,
};
