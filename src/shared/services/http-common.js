import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * @fileoverview HTTP client configuration using axios
 * @module http
 */

/**
 * Configured axios instance for making HTTP requests
 * @const {import('axios').AxiosInstance}
 * @description Creates a pre-configured axios instance with base URL and default headers
 * @property {string} baseURL - The base URL for all requests from environment variable
 * @property {Object} headers - Default headers for all requests
 * @property {string} headers.Content-Type - Sets JSON as the default content type
 * @property {string} headers.Access-Control-Allow-Origin - CORS header to allow all origins
 */

export const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

/* http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        /* const isAuthRoute = config.url.includes("/Authorization/sign-in") || config.url.includes("/Authorization/sign-up");

        if (token && !isAuthRoute*) {
            config.headers.Authorization = `Bearer ${token}`;
        }


        return config;
    },
    (error) => Promise.reject(error)

);*/
