const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function generateAccessToken() {
  //crypto.randomBytes(64).toString('hex')// expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.redirect('/login'); // if there isn't any token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  })
}

module.exports = { generateAccessToken, authenticateToken };