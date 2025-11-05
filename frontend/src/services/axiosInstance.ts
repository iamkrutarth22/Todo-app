import axios from "axios";
import type { IAuth } from "../models/Auth";
import store from "../store/store";

const API_URL =import.meta.env.VITE_API_URL;


const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    console.log(API_URL)
     const state = store.getState();
    const token = (state.auth as IAuth)?.accessToken;

    // List of endpoints that don't need token
    const publicEndpoints = ['/login', '/signup'];

    const url = config.url || '';
    const isPublic = publicEndpoints.some((endpoint) =>
      url.includes(endpoint)
    );

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

// Response Interceptor (optional: handle 401, refresh token, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: dispatch logout
      // store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default api;