import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const baseConfig: AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
};

export const publicApi: AxiosInstance = axios.create(baseConfig);
export const authApi: AxiosInstance = axios.create(baseConfig);

authApi.interceptors.request.use((config) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || null;

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);
