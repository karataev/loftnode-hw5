const auth = require('../model/auth');

function login(req, res) {
  let body = JSON.parse(req.body);
  let user = auth.loginUser(body.username, body.password);
  if (user) {
    res.json(user);
    return;
  }

  res.json({
    error: 'Пользователь не найден'
  });
}

function register(req, res) {
  let data = JSON.parse(req.body);
  auth.registerUser(data);
  res.json(data);
}

module.exports = {
  login,
  register,
};
