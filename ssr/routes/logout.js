var express = require('express');
var router = express.Router();
const { MSG_TYPE } = require('../middleware/chatConnection');


router.post('/', function (req, res) {
  // Clear auth cookie
  res.clearCookie('authcookie');

  // Disconnect from chat
  const { connection, connections } = req.attachments;

  if (connection.socket) {
    req.attachments.connection.socket.emit(MSG_TYPE.LOGOUT, {});
    req.attachments.connection.socket.disconnect();
    console.log('disconnecting ', req.attachments.connection.socket.user.username);
    // Clear connection
    req.attachments.connection.socket = null;
    req.attachments.connection.chatmessages = [];
  }

  // Remove connection from the connections array
  connections.splice(connections.indexOf(connection), 1);

  res.redirect('/login');
});

module.exports = router;
