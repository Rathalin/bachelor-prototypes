// Components
import component_home from './components/Home.js';
import component_edit from './components/Edit.js';
import component_login from './components/Login.js';
import component_register from './components/Register.js';
import api from './api.js';
import store from './store.js';


const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: component_home,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/edit',
        name: 'edit',
        component: component_edit,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: component_register,
    },
    {
        path: '/login',
        name: 'login',
        component: component_login,
    },
    {
        path: '/test',
        name: 'test',
        component: {
            template: '<div>Test Component</div>'
        }
    },
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!api.isLoggedIn()) {
            next({ name: 'login' });
        } else {
            next();
        }
    } else if (api.isLoggedIn()) {
        next({ name: 'home' });
    } else {
        next();
    }
});

const routingapp = new Vue({
    router,

    methods: {
        loadItemprops() {
            // Load connection data from meta elements
            let itempropElements = document.querySelectorAll('meta[itemprop]');
            for (let itemprop of itempropElements) {
                let itempropName = itemprop.getAttribute('itemprop');
                let itempropContent = itemprop.getAttribute('content');
                console.log(`${itempropName}: ${itempropContent}`);
                store[itempropName] = itempropContent;
            }
        },
    },

    async mounted() {
        M.AutoInit();

        M.Datepicker.init(document.querySelectorAll('.datepicker'), {
            autoClose: false,
            format: 'dd. mmm yyyy',
            defaultDate: new Date(2000, 1, 1),
            minDate: new Date(1900, 1, 1),
            maxDate: new Date(),
        });

        this.loadItemprops();

        if (await api.loginWithCookie()) {
            this.$router.push('/home');
        }
    },


}).$mount('#app');


export { routingapp };