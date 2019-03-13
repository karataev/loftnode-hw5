
function add(req, res, next) {
  res.json({TODO: 'add news'});
}

function getAll(req, res, next) {
  res.json([{
    id: 1,
    text: 'news one',
    theme: 'theme',
    date: 'date',
    user: {
      firstName: 'first',
      image: null,
    },
  }]);
}

module.exports = {
  getAll,
  add,
};
