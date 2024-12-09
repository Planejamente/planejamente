import api from "../client/api";

export const Login = async (email, sub) => {
    const response = await api.post('/auth/login', {
        email,
        sub
    })

    return response
}