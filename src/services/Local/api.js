import axios from 'axios';

const Api = axios.create({baseURL: 'https://6bfebabe7320.ngrok.io/api/v1'});

export default Api;