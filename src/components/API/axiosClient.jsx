// api/axiosClient.js
import axios from 'axios';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const token = JSON.parse(localStorage.getItem('token'));

const axiosClient = axios.create({
    baseURL: 'https://backend-asm3-kappa.vercel.app',
    // baseURL: 'http://localhost:5000',
    headers: {
        'content-type': 'application/json',
        'content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
    },
    // withCredentials: true,
});
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    // const token = localStorage.getItem('token');
    // config.headers.common['Authorization'] = 'Bearer ' + token;
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    }
);
export default axiosClient;
