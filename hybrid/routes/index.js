var express = require('express');
var router = express.Router();
const itemprops = require('../config/itemprops');


router.get('/', function (req, res, next) {
  // Load user
  const { user } = req;
  res.render('index', {
    title: user.username,
    user,
    itemprops: [
      { itemprop: 'data_username', content: user.username },
      ...itemprops,
    ],
  });
});


module.exports = router;

