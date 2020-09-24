import axios from 'axios';

const Api = axios.create({baseURL: 'https://66ecce188f1f.ngrok.io/api/v1'});

export default Api;