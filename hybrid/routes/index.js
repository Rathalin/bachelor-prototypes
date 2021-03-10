var express = require('express');
var router = express.Router();


router.get('/', async function (req, res, next) {
  // Load user
  const { user, socket, chatmessages } = req;
  res.render('index', { title: user.username, user, messages: chatmessages });
});


module.exports = router;

