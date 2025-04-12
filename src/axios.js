import axios from 'axios';

const api = axios.create({
    baseURL: 'https://personal-contact-book-server.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;