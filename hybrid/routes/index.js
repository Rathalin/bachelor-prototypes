var express = require('express');
var router = express.Router();
const config = require('../config/serverConnections');


router.get('/', function (req, res, next) {
  // Load user
  const { user } = req;
  res.render('index', { title: user.username, user, ...config });
});


module.exports = router;

