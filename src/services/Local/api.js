import axios from 'axios';

const Api = axios.create({baseURL: 'https://277150943cec.ngrok.io/api/v1'});

export default Api;