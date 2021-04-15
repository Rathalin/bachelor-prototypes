var express = require('express');
var router = express.Router();
const config = require('../config/serverConnections');

router.get('/', function (req, res) {
  res.render('index', {
    config,
  });
});


module.exports = router;

