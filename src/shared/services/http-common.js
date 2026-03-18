import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("BASE URL:", API_BASE_URL);

export const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("auth_token");

        const isAuthRoute =
            config.url?.includes("/authentication/sign-in") ||
            config.url?.includes("/authentication/sign-up");

        if (token && !isAuthRoute) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);