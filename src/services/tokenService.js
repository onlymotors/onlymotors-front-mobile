import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getToken() {
  try {
    return await AsyncStorage.getItem('token');
  } catch (e) {
  }
}

export async function setToken(value) {
  try {
    return await AsyncStorage.setItem('token', value)
  } catch (e) {
  }
}

export async function clearToken() {
  try {
    return await AsyncStorage.clear()
  } catch (e) {
  }
}