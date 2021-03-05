var express = require('express');
var router = express.Router();


router.get('/', async function (req, res, next) {
  // Load user, chatmessages
  const { connection } = req.attachments;
  const { user, chatmessages } = connection;
  res.render('index', { title: user.username, user, messages: chatmessages });
});


module.exports = router;

