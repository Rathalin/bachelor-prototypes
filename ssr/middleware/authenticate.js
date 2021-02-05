const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');
dotenv.config();


function generateAccessToken({ _id }) {
  // Expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(_id.toString(), process.env.AUTH_TOKEN_SECRET);
}

async function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const token = req.cookies?.authcookie;
  // Check if there is no token
  if (!token) return res.redirect('/login');

  try {
    const userId = await jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    req.userId = userId;
    next(); // pass the execution off to whatever request the client intended
  } catch (err) {
    console.log(err);
    return res.redirect('/login');
  }
}


function hash(str) {
  const hash = crypto.createHash('sha256');
  hash.update(str);
  const hashStr = hash.digest('hex');
  hash.end();
  return hashStr;
}


module.exports = { generateAccessToken, authenticateToken, hash };