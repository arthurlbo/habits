import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.15.22:3333',
});
