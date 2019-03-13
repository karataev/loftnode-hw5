const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.serializeUser(function(user, done) {
  console.log('Serialize: ', user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('Deserialize: ', id);
  User.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

passport.use(
  new LocalStrategy({
      usernameField: 'username',
      passReqToCallback: true,
    },
    function(req, username, password, done) {
      User.findOne({ username })
        .then(user => {
          if (!user) {
            return done(null, false, req.flash('message', 'User not found'));
          }
          if (!user.isValidPassword(password)) {
            return done(null, false, req.flash('message', 'Incorrect password'));
          }
          return done(null, user);
        })
        .catch(err => done(err));
    }
  )
);
