const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


function generateAccessToken({ username }) {
  // Expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username, process.env.AUTH_TOKEN_SECRET);
}

async function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const token = req.cookies?.authcookie;
  // Check if there is no token
  console.log(token);
  if (!token) return res.redirect('/login');

  try {
    const username = await jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    req.username = username;
    next(); // pass the execution off to whatever request the client intended
  } catch (err) {
    console.log(err);
    return res.redirect('/login');
  }
}

module.exports = { generateAccessToken, authenticateToken };