import store from './store.js';


export default {
    async login(data) {
        try {
            let res = await this.post(store.baseUrl + '/login', data);
            return await res.json();
        }
        catch (ex) {
            console.error(ex);
            return {};
        }
    },

    async logout() {
        if ((await this.post(store.baseUrl + '/logout')).status === 200) {
            store.user = null;
        }
    },

    async loginWithCookie() {
        let res = await this.post(store.baseUrl + '/login/cookie', {});
        let { authorized, user } = await res.json();
        console.log("Authorized: " + authorized + ", User: " + JSON.stringify(user));
        if (authorized) {
            store.user = user;
        }
        return !!authorized;
    },

    async register(registerData) {
        let res = await this.post(store.baseUrl + '/register', registerData);
        let resData = await res.json();
        if (resData.user) {
            store.user = resData.user;
        }
        return {
            user: resData.user ?? null,
            success: resData.success ?? { text: '' },
            errors: resData.errors ?? [],
        }
    },


    async update(newUserData) {
        let res = await this.post(store.baseUrl + '/edit', { user: newUserData });
        let resData = await res.json();
        if (resData.user) {
            store.user = resData.user;
        }
        return {
            user: resData.user,
            success: resData.success ?? "",
            alert: resData.alert ?? "",
            errors: resData.errors ?? [],
        }
    },

    isLoggedIn() {
        return !!store.user;
    },


    async get(url) {
        return await this.fetch(url, 'GET');
    },

    async post(url, data) {
        return await this.fetch(url, 'POST', data);
    },

    async fetch(url, method, data = {}) {
        return await fetch(url, {
            method,
            mode: 'same-origin', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}