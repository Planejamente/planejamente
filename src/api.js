import axios from "axios";

const api = axios.create({
    // use .env baseURL
    baseURL: "https://api-61hu.onrender.com",
    // baseURL: "https://664b529d35bbda10987c7584.mockapi.io/api/psicologos/psico-user"
});

export default api;