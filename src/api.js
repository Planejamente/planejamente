import axios from "axios";

const api = axios.create({
    // use .env baseURL
    baseURL: "https://api.grayfield-6cf3de9d.brazilsouth.azurecontainerapps.io",
});

export default api;