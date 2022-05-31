import axios from 'axios';

const api = axios.create({
    baseURL: 'https://test-api.atom6studio.com',
});

export default api;