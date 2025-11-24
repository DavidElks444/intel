// client/src/api/axiosConfig.js
import axios from 'axios';

// 1. Create a re-usable axios instance
// This file will automatically attach user's email as a header to every single API call.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
});

// 2. Create an "interceptor"
// This function runs *before* every single request is sent
api.interceptors.request.use(config => {
  // 3. Get the user email from localStorage
  const userEmail = localStorage.getItem('currentUserEmail');
  
  if (userEmail) {
    // 4. Attach it to the 'X-User-Email' header
    config.headers['X-User-Email'] = userEmail;
  }
  return config;
},
error => {
  return Promise.reject(error);
});

export default api;