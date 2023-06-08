import {createStore} from 'vuex';
import axiosClient from '../axios';

const store = createStore({
    state: {
        user: {
            data: {
                    name: ''                //     email: 'tom@example.com',
                //     imageUrl:
                //         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            token: localStorage.getItem('token') != null,
        },
    },
    getters: {},
    actions: {
        register({commit}, user) {
            return axiosClient.post('/register', user)
            .then(data => {
                commit('setUser', data);
                return data;
            });
        },

        login({commit}, user) {
            return axiosClient.post('/login', user)
            .then(data => {
                commit('setUser', data);
                return data;
            });
        }
    },
    mutations: {
        logout: state => {
            state.user.data = {};
            state.user.token = null;
            localStorage.removeItem('token');
        },

        setUser: (state, user) => {
            // console.log('state', state);
            state.user.data = user.data;
            state.user.token = user.data.token;
            localStorage.setItem('token', state.user.token);
        }
    },
    modules: {}
});

export default store;