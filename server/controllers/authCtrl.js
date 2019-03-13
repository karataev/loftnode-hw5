const mongoose = require('mongoose');
const passport = require('passport');
const uuidv4 = require('uuid/v4');

const User = mongoose.model('user');

function login(req, res, next) {
  req.body = JSON.parse(req.body);
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/');
    req.logIn(user, err => {
      if (err) next(err);
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
          req.logIn(user, err => {
            if (err) return next(err);
            res.json(newUser);
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
