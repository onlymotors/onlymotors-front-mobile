import axios from 'axios';
import variaveis, { getToken } from './variaveis';
import AsyncStorage from '@react-native-async-storage/async-storage'


const token = getToken()

// const token = localStorage.getItem("token");
// const token = AsyncStorage.getItem("token");

const api = axios.create({
  baseURL: variaveis.serverUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}`,
  }
});

// const api = axios.create({
//   baseURL: variaveis.serverUrl
// })

api.interceptors.request.use(
  config => {
    return getToken()
      .then(token => {
        config.headers.Authorization = `Bearer ${token}`
        return Promise.resolve(config)
      })
      .catch(error => {
        console.log(error)
        return Promise.resolve(config)
      })
  },
  error => {
    return Promise.reject(error)
  },
)

export default api;