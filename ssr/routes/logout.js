var express = require('express');
var router = express.Router();


router.post('/', function (req, res) {
  // Clear auth cookie
  res.cookie('authcookie', { expires: Date.now(), httpOnly: true });

  res.render('login', { title: 'Login' });
});

module.exports = router;
