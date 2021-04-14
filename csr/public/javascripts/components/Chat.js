/**
 * @author Daniel Flockert
 */
export default {
    props: {
        username: String,
    },

    data() {
        return {
            textmessage: "",
            messages: [],
            usernameErrorText: "",
            loginErrorText: "",
            maxUsernameLength: 20,
            connecting: false,
            isJoined: false,
            isActive: true,
            isMobile: false,

            systemMessageTextcolor: "purple-text text-darken-4",
        };
    },

    methods: {

        // checks if a string variable is empty 
        empty(val) {
            return !val || val.trim() == "";
        },

        sendBtnClick() {
            if (this.textmessage.trim() != '') {
                this.sendChatMessage();
            }
            Vue.nextTick(this.focusChatInput);
        },

        loginBtnClick() {
            if (this.username && this.username.trim() != '') {
                let username = this.username.trim();
                // check username length
                if (username.length > this.maxUsernameLength) {
                    this.loginErrorText = `Max. ${this.maxUsernameLength} Characters`;
                } else {
                    this.connect();
                }
            }
        },

        joinKeyUp(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                this.loginBtnClick();
            }
        },


        logoutBtnClick() {
            this.logout();
        },

        chatinputKeyUp(event) {
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
        addMessageToChat(msg) {
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
        createTextMessage(text, username, textcolor = 'black-text', date = new Date()) {
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
        createSysMessage(text, textcolor = "red-text", date = new Date()) {
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
        createUserUpdateMessage(textBefore = "", username, textAfter = "") {
            return { textBefore, username, textAfter, isUserUpdateMsg: true }
        },

        /**
         * focuses on the chat input field after some time
         * @param {number} milliseconds after which time the focus happens 
         */
        focusChatInput() {
            /*
            setTimeout(() => {
                document.getElementById("chat-input").focus();
            }, milliseconds);
            */
            document.getElementById("chat-input").focus();
        },

        connect() {
            this.connecting = true;
            // check if server script is available
            let socketIoScript = document.createElement("script");
            socketIoScript.src = this.SERVER_SOCKET_IO_URL;
            document.head.append(socketIoScript);
            // onerror event
            socketIoScript.onerror = (event) => {
                this.connecting = false;
                console.error("Could not connect to server");
                this.loginErrorText = "Could not connect to server";
            };
            // onload event
            socketIoScript.onload = () => {
                this.connecting = false;
                // create socket
                this.socket = io.connect(this.SERVER_URL);
                // socket connect event
                this.socket.on("connect", () => {
                    this.connecting = false;
                    this.login();
                });
                // socket error connect event
                this.socket.on("connect_error", (err) => {
                    this.connecting = false;
                    console.error("Server connection error");
                    this.isJoined = false;
                    this.username = "";
                    this.loginErrorText = "Server connection error";
                });
                // disconnect event
                this.socket.on("disconnect", () => {
                    this.isJoined = false;
                    this.messages = [];
                });
                // all message events
                this.socket.on(this.TYPE.LOGIN, this.recieveLogin);
                this.socket.on(this.TYPE.LOGOUT, this.recieveLogout);
                this.socket.on(this.TYPE.CHATMESSAGE, this.recieveChatMessage);
                this.socket.on(this.TYPE.SERVERMESSAGE, this.recieveServerMessage);
            };
        },

        login() {
            this.username = this.username.trim().substring(0, this.maxUsernameLength);
            this.socket.emit(this.TYPE.LOGIN, {
                username: this.username,
            });
            this.isJoined = true;
            this.addMessageToChat(this.createUserUpdateMessage("", "You", " joined the chat!"));
        },

        sendChatMessage() {
            this.socket.emit(this.TYPE.CHATMESSAGE, {
                text: this.textmessage,
            });
            this.addMessageToChat(this.createTextMessage(this.textmessage.trim(), this.username));
            this.textmessage = "";
        },

        sendChatMessage() {
            this.socket.emit(this.TYPE.CHATMESSAGE, {
                text: this.textmessage,
            });
            this.addMessageToChat(this.createTextMessage(this.textmessage.trim(), this.username));
            this.textmessage = "";
        },

        logout() {
            this.socket.emit(this.TYPE.LOGOUT, {});
            this.username = "";
            this.isJoined = false;
            this.loginErrorText = "";
            this.messages = [];
        },

        recieveLogin(login) {
            this.addMessageToChat(this.createUserUpdateMessage(``, login.username, ` joined the chat!`));
        },

        recieveLogout(logout) {
            this.addMessageToChat(this.createUserUpdateMessage(``, logout.username, `left the chat!`));
        },

        recieveChatMessage(chatMsg) {
            this.addMessageToChat(this.createTextMessage(chatMsg.text, chatMsg.username));
        },

        recieveServerMessage(serverMsg) {
            this.addMessageToChat(this.createSysMessage(serverMsg.text));
        },
    },

    beforeCreate() {
        /**
        * ACTION TYPES 
        * actions that should be executed when data arrives
        */
        this.TYPE = Object.freeze({
            NONE: 0,
            LOGIN: 1,
            LOGOUT: 2,
            CHATMESSAGE: 3,
            SERVERMESSAGE: 4,
        });
        //const SERVER_URL = "http://localhost:9992";
        this.SERVER_PROTOCOL = "http://";
        this.SERVER_IP = "localhost";
        //const SERVER_IP = "localhost";
        this.SERVER_PORT = "9123";
        this.SERVER_URL = `${this.SERVER_PROTOCOL}${this.SERVER_IP}:${this.SERVER_PORT}`
        this.SERVER_SOCKET_IO_URL = `${this.SERVER_URL}/socket.io/socket.io.js`;
    },

    mounted() {
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

        if (!this.empty(this.username)) {
            this.connect();
        }
    },

    filters: {
        time(date) {
            let hours = date.getHours();
            let hourLeadingZero = hours > 9 ? "" : "0";
            let minutes = date.getMinutes();
            let minuteLeadingZero = minutes > 9 ? "" : "0";
            return `${hourLeadingZero}${hours}:${minuteLeadingZero}${minutes}`;
        }
    },

    template:
        `
    <div id="chat-app" class="row">
      <div id="chat-app-body">
        <div>
          <div v-bind:class="{ container: isMobile }">
            <div class="row">
              <div class="col xl4 offset-xl4 l6 offset-l3 m8 offset-m2 s12">
                <div v-if="!isJoined" id="chat-login">
                  <div class="row">
                    <div v-if="connecting" class="col">
                      <div id="chat-login-loading" class="sk-chase">
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="isJoined" id="chat" class="col s12">
            <div id="chat-messages">
              <ul class="collection">
                <li v-for="msg in messages" class="collection-item chat-msg-group">
                  <div v-if="msg.isSysMsg">
                    <span class="sys-msg-text" v-bind:class="systemMessageTextcolor">{{ msg.text}}</span>
                  </div>
                  <div v-if="msg.isUserUpdateMsg">
                    <span v-bind:class="systemMessageTextcolor">{{ msg.textBefore }}</span>
                    <span v-bind:class="systemMessageTextcolor" class="bold">{{ msg.username
                      }}</span>
                    <span v-bind:class="systemMessageTextcolor">{{ msg.textAfter }}</span>
                  </div>
                  <div v-if="!msg.isSysMsg && !msg.isUserUpdateMsg">
                    <span class="purple-text text-darken-4 chat-msg-username">{{ msg.username
                      }}</span>
                    <span class="blue-text chat-msg-date">{{ msg.date | time }}</span>
                    <br>
                    <span class="black-text chat-msg-text" v-bind:class="msg.style.textcolor">{{
                      msg.text }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="offset-input-bottom"></div>

      <div v-if="isJoined" id="chat-input-group" class="background-purple z-depth-1">
        <div class="row" v-bind:class="{ mobile: isMobile }">
          <input data-emoji="true" type="text" name="chat-input" id="chat-input" class="col s10 m11 white-text"
            autocomplete="off" v-model="textmessage" maxlength="500" @keyup="chatinputKeyUp" autofocus>
          <button id="chat-send-button" value="Send" class="col s2 m1 btn white" @click="sendBtnClick">
            <i class="material-icons purple-text text-darken-4">send</i>
          </button>
        </div>
      </div>
    </div>
    `,

}