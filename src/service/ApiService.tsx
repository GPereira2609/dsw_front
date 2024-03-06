import axios from "axios";
import { getToken } from './AuthService';

const api = axios.create({
    baseURL: "http://localhost:8080"
})

api.interceptors.request.use(async config => {
    const token: string | null = getToken();

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default api;