const mongoose = require('mongoose');
const passport = require('passport');
const uuidv4 = require('uuid/v4');

const User = mongoose.model('user');

function setTokenCookie(token, res) {
  res.cookie('access_token', token, {
    maxAge: 7 * 60 * 60 * 1000,
    path: '/',
    httpOnly: true,
  });
}

function login(req, res, next) {
  req.body = JSON.parse(req.body);
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/');
    req.logIn(user, err => {
      if (err) next(err);
      setTokenCookie(user.access_token, res);
      let userRes = {
        access_token: user.access_token,
        username: user.username,
        permissionId: 'wtf',
        permission: user.permission,
      };
      res.json(userRes);
    });
  })(req, res, next);

}

function register(req, res, next) {
  let body = JSON.parse(req.body);

  User.findOne({ username: body.username }).then(user => {
    if (user) {
      res.json({
        error: 'Пользователь уже существует',
      })
    } else {
      const newUser = new User();
      newUser.username = body.username;
      newUser.firstName = body.firstName;
      newUser.surName = body.surName;
      newUser.middleName = body.middleName;
      newUser.permission = body.permission;
      const token = uuidv4();
      newUser.setToken(token);
      newUser.setPassword(body.password);
      newUser
        .save()
        .then(user => {
          setTokenCookie(token, res);

          req.logIn(user, err => {
            if (err) return next(err);
            res.json(newUser);
          });
        })
        .catch(next);
    }
  });
}

function authFromToken(token) {
  console.log('TODO: AUTH FROM TOKEN!!');
}

module.exports = {
  login,
  register,
  authFromToken,
};
