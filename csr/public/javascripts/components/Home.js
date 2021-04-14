import api from '../api.js';
import store from '../store.js';
import ChatComponent from './Chat.js';


export default {
    data() {
        return {
            user: store.user,
            alerts: [],
            errors: [],
        };
    },

    methods: {
        async logout() {
            this.$refs.chatComponent.logout();
            await api.logout();
            this.$router.push('/login');
        },
    },

    components: {
        'chat': ChatComponent,
    },

    template: `
        <main class="container">
            <div class="row">
                <div id="profile" class="col">
                    <div id="alerts" class="row">
                        <div v-for="alert in alerts">
                            <h5>{{ alert.text }}</h5>
                        </div>
                    </div>
                    <div class="row">
                        <h1>
                            <span id="data-username" class="col s12 m6">{{ user.username }}</span>
                            <div class="col s12 m3">
                                <router-link to="/edit" class="btn purple darken-4">Edit Profile</router-link>
                            </div>
                            <div class="col s12 m3 right">
                                <button type="button" class="btn purple darken-4" @click="logout()">Logout</button>
                            </div>
                        </h1>
                    </div>
                    <div class="row">
                        <div class="col s12 m12">
                            <!--<div class="card">
                                <div class="card-image">
                                    <img id="profile-img" :src="user.imgUrl">
                                </div>    
                            </div>-->
                            <span>{{ user.firstname }}</span>
                            <span>{{ user.lastname }}</span>
                        </div>
                        <div class="col s12">{{ user.gender }}</div>
                        <div class="col s12">{{ user.dateOfBirth }}</div>
                    </div>
                </div>
            </div>   
            <chat v-bind:username="user.username" ref="chatComponent"></chat>       
        </main>
    `,
};