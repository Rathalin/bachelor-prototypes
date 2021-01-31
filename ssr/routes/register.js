var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {

  

  res.render('register', { title: 'Register', });
});


router.post('/', function (req, res) {
  // Check form parameters
  if (!req.body.username || !req.body.password) {
    return res.send(`Username or password missing!`);
  }

  res.render('registered', { title: 'Registered'} );

});

module.exports = router;
