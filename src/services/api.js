import axios from 'axios';

const Api = axios.create({baseURL: 'https://41ea37aefd71.ngrok.io/api/v1'});

export default Api;