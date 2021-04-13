import store from './store.js';

export default {
    async login() {
        store.user = {
            username: "Petrosilius",
            firstname: "Petrosilius",
            lastname: "Zwackelmann",
            gender: "Male",
            dateOfBirth: "Today",
        };
    },

    async logout() {
        store.user = null;
    },

    validateToken() {
        return store.user != null;
    },
}