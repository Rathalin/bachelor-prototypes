var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  // user info
  let user = {
    username: 'Rathalin',
    firstname: 'Daniel',
    lastname: 'Flockert',
    gender: 'male',
    dateOfBirth: '23.05.1997',

  };

  res.render('index', { title: 'Express', user });
});

module.exports = router;
