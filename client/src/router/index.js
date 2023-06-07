import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import store from '../store/index.js'
import Products from '../views/Products.vue'

const routes = [
    {
        path: '/',
        redirect: '/Products',
        name: 'Products',
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '/Products', name: 'Products', component: Products, },
        ]
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name: 'Login'})
    }else if(store.state.user.token && (to.name === 'Login' || to.name === 'Register')){
        next({ name: 'Products'})
    } else {
        next()
    }
})

export default router