import api from "./ApiService";
import { jwtDecode } from 'jwt-decode';

export const TOKEN_KEY: string = 'TOKEN_API';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    
    const response = api.post("/auth/roles", {"login": jwtDecode(getToken())["sub"]})
    .then((res) => localStorage.setItem("roles", res.data))
    .catch((err) => console.log(err))
};

export const logout = () => localStorage.removeItem(TOKEN_KEY);

export const getRoles = () => localStorage.getItem("roles")