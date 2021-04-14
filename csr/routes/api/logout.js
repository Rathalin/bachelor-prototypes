var express = require('express');
var router = express.Router();


router.post('/', function (req, res) {
  // Clear auth cookie
  res.clearCookie('authcookie');
  res.status(200).send('Logout successful!');
});

module.exports = router;
