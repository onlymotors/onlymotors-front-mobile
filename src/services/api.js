import axios from 'axios';
import { getToken } from './tokenService';
import { API_URL } from 'react-native-dotenv';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  config => {
    return getToken()
      .then(token => {
        config.headers.Authorization = `Bearer ${token}`
        return Promise.resolve(config)
      })
      .catch(error => {
        console.log("Usuário deslogou")
        return Promise.resolve(config)
      })
  },
  error => {
    console.log("Usuário deslogou")
    return Promise.reject(error)
  },
)

export default api;