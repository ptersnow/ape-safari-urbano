import axios from 'axios'

export const api = axios.create({
    baseURL: "http://10.9.1.181:3333"
})