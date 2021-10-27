import io from 'socket.io-client';
import { getToken } from './tokenService';
import { API_URL } from 'react-native-dotenv';

let socket;
let token;
getToken()
  .then(res => {
    token = res
  })
  .catch(e => {

  })
console.log(token)

export const initiateSocket = (room) => {

  socket = io(`${API_URL}chat`, {
    extraHeaders: { "Authorization": `Bearer ${token}` },
    // transports: ['websocket'],
    jsonp: false
  });
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit('join', room);
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
}

export const subscribeToChat = (cb) => {
  if (!socket) return (true);
  socket.on('chat', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}

export const sendMessage = (dados) => {
  if (socket) socket.emit('chat', dados);
}