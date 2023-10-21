import axios from 'axios';

const baseUrl =
    process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3333';

const API = axios.create({
    baseURL: baseUrl,
});

export default API;
