import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.94.250.110:3333',
});

export default api;