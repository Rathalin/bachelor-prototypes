var express = require('express');
var router = express.Router();
const { authenticateToken } = require('../middleware/authenticate');


router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});


router.post('/', function (req, res) {
  // Check for missing attributes
  if (!req.body.username || !req.body.password) {
    return res.render('login', { title: 'Login', error: 'Please put in your username and password!'});
  }
  // Check credentials
  const { username, password } = req.body;


  res.redirect('/');
});


module.exports = router;
