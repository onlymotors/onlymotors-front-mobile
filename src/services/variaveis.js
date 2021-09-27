import AsyncStorage from '@react-native-async-storage/async-storage'

const variaveis = {
  serverUrl: 'http://192.168.18.5:3333/'
}

export default variaveis;

export async function getToken() {
  try {
    return await AsyncStorage.getItem('token');
  } catch (e) {
    throw e;
  }
}