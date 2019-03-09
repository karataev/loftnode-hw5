const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use('/', require('./routes'));


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listen port ${PORT}`);
});
