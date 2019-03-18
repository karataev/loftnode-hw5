const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');

let app = express();
let mongooseConfig = require('./model/mongooseConfig');

mongooseConfig.init();
app.use(morgan('tiny'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());

require('./config/config-passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));
app.use(express.static(path.join(__dirname, '..', 'dist')));

mongooseConfig.connect();

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io').listen(server);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Listen port ${PORT}`);
});

const clients = {};

io.on('connection', socket => {
  const id = socket.id;
  const user = {
    username: socket.handshake.headers.username,
    id,
  };
  clients[id] = user;
  socket.broadcast.emit('new user', user);
  socket.emit('all users', clients);

  socket.on('chat message', (data, userId) => {
    if (userId !== socket.id) {
      io.sockets.connected[userId].emit('chat message', data, socket.id);
    }
  });

  socket.on('disconnect', () => {
    delete clients[id];
    socket.broadcast.emit('delete user', id);
  });
});
