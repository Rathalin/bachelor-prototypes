export default {
    template:
    `<div id="chat-app" class="row">
    <header class="container hide-on-med-and-down">
      <h5 id="profile-bar">
        <div v-if="isJoined" class="">
          <span>{{ user.username }}</span>
          <input type="button" value="Leave" class="btn purple darken-4" @click="logoutBtnClick">
        </div>
      </h5>
    </header>

    <div id="offset-navbar-top" class="hide-on-large-only"></div>

    <div id="app-body" v-bind:class="{ container: !isMobile }">
      <main>
        <div>
          <div>
            <div>
              <div v-bind:class="{ container: isMobile }">
                <div class="row">
                  <div class="col xl4 offset-xl4 l6 offset-l3 m8 offset-m2 s12">
                    <div v-if="!isJoined" id="login">
                      <div class="row">
                        <input id="login-input" type="button" value="Join" class="btn purple darken-4 col"
                          @click="loginBtnClick">
                        <div v-if="connecting" class="col">
                          <div id="login-loading" class="sk-chase">
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
              <div v-if="isJoined" id="chat" class="col s12 l8 offset-l2">
                <div id="chat-messages">
                  <ul class="collection">
                    <li v-for="msg in messages" class="collection-item chat-msg-group">
                      <div v-if="msg.isSysMsg">
                        <span class="sys-msg-text" v-bind:class="systemMessageTextcolor">{{ msg.text}}</span>
                      </div>
                      <div v-if="msg.isUserUpdateMsg">
                        <span v-bind:class="systemMessageTextcolor">{{ msg.textBefore }}</span>
                        <span v-bind:class="systemMessageTextcolor" class="bold">{{ msg.username }}</span>
                        <span v-bind:class="systemMessageTextcolor">{{ msg.textAfter }}</span>
                      </div>
                      <div v-if="!msg.isSysMsg && !msg.isUserUpdateMsg">
                        <span class="purple-text text-darken-4 chat-msg-username">{{ msg.username }}</span>
                        <span class="blue-text chat-msg-date">{{ msg.date | time }}</span>
                        <br>
                        <span class="black-text chat-msg-text" v-bind:class="msg.style.textcolor">{{ msg.text }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div id="offset-input-bottom"></div>

    <div v-if="isJoined" id="chat-input-group" class="background-purple z-depth-1">
      <div class="row" v-bind:class="{ mobile: isMobile }">
        <input data-emoji="true" type="text" name="chat-input" id="chat-input" class="col s10 m11 white-text"
          autocomplete="off" v-model="textmessage" maxlength="500" @keyup="chatinputKeyUp" autofocus>
        <button id="send-button" value="Send" class="col s2 m1 btn white" @click="sendBtnClick">
          <i class="material-icons purple-text text-darken-4">send</i>
        </button>
      </div>
    </div>
  </div>`,
  
}