// Components
import component_home from './components/Home.js';
import component_edit from './components/Edit.js';
import component_login from './components/Login.js';
import component_register from './components/Register.js';
import component_registered from './components/Registered.js';
import api from './api.js';


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
        path: '/registered',
        name: 'registered',
        component: component_registered,
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
        if (!api.validateToken()) {
            next({ name: 'login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

const routingapp = new Vue({
    router,
    mounted() {
        M.AutoInit();

        M.Datepicker.init(document.querySelectorAll('.datepicker'), {
            autoClose: false,
            format: 'dd. mmm yyyy',
            defaultDate: new Date(2000, 1, 1),
            minDate: new Date(1900, 1, 1),
            maxDate: new Date(),
        });
    },
}).$mount('#app');


export { routingapp };