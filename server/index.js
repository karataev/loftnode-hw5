const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');

let app = express();
let mongooseConfig = require('./model/mongooseConfig');

mongooseConfig.init();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());

require('./config/config-passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

mongooseConfig.connect();

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listen port ${PORT}`);
});
