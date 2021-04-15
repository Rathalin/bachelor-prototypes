const io = require('socket.io-client');


const MSG_TYPE = Object.freeze({
  NONE: 0,
  LOGIN: 1,
  LOGOUT: 2,
  CHATMESSAGE: 3,
  SERVERMESSAGE: 4,
});


/**
 * 
 * @param {Object} req request object
 * @param {String} serverUrl 
 */
function connect(connection, serverUrl) {
  const socket = io(serverUrl);

  connection.socket = socket;

  socket.messages = connection.chatmessages;
  socket.user = connection.user;

  socket.on(MSG_TYPE.LOGIN, recieveLogin);
  socket.on(MSG_TYPE.LOGOUT, recieveLogout);
  socket.on(MSG_TYPE.CHATMESSAGE, recieveChatMessage);
  socket.on(MSG_TYPE.SERVERMESSAGE, recieveServerMessage);

  return socket;
}


function sendMessage(socket, { username, text }) {
  socket.emit(MSG_TYPE.CHATMESSAGE, { username, text });
}


function recieveLogin(login) {
  this.messages.push({ text: `${login.username} joined the chat.`, systemmessage: true });

}


function recieveLogout(logout) {
  this.messages.push({ text: `${logout.username} left the chat.`, systemmessage: true });
}


function recieveChatMessage({ username, text }) {
  this.messages.push({ username, text });
}


function recieveServerMessage({ text }) {
  this.messages.push({ text, systemmessage: true });
}



function connectToChat(req, res, next) {
  // Test for connection to chat
  const { connection, connections } = req.attachments;
  const { user } = connection;

  if (connection.socket == null) {
    // Connect to chat
    console.log(`Connecting ${user.username}:${user._id}`);
    const socket = connect(connection, `http://${process.env.CHAT_IP ?? 'localhost'}:${process.env.CHAT_PORT ?? 9123}`);
    socket.on('connect', () => {
      socket.emit(MSG_TYPE.LOGIN, { username: user.username });
      socket.messages.push({ text: `${user.username} joined the chat!`, systemmessage: true });
    });
  }

  next();
}


module.exports = { connect, sendMessage, MSG_TYPE, connectToChat };