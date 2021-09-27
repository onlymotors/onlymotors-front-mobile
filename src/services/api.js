import axios from 'axios';
import variaveis from './variaveis';
import AsyncStorage from '@react-native-async-storage/async-storage'

const token = localStorage.getItem("token");
// const token = AsyncStorage.getItem("token");

const api = axios.create({
  baseURL: variaveis.serverUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
});

// const api = axios.create({
//   baseURL: variaveis.serverUrl
// })


export default api;