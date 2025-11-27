import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

export function setAuth(token) {
  API.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
}

export default API;
