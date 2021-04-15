var express = require('express');
var router = express.Router();
const itemprops = require('../config/itemprops');


router.get('/', function (req, res) {
  res.render('index', {
    itemprops,
  });
});


module.exports = router;