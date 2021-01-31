var express = require('express');
var router = express.Router();


router.post('/', function (req, res) {
  

  res.render('login', { title: 'Login' });
});

module.exports = router;
