import axios from "axios";

const api = axios.create({
    // use .env baseURL
    baseURL: "https://api-61hu.onrender.com",
});

export default api;