const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const User = mongoose.model('user');

function updateImage(req, res, next) {
  const form = new formidable.IncomingForm();
  const upload = path.join('./dist', 'upload');

  if (!fs.existsSync(upload)) fs.mkdirSync(upload);

  form.uploadDir = path.join(process.cwd(), upload);
  form.parse(req, (err, fields, files) => {
    const photoItem = files[Object.keys(files)[0]];

    const fileName = path.join(upload, photoItem.name);
    fs.rename(photoItem.path, fileName, err => {
      const imgPath = path.relative('./dist', fileName);

      const userId = req.params.id;
      User.findOneAndUpdate({_id: userId}, {image: imgPath}, (err, user) => {
        res.json({path: imgPath});
      })

    })
  })
}

module.exports = updateImage;
