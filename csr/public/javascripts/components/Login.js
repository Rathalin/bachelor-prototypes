import api from '../api.js';
import store from '../store.js';


export default {
    data() {
        return {
            username: null,
            password: null,
            errors: [],
        };
    },

    methods: {
        async login() {
            if (this.username && this.password) {
                let { user, errors } = await api.login({ username: this.username, password: this.password });
                store.user = user;
                this.errors = errors;
                this.user = user;
                if (this.user) {
                    this.$router.push('/home');
                }
            }
        },

        async logout() {
            //await api.logout();
        },

        async handleInputEnterKeyUp(event) {
            if(event.keyCode === 13) {
                event.preventDefault();
                await this.login();
            }
        }
    },

    template: `
        <div>
            <header class="container">
                <div class="row">
                    <div class="col">
                        <h1>Login</h1>
                    </div>
                </div>
            </header>
            <main>
                <div class="container">
                    <div v-for="error in errors" class="row">
                        <div class="col s12">
                            <span class="red-text">{{ error.text }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <div class="input-field col s12 m6 xl4">
                                    <input v-model="username" id="username" name="username" type="text" 
                                        class="validate" autocomplete="off" @keyup="handleInputEnterKeyUp" autofocus required>
                                    <label for="username">Username</label>
                                </div>
                                <div class="input-field col s12 m6 xl4">
                                    <input v-model="password" id="password" name="password" type="password" 
                                        class="validate" @keyup="handleInputEnterKeyUp" autocomplete="off" required>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">
                                    <button type="button" class="btn purple darken-4" @click="login">Login</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="row">
                        <div class="col">
                            <p>No account yet?</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <router-link to="/register" class="btn purple darken-4">Register</router-link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `,
};