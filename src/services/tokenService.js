// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

export async function getToken() {
  try {
    // return await AsyncStorage.getItem('token');
    return await SecureStore.getItemAsync('token');
  } catch (e) {
  }
}

export async function setToken(value) {
  try {
    // return await AsyncStorage.setItem('token', value)
    return await SecureStore.setItemAsync('token', value)
  } catch (e) {
  }
}

export async function clearToken() {
  try {
    // return await AsyncStorage.clear()
    return await SecureStore.deleteItemAsync('token')
  } catch (e) {
  }
}