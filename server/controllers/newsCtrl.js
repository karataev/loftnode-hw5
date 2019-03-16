const mongoose = require('mongoose');
const _ = require('lodash');

const News = mongoose.model('news');
const User = mongoose.model('user');

function addItem(req, res, next) {
  const {userId, text, theme, date} = JSON.parse(req.body);
  User.findById(userId, (err, user) => {
    if (err) return next();
    const newItem = new News();
    newItem.text = text;
    newItem.theme = theme;
    newItem.user = user;
    newItem
      .save()
      .then(result => {
        News.find({}, (err, news) => res.json(news));
      });
  });

}

function getAll(req, res, next) {
  News.find({}, (err, news) => res.json(news));
}

function removeItem(req, res, next) {
  let newsId = req.params.id;
  News.findOneAndDelete(newsId, () => {
    News.find({}, (err, news) => res.json(news));
  });
}

function updateItem(req, res, next) {
  let newsId = req.params.id;
  let data = JSON.parse(req.body);
  News.findOneAndUpdate(newsId, data, () => {
    News.find({}, (err, news) => res.json(news));
  })
}

module.exports = {
  getAll,
  addItem,
  removeItem,
  updateItem,
};
