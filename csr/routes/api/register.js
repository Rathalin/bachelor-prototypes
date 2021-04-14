var express = require('express');
var router = express.Router();
const { generateAccessToken, hash } = require('../../middleware/authenticate');
const userM = require('../../models/userModel');


router.post('/', async function (req, res) {
  // Check form parameters
  if (!req.body.username || !req.body.password) {
    return res.json(
      { errors: [{ text: 'Please put in username and password.' },] }
    );
  }

  const username = req.body.username.trim();
  const password = req.body.password;

  // Check if username already exists
  if ((await userM.countDocuments({ username: { $regex: username, $options: 'i' } }).exec()) > 0) {
    return res.json(
      { errors: [{ text: 'This username is already taken.' },] }
    );
  }
  // Insert new user into db
  const hashedPassword = hash(password);
  const user = await userM.create({ username, password: hashedPassword });
  // Generate token
  const token = generateAccessToken(user);
  res.cookie('authcookie', token, { expires: new Date(Date.now() + 1 * 3600000), httpOnly: true });
  // Redirect to registered
  res.json({ user, success: { text: 'Registration successful!' } });
});

module.exports = router;
