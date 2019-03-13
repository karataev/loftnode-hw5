const path = require('path');
const express = require('express');
const router = express.Router();

const authCtrl = require('./controllers/authCtrl');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

router.post('/api/login', authCtrl.login);

router.post('/api/saveNewUser', authCtrl.register);

module.exports = router;