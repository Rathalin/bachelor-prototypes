var express = require('express');
var router = express.Router();
const userM = require('../models/userModel');
const { sendMessage } = require('../middleware/chatConnection');


router.post('/send', async function (req, res) {
  const { connection } = req.attachments;
  const { user, socket, chatmessages } = connection;

  // Check for missing attributes
  const { chat_input } = req.body;
  console.log(user.username, ' send ', chat_input);
  if (chat_input && chat_input.trim()) {
    const message = { username: user.username, text: chat_input };
    chatmessages.push(message);
    // Send chatmessage to all
    sendMessage(socket, message);
  }

  res.render('index', { title: 'Chat', user, messages: connection.chatmessages });
});


module.exports = router;
