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
        returnAllNews(res);
      });
  });

}

function returnAllNews(res) {
  News.find({}, (err, news) => {
    // TODO: рефакторинг. как по-человечески вернуть id вместо _id?
    let items = JSON.parse(JSON.stringify(news));
    items.forEach(item => item.id = item._id);
    res.json(items);
  });
}

function getAll(req, res, next) {
    returnAllNews(res);
}

function removeItem(req, res, next) {
  let newsId = req.params.id;
  News.findOneAndDelete(newsId, () => {
    returnAllNews(res);
  });
}

function updateItem(req, res, next) {
  let newsId = req.params.id;
  let data = JSON.parse(req.body);
  News.findOneAndUpdate(newsId, data, () => {
    returnAllNews(res);
  })
}

module.exports = {
  getAll,
  addItem,
  removeItem,
  updateItem,
};
