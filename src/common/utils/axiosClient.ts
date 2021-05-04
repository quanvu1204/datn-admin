import axios from 'axios';

import { storage, storageKey } from './storage';

export const baseURL = process.env.REACT_APP_API_ENDPOINT;

export const AxiosClient = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

AxiosClient.interceptors.request.use(
    async (config) => {
        let token = null;
        try {
            token = storage.getToken(storageKey.TOKEN);
        } catch (e) {
            console.log('Token Invalid', e);
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

AxiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        throw Error(error);
    },
);
