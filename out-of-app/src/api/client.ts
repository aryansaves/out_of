import axios from "axios"
import { API_URL } from "../config/env"
import { getToken } from "../auth/tokenStore"

export const api = axios.create({
    baseURL: API_URL,
    timeout: 15000
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if(token){
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
    } return config
})