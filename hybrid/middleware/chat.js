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
function connect({ chat, user }, serverUrl) {
  const socket = io(serverUrl);

  chat.socket = socket;

  socket.messages = chat.chatmessages;
  socket.user = user;

  socket.on(MSG_TYPE.LOGIN, recieveLogin);
  socket.on(MSG_TYPE.LOGOUT, recieveLogout);
  socket.on(MSG_TYPE.CHATMESSAGE, recieveChatMessage);
  socket.on(MSG_TYPE.SERVERMESSAGE, recieveServerMessage);

  return socket;
}


function disconnect(chat) {

}


function sendMessage(chat) {

}


function recieveLogin(login) {
  console.log(this.username, '/', this.user._id, ' recieved login');
  this.messages.push({ text: `${login.username} joined the chat.` });

}


function recieveLogout(logout) {
  this.messages.push({ text: `${logout.username} left the chat.` });
}


function recieveChatMessage() {

}


function recieveServerMessage() {

}



function connectToChat(req, res, next) {
  // Test for connection to chat
  const { user, chat } = req;
  let { socket } = req.chat;
  console.log(req.chat);
  if (socket == null) {
    // Connect to chat
    console.log(`Connecting ${user.username}:${user._id}`);
    socket = connect(req, 'http://localhost:9123');
    socket.on('connect', () => {
      socket.emit(MSG_TYPE.LOGIN, { username: user.username });
      socket.messages.push({ text: `${socket.username} joined the chat!` });
    });
  }

  next();
}


module.exports = { connect, disconnect, sendMessage, MSG_TYPE, connectToChat };