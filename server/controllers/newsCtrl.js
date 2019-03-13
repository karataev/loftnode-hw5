const mongoose = require('mongoose');

const News = mongoose.model('news');

function add(req, res, next) {
  const newItem = new News();
  newItem.text = 'foo bar';
  newItem.theme = 'theme';
  newItem.user = {
    image: null,
  };
  newItem
    .save()
    .then(result => {
      res.json(result);
    })
}

function getAll(req, res, next) {
  News.find({}, (err, news) => {
    res.json(news);
  });
}

module.exports = {
  getAll,
  add,
};
