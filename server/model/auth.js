const _ = require('lodash');

let users = [];

function registerUser(data) {
  data.access_token = '1';
  data.permissionId = '2';
  users.push(data);
}

function loginUser(username, password) {
  let user = _.find(users, {username});
  if (!user) return null;
  return user.password === password ? user : null;
}

module.exports = {
  registerUser,
  loginUser,
};
