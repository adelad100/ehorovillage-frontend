// src/api.js
import axios from 'axios';

// Set up Axios instance with base URL to your back-end
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Update to match your back-end server URL
});

export default API;
