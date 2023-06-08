import {createStore} from 'vuex';
import axiosClient from '../axios';

const store = createStore({
    state: {
        user: {
            name: localStorage.getItem('user')  ,
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            token: localStorage.getItem('token'),
        },
    },
    getters: {},
    actions: {
        register({commit}, user) {
            return axiosClient.post('/register', user)
            .then(response => {
                commit('setUser', response.data);
                return response;
            });
        },

        login({commit}, user) {
            return axiosClient.post('/login', user)
            .then(response => {
                commit('setUser', response.data);
                return response;
            });
        },
    },
    mutations: {
        logout: state => {
            state.user.data = {};
            state.user.token = null;
            localStorage.removeItem('token');
        },

        setUser: (state, user) => {
            state.user.name = user.data.user.name;
            state.user.token = user.data.token;
            localStorage.setItem('user', state.user.name);
            localStorage.setItem('token', state.user.token);
            console.log(user.data.user.name);   
        }
    },
    modules: {}

});

export default store;