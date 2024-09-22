// src/api.js
import axios from 'axios';

// Set up Axios instance with base URL to your backend
const API = axios.create({
  baseURL: 'https://ehorovillage-backend-j2eu.onrender.com', // Update to match your backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
