import api from '../api.js';
import store from '../store.js';

export default {
    data() {
        return {
            user: JSON.parse(JSON.stringify(store.user)),
            alert: {
                text: "",
            },
            success: {
                text: "",
            },
            errors: [],
        };
    },

    methods: {
        async save() {
            let { user, success, alert, errors } = await api.update(this.user);
            this.success = success;
            this.alert = alert;
            this.errors = errors;
        },
    },

    template: `          
        <div>  
            <header class="container">
                <h1>Edit Profile</h1>
            </header>
            <main class="container">
                <div class="row">
                    <div class="row">
                        <div class="input-field col s12 m6 xl4">
                            <input id="firstname" name="firstname" type="text" v-model="user.firstname" autocomplete="off">
                            <label for="firstname">Firstname</label>
                        </div>
                        <div class="input-field col s12 m6 xl4">
                            <input id="lastname" name="lastname" type="text" v-model="user.lastname" autocomplete="off">
                            <label for="lastname">Lastname</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 m6 xl4">
                            <input id="gender" name="gender" type="text" v-model="user.gender" autocomplete="off">
                            <label for="gender">Gender</label>
                        </div>
                        <div class="input-field col s12 m6 xl4">
                            <input id="dateOfBirth" name="dateOfBirth" v-model="user.dateOfBirth" type="text" class="datepicker">
                            <label for="dateOfBirth">Date of Birth</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 m4 l3">
                            <router-link to="/home" class="btn purple darken-4">Back</router-link>
                            <button type="button" class="btn purple darken-4" @click="save">Save</button>
                        </div>                            
                        <div v-show="alert" id="alert-msg" class="col s12 m4 l3">
                            <p class="red-text big-text">{{ alert.text }}</p>
                        </div>
                        <div v-show="success" id="success-msg" class="col s12 m4 l3">
                            <div class="purple-text text-darken-4 big-text">{{ success.text }}</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `,
};