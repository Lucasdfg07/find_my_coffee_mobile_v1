import axios from 'axios';

const Api = axios.create({baseURL: 'https://75f660c9f8dc.ngrok.io/api/v1'});

export default Api;