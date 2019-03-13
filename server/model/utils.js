const bCrypt = require('bcryptjs');

function generateHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = {
  generateHash,
};
