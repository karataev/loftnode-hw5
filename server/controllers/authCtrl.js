const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('user');

function login(req, res, next) {
  req.body = JSON.parse(req.body);
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/');
    req.logIn(user, err => {
      if (err) next(err);
      let userRes = {
        access_token: user.token,
        username: user.username,
      };
      res.json(userRes);
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
