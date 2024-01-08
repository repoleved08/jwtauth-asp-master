import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://fxauth2024.azurewebsites.net/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
// BaseURL 2 

const apiClient2 = axios.create({
    baseURL: 'https://fxbundle2024.azurewebsites.net/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
  });
  const token = localStorage.getItem('token');

apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});


export {apiClient, apiClient2};


//07
