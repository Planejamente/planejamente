import axios from "axios";

const api = axios.create({
// baseURL: "http://localhost:8080",
    baseURL: process.env.REACT_APP_BASE_URL,
});

export default api;
