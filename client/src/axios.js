import axios from 'axios';
import store from './store'; 

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },

});

axiosClient.interceptors.request.use(function (config) {
    const token = store.state.user.token;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default axiosClient;
