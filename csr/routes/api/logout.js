var express = require('express');
var router = express.Router();


router.post('/', function (req, res) {
  // Clear auth cookie
  res.clearCookie('authcookie');
  res.redirect('/login');
});

module.exports = router;
