var express = require('express');
var router = express.Router();
const { generateAccessToken, hash } = require('../../middleware/authenticate');
const jwt = require('jsonwebtoken');
const userM = require('../../models/userModel');


router.post('/cookie', async function (req, res) {
  // Gather the jwt access token from the request header
  const token = req.cookies?.authcookie;
  console.log("Token: " + token);
  // Check if there is no token
  if (!token) { return res.json({ authorized: false }); }

  try {
      const userId = await jwt.verify(token, process.env.AUTH_TOKEN_SECRET);

      // Attach user to connection object
      req.user = await userM.findById(userId).exec();

      return res.json({ user: req.user, authorized: true });
  } catch (err) {
      console.log(err);
      return res.status(500);
  }
});


router.post('/', async function (req, res) {
  // Check for missing attributes
  if (!req.body.username || !req.body.password) {
    return res.status(200).json({
      errors: [{ text: 'Please put in your username and password.' },],
    });
  }
  const username = req.body.username.trim();
  const password = req.body.password;

  // Check if username exists (case insensitive)
  let user = await userM.findOne({ username: { $regex: username.toLowerCase(), $options: 'i' } }).exec();
  if (!user) {
    return res.status(200).json(
      { errors: [{ text: `There is no user registered as ${username}.` },] }
    );
  }
  // Check credentials
  user = await userM.findOne({ username: { $regex: username.toLowerCase(), $options: 'i' }, password: hash(password) }).exec();
  if (!user) {
    return res.status(200).json(
      { errors: [{ text: 'The login details you entered are incorrect. Please try again.' },] }
    );
  }

  // Generate token
  const token = generateAccessToken(user);
  res.cookie('authcookie', token, { expires: new Date(Date.now() + 1 * 3600000), httpOnly: true });

  res.json({ user });
});


module.exports = router;
