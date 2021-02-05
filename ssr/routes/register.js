var express = require('express');
var router = express.Router();
const { generateAccessToken, hash } = require('../middleware/authenticate');
const userM = require('../models/userModel');


router.get('/', function (req, res) {
  res.render('register', { title: 'Register', });
});


router.post('/', async function (req, res) {
  // Check form parameters
  if (!req.body.username || !req.body.password) {
    return res.render('register',
      { title: 'Registration failed', errors: [{ error: { text: 'Please put in username and password.' }, },] }
    );
  }
  const { username, password } = req.body;
  // Check if username already exists
  if ((await userM.countDocuments({ username }).exec()) > 0) {
    return res.render('register',
      { title: 'Registration failed', errors: [{ error: { text: 'This username is already taken.' }, },] }
    );
  }
  // Insert new user into db
  const hashedPassword = hash(password);
  const user = await userM.create({ username, password: hashedPassword });
  // Generate token
  const token = generateAccessToken(user);
  res.cookie('authcookie', token, { expires: new Date(Date.now() + 1 * 3600000), httpOnly: true });
  // Redirect to registered
  res.render('registered', { title: 'Registered' });
});

module.exports = router;
