"use strict";
/**
 * @author Daniel Flockert
 */


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

const chatapp = new Vue({
    el: "#chat-app",

    data: {
        textmessage: "",
        messages: [],
        username: "",
        usernameErrorText: "",
        loginErrorText: "",
        maxUsernameLength: 20,
        connecting: false,
        isJoined: false,
        isActive: true,
        isMobile: false,

        systemMessageTextcolor: "purple-text text-darken-4",
    },

    methods: {

        // checks if a string variable is empty 
        empty: function (val) {
            return !val || val.trim() == "";
        },

        sendBtnClick: function () {
            if (this.textmessage.trim() != '') {
                sendChatMessage();
            }
            Vue.nextTick(this.focusChatInput);
        },

        loginBtnClick: function () {
            if (this.username && this.username.trim() != '') {
                let username = this.username.trim();
                // check username length
                if (username.length > this.maxUsernameLength) {
                    this.loginErrorText = `Max. ${this.maxUsernameLength} Characters`;
                } else {
                    connect();
                }
            }
        },

        joinKeyUp: function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                this.loginBtnClick();
            }
        },


        logoutBtnClick: function () {
            logout();
        },

        chatinputKeyUp: function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                this.sendBtnClick();
            } else {
                Vue.nextTick(() => {
                    document.getElementById("chat-input").focus();
                });
            }
        },

        /**
         * adds the message to the chat and scrolls down
         * @param {object} msg message object 
         */
        addMessageToChat: function (msg) {
            this.messages.push(msg);
            // automaticall scroll down; has do be delayed
            // so it happens after vuejs updated the chat message list
            Vue.nextTick(() => {
                let elChatList = document.getElementById("offset-input-bottom");
                //elChatList.scrollTop = elChatList.scrollHeight - elChatList.clientHeight;
                elChatList.scrollIntoView(true);
                //alert(`body.scrollHeight: ${body.scrollHeight}, body.scrollTop: ${body.scrollTop}`);
            });
        },

        /**
         * creates a message object for standard text messages
         * @param {String} text text of the message
         * @param {String} username username
         * @param {Date} date date
         * @param {String} textcolor textcolor css class 
         * @param {Boolean} isSysMsg if the message is displayed as a system message
         */
        createTextMessage: function (text, username, textcolor = 'black-text', date = new Date()) {
            return {
                text: text,
                username: username,
                date: date,
                isSysMsg: false,
                style: {
                    textcolor: textcolor,
                },
            };
        },

        /**
         * creates a message object for system messages
         * @param {string} text text of message
         * @param {string} textcolor textcolor css class 
         * @param {date} date date
         */
        createSysMessage: function (text, textcolor = "red-text", date = new Date()) {
            return {
                text: text,
                date: date,
                isSysMsg: true,
                style: {
                    textcolor: textcolor,
                },
            }
        },

        /**
         * creates a message object for user update messages like join and leave
         * @param {string} textBefore text before username
         * @param {string} username username displayed in bold
         * @param {bool} textAfter text after username
         */
        createUserUpdateMessage: function (textBefore = "", username, textAfter = "") {
            return { textBefore, username, textAfter, isUserUpdateMsg: true }
        },

        /**
         * focuses on the chat input field after some time
         * @param {number} milliseconds after which time the focus happens 
         */
        focusChatInput: function () {
            /*
            setTimeout(() => {
                document.getElementById("chat-input").focus();
            }, milliseconds);
            */
            document.getElementById("chat-input").focus();
        },

    },


    mounted: function () {
        M.AutoInit();

        M.Datepicker.init(document.querySelectorAll('.datepicker'), {
            autoClose: false,
            format: 'dd. mmm yyyy',
            defaultDate: new Date(2000, 1, 1),
            minDate: new Date(1900, 1, 1),
            maxDate: new Date(),
        });

        // window width trigger for mobile
        let mobileTrigger = "600";
        // define media query handler
        let queryHandlerMobile = function (x) {
            if (x.matches) {
                console.log(`Screensize smaller than ${mobileTrigger}px`);
                this.isMobile = true;
            } else {
                console.log(`Screensize bigger than ${mobileTrigger}px`);
                this.isMobile = false;
            }
        }.bind(this);
        // disable container on mobile
        window.matchMedia(`(max-width: ${mobileTrigger}px)`).addListener(queryHandlerMobile);
        // trigger once at beginning
        queryHandlerMobile(window.matchMedia(`(max-width: ${mobileTrigger}px)`));
    },

    filters: {
        time: function (date) {
            let hours = date.getHours();
            let hourLeadingZero = hours > 9 ? "" : "0";
            let minutes = date.getMinutes();
            let minuteLeadingZero = minutes > 9 ? "" : "0";
            return `${hourLeadingZero}${hours}:${minuteLeadingZero}${minutes}`;
        }
    },

});

// FUNCTIONS

function connect() {
    chatapp.connecting = true;
    // check if server script is available
    let socketIoScript = document.createElement("script");
    socketIoScript.src = `${chatapp.CHAT_URL}/socket.io/socket.io.js`;
    document.head.append(socketIoScript);
    // onerror event
    socketIoScript.onerror = function (event) {
        chatapp.connecting = false;
        console.error("Could not connect to server");
        chatapp.loginErrorText = "Could not connect to server";
    };
    // onload event
    socketIoScript.onload = function () {
        chatapp.connecting = false;
        // create socket
        chatapp.socket = io.connect(chatapp.CHAT_URL);
        // socket connect event
        chatapp.socket.on("connect", function () {
            chatapp.connecting = false;
            login();
        });
        // socket error connect event
        chatapp.socket.on("connect_error", function (err) {
            chatapp.connecting = false;
            console.error("Server connection error");
            chatapp.isJoined = false;
            chatapp.loginErrorText = "Server connection error";
        });
        // disconnect event
        chatapp.socket.on("disconnect", function () {
            chatapp.isJoined = false;
            chatapp.messages = [];
        });
        // all message events
        chatapp.socket.on(TYPE.LOGIN, recieveLogin);
        chatapp.socket.on(TYPE.LOGOUT, recieveLogout);
        chatapp.socket.on(TYPE.CHATMESSAGE, recieveChatMessage);
        chatapp.socket.on(TYPE.SERVERMESSAGE, recieveServerMessage);
    };
}

function login() {
    chatapp.username = chatapp.username.trim().substring(0, chatapp.maxUsernameLength);
    chatapp.socket.emit(TYPE.LOGIN, {
        username: chatapp.username,
    });
    chatapp.isJoined = true;
    chatapp.addMessageToChat(chatapp.createUserUpdateMessage("", "You", " joined the chat!"));
}

function sendChatMessage() {
    chatapp.socket.emit(TYPE.CHATMESSAGE, {
        text: chatapp.textmessage,
    });
    chatapp.addMessageToChat(chatapp.createTextMessage(chatapp.textmessage.trim(), chatapp.username));
    chatapp.textmessage = "";
}

function logout() {
    chatapp.socket.emit(TYPE.LOGOUT, {});
    chatapp.isJoined = false;
    chatapp.loginErrorText = "";
    chatapp.messages = [];
}

function recieveLogin(login) {
    chatapp.addMessageToChat(chatapp.createUserUpdateMessage(``, login.username, ` joined the chat!`));
}

function recieveLogout(logout) {
    chatapp.addMessageToChat(chatapp.createUserUpdateMessage(``, logout.username, `left the chat!`));
}

function recieveChatMessage(chatMsg) {
    chatapp.addMessageToChat(chatapp.createTextMessage(chatMsg.text, chatMsg.username));
}

function recieveServerMessage(serverMsg) {
    chatapp.addMessageToChat(chatapp.createSysMessage(serverMsg.text));
}

export { chatapp };