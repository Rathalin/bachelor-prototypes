var express = require('express');
var router = express.Router();
const { MSG_TYPE } = require('../middleware/chat');


router.post('/', function (req, res) {
  // Clear auth cookie
  res.clearCookie('authcookie');

  // Disconnect from chat
  const { socket } = req.chat;
  if (socket) {
    socket.emit(MSG_TYPE.LOGOUT, {});
    socket.disconnect();
  console.log('disconnecting ', socket.user.username);
    // Remove socket from the connections array
    req.chat.socket = null;
    req.chat.chatmessages = [];
  }

  res.redirect('/login');
});

module.exports = router;
