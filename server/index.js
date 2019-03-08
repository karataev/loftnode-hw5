const path = require('path');
const express = require('express');

const router = express.Router();

let app = express();

app.use(router);
app.use(express.static(path.join(__dirname, '..', 'dist')));

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listen port ${PORT}`);
});
