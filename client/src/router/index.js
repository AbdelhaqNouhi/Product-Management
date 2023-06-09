import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import store from '../store/index.js'
import Products from '../views/Products.vue'
import Dashboard from '../views/Dashboard.vue'
import UpdateProduct from '../components/UpdateProduct.vue'
import AddProduct from '../components/AddProduct.vue'

const routes = [
    {
        path: '/',
        redirect: '/Products',
        name: 'Products',
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '/Products', name: 'Products', component: Products },
            {path: '/Dashboard', name: 'Dashboard', component: Dashboard },
            
        ]
    },
    { path: '/UpdateProduct', name: 'UpdateProduct', component: UpdateProduct },
    { path: '/AddProduct', name: 'AddProduct', component: AddProduct },
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