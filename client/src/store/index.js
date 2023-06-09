import {createStore} from 'vuex';
import axiosClient from '../axios';

// const product = [
//     {
//         id: 2,
//         name: 'Product 2',
//         price: 200,
//         image: 'https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
//         type: 'type 2',
//     },
//     {
//         id: 2,
//         name: 'Product 2',
//         price: 200,
//         image: 'https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
//         type: 'type 2',
//     },
//     {
//         id: 2,
//         name: 'Product 2',
//         price: 200,
//         image: 'https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
//         type: 'type 2',
//     },
//     {
//         id: 2,
//         name: 'Product 2',
//         price: 200,
//         image: 'https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
//         type: 'type 2',
//     },
//     {
//         id: 2,
//         name: 'Product 2',
//         price: 200,
//         image: 'https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
//         type: 'type 2',
//     },
//     {
//         id: 2,
//         name: 'Product 2',
//         price: 200,
//         image: 'https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
//         type: 'type 2',
//     },
// ]

const store = createStore({
    state: {
        user: {
            name: localStorage.getItem('user')  ,
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            token: localStorage.getItem('token'),
        },
        product: {
            data: [],
            links: [],
            loading: false,
        }
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

        getProduct({ commit}, {url = null} = {}) {
            url = url || '/product';
            commit('DataLoading', true);
            return axiosClient.get(url)
                .then(response => {
                    commit('DataLoading', false);
                    commit('getProduct', response.data);
                    return response;
                });
            },

        AddProduct({ commit }, product) {
            return axiosClient.post('/product', product)
                .then(response => {
                    commit('AddProduct', response.data);
                    return response;
                });
        },

        UpdateProduct({ commit }, { id, product }) {
            return axiosClient.put(`/product/${id}`, product)
                .then(response => {
                    commit('UpdateProduct', response.data.data);
                    return response;
                });
        },

        deleteProduct({ commit }, id) {
            return axiosClient.delete(`/product/${id}`)
            .then(response => {
                commit('deleteProduct', response.data.data);
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
        },

        getProduct: (state, product) => {
            state.product.data = product.data;
            state.product.links = product.meta.links;
        },

        AddProduct: (state, product) => {
            state.product.data = product.data;
        },

        UpdateProduct: (state, product) => {
            state.product.data = product;
        },

        deleteProduct: (state, product) => {
            state.product.data = product;
        },

        DataLoading: (state, loading) => {
            state.product.loading = loading;
        },
    },
    modules: {}

});

export default store;