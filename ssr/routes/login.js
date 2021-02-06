var express = require('express');
var router = express.Router();
const { generateAccessToken, hash } = require('../middleware/authenticate');
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
  const { username, password } = req.body;
  // Check if username exists
  let user = await userM.findOne({ username }).exec();
  if (!user) {
    return res.render('login',
      { title: 'Login failed', errors: [{ error: { text: `There is no user registered as ${username}.` }, },] }
    );
  }
  // Check credentials
  user = await userM.findOne({ username, password: hash(password) }).exec();
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