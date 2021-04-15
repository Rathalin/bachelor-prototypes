"use strict";
/*
* Chatserver
* Daniel Flockert
*/

// IMPORTS ------------------------------------------------------------------------------------------------------------

const io = require("socket.io");
// load command line arguments
const argv = require("./modules/yargs");
// create logger with loglevel (trace, debug, info, warn or error)
const log = require("./modules/logger")(argv.loglevel);

const dotenv = require('dotenv');
dotenv.config();
const config = require('./config/serverConnections');


// CONSTANTS ----------------------------------------------------------------------------------------------------------

/**
 * ACTION TYPES 
 * actions that should be executed when data arrives
 */
const TYPE = Object.freeze({
    NONE: 0,
    LOGIN: 1,
    LOGOUT: 2,
    CHATMESSAGE: 3,
    SERVERMESSAGE: 4,
});


// VARIABLES ----------------------------------------------------------------------------------------------------------

let clients = [];


// FUNCTIONS ----------------------------------------------------------------------------------------------------------

function recieveLogin(login) {
    this.credentials.username = login.username;
    // emit login to all other clients
    this.broadcast.emit(TYPE.LOGIN, {
        username: login.username,
    });
    //this.emit(TYPE.LOGIN, { username: login.username });
    log.info(`[Login] Client joined as ${this.credentials.username}`);
}


function recieveLogout(logout) {
    log.info(`[Logout] Client ${this.credentials.username} left`);
    // disconnect client
    this.disconnect();
}

function recieveChatMessage(chatMsg) {
    // send textmessage to all other clients
    this.broadcast.emit(TYPE.CHATMESSAGE, {
        username: this.credentials.username,
        text: chatMsg.text,
    });
    // log message to console
    log.trace(`[Text] ${this.credentials.username}: "${chatMsg.text}"`);
}


// MAIN --------------------------------------------------------------------------------------------------------------

(function main() {
    const ioserver = io.listen(config.CHAT_PORT);
    log.info(`[Start] ${config.SERVER_NAME} listening on port ${config.CHAT_PORT}`);

    ioserver.sockets.on("connection", function (socket) {
        // add socket to clients array  
        socket.credentials = { username: "" };
        clients.push(socket);
        log.info(`[Connect] Client connected. Total: ${clients.length}`);

        // send server greeter message
        socket.emit(TYPE.SERVERMESSAGE, { 
            text: `Welcome to ${config.SERVER_NAME}!`,
        });
        
        
        log.info(`[Servermessage] Greeting message.`);
        
        
        // all event handlers
        socket.on(TYPE.LOGIN, recieveLogin);
        socket.on(TYPE.LOGOUT, recieveLogout);
        socket.on(TYPE.CHATMESSAGE, recieveChatMessage);
        socket.on("disconnect", function () {
            // emit logout to other clients
            socket.broadcast.emit(TYPE.LOGOUT, {
                username: socket.credentials.username,
            });
            clients.splice(clients.indexOf(socket), 1);
            log.info(`[Disconnect] Client disconnected. Total: ${clients.length}`);
        });
    });
})();

