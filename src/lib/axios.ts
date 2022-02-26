import axios from 'axios';

const STORE_API = axios.create({
    baseURL: 'https://fakestoreapi.com'
});

export default STORE_API;
