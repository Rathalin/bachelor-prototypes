var express = require('express');
var router = express.Router();
const { generateAccessToken } = require('../middleware/authenticate');
const userM = require('../models/userModel');


router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});


router.post('/', async function (req, res) {
  // Check for missing attributes
  if (!req.body.username || !req.body.password) {
    return res.render('login',
      { title: 'Login failed', errors: [{ error: { text: 'Please put in your username and password.' }, },] }
    );
  }
  // Check credentials
  const { username, password } = req.body;
  const user = await userM.findOne({ username, password });
  if (!user) {
    return res.render('login',
      { title: 'Login failed', errors: [{ error: { text: 'The login details you entered are incorrect. Please try again.' }, },] }
    );
  }

  // Generate token
  const token = generateAccessToken(user);

  res.cookie('authcookie', token, { expires: new Date(Date.now() + 1 * 3600000), httpOnly: true });
  res.redirect('/');
});


module.exports = router;
