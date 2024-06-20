import axios from "axios";

const api = axios.create({
baseURL: "http://localhost:8080",
    // baseURL: "https://api.grayfield-6cf3de9d.brazilsouth.azurecontainerapps.io",
    // baseURL: "https://664b529d35bbda10987c7584.mockapi.io/api/psicologos/psico-user"

});

export default api;