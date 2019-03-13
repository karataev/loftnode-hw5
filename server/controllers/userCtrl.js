const mongoose = require('mongoose');

const User = mongoose.model('user');
const utils = require('../model/utils');

function update(req, res, next) {
  let userId = req.params.id;
  let params = JSON.parse(req.body);
  if (params.password) {
    params.hash = utils.generateHash(params.password);
  }
  User.findOneAndUpdate({_id: userId}, params, (err, user) => {
    if (err) return next();
    res.json(user);
  })
}

module.exports = {
  update,
};
