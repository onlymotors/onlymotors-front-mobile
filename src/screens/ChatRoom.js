import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/core';
import io from 'socket.io-client';
import api from '../services/api';
import { getToken, clearToken } from '../services/tokenService';
import {
  initiateSocket, disconnectSocket,
  subscribeToChat, sendMessage
} from '../services/chatService';


const ChatRoom = ({ navigation, route }) => {

  const isFocused = useIsFocused();

  // const rooms = ['A', 'B', 'C'];
  const [room, setRoom] = useState(route.params.chatRoomId);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  let dados = {
    room: room,
    nomeUser: nome,
    emailUser: email,
    mensagem: message
  }



  useEffect(() => {
    if (room) initiateSocket(room);
    subscribeToChat((err, data) => {
      if (err) return;
      console.log(data)
      setChat(oldChats => [...oldChats, data])
    });
    return () => {
      disconnectSocket();
    }
  }, [room]);

  useEffect(() => {

    let chatRoom
    api.get(`chatrooms/${route.params.chatRoomId}`)
      .then(res => {
        // chatRoom = res.data
        let lista = res.data.chatRoom.mensagens
        console.log(res.data.chatRoom.mensagens)
        console.log(res.data.emailUser)
        setChat(lista)
        setEmail(res.data.emailUser)
        setNome(res.data.nomeUser)
        // setChat([])
        console.log(route.params.chatRoomId);
        setRoom(route.params.chatRoomId)
      })
      .catch(e => {
        console.log("Erro ao coletar chatRoom pelo seu id")
      })

  }, [isFocused])


  const salvarMensagem = async (dados) => {
    await api.post(`chatrooms/${room}`, dados)
      .then(r => {
        console.log(r.data)
      })
      .catch(e => {
        console.log(e.message)
      })
  }
  return (
    <View>
      {chat.map(chatMessage =>
        (email === chatMessage.emailUser)
          ?
          <Text key={chatMessage._id} style={{ textAlign: "right" }}>{chatMessage.nomeUser}: {chatMessage.mensagem} : {chatMessage.mensagemData}</Text>
          :
          <Text key={chatMessage._id} style={{ textAlign: "left" }}>{chatMessage.nomeUser}: {chatMessage.mensagem} : {chatMessage.mensagemData}</Text>
      )}
      <TextInput
        label="Message"
        mode="outlined"
        keyboardType="default"
        value={message}
        onChangeText={e => setMessage(e)}
      />
      <Button
        mode="contained" color="#FF7D04"
        style={styles.botao}
        labelStyle={{ color: "white" }} onPress={() => {
          dados.mensagemData = new Date().toLocaleString();
          salvarMensagem(dados);
          sendMessage(dados);
        }}
      >
        Enviar
      </Button>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainerTop: {
    margin: 8,
    marginTop: 100
  },
  inputContainer: {
    margin: 8
  },
  texto: {
    marginTop: 46,
    alignSelf: "center"
  },
  botao: {
    marginTop: 16,
    marginBottom: 16,
    alignSelf: "center"
  },
})


export default ChatRoom;