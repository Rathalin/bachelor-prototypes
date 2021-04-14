import api from "../api.js";

export default {
    data() {
        return {
            username: "",
            password: "",
            success: {
                text: "",
            },
            errors: [],
        };
    },

    methods: {
        async register() {
            let { success, errors } = await api.register({ username: this.username, password: this.password });
            this.success = success;
            this.errors = errors;
        },

        async goToHome() {
            await api.loginWithCookie();
            this.$router.push('/');
        },
    },

    template: `
        <div>
            <header class="container">
                <div class="row">
                    <div class="col">
                        <h1>Register</h1>
                    </div>
                </div>
            </header>
            <main v-if="!success.text">
                <div class="container">                
                    <div v-for="error in errors" class="row">
                        <div class="col s12">
                            <span class="red-text">{{ error.text }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <div class="row">
                                <div class="input-field col s12 m6 xl4">
                                    <input id="username" name="username" v-model="username" type="text" class="validate" autocomplete="off" autofocus required>
                                    <label for="username">Username</label>
                                </div>
                                <div class="input-field col s12 m6 xl4">
                                    <input id="password" name="password" v-model="password" type="password" class="validate" autocomplete="off" required>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">
                                    <button type="button" class="btn purple darken-4" @click="register">Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p>Already have an account?</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <router-link to="/login" class="btn purple darken-4">Login</router-link>
                        </div>
                    </div>
                </div>
            </main>
            <main v-else>
                <div class="container">
                    <div v-show="success.text" class="row">
                        <div class="col s12">
                            <p class="green-text">{{ success.text }}</p>
                        </div>
                        <div class="col s12">
                            <button class="btn purple darken-4" @click="goToHome()">Home</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `,
}