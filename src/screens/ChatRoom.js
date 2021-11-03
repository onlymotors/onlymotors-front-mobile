import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, Image } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/core';
import api, { API_URL } from '../services/api';
import {
  initiateSocket, disconnectSocket,
  subscribeToChat, sendMessage
} from '../services/chatService';
import { geradorRandomico } from '../services/geradores';
import { getToken } from '../services/tokenService';

const ChatRoom = ({ navigation, route }) => {

  const [isLoading, setIsLoading] = useState(true)
  const scrollViewRef = useRef();
  const isFocused = useIsFocused();
  const [room, setRoom] = useState(route.params.chatRoomId);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  // const [nomeAnunciante, setNomeAnunciante] = useState("");
  const [anuncioId, setAnuncioId] = useState("");
  const [nomeChatRoom, setNomeChatRoom] = useState("");
  const [anuncioImg, setAnuncioImg] = useState("");

  let dados = {
    room: room,
    nomeUser: nome,
    emailUser: email,
    mensagem: message
  }

  useEffect(() => {
    if (room) initiateSocket(room, route.params.token);
    subscribeToChat((err, data) => {
      if (err) return;
      console.log(data)
      data._id = geradorRandomico(15)
      setChat(oldChats => [...oldChats, data])
    });
    return () => {
      disconnectSocket();
    }
  }, [room]);

  useEffect(() => {
    api.get(`chatrooms/${route.params.chatRoomId}`)
      .then(res => {
        let lista = res.data.chatRoom.mensagens
        setChat(lista)
        setEmail(res.data.emailUser)
        setNome(res.data.nomeUser.split(" ")[0])
        // setNomeAnunciante(res.data.nomeAnunciante.split(" ")[0])
        setAnuncioId(res.data.chatRoom.anuncioId._id)
        setNomeChatRoom(res.data.chatRoom.nomeChatRoom)
        setAnuncioImg(res.data.chatRoom.anuncioId.urlImage)
        setRoom(route.params.chatRoomId)
      })
      .catch(e => {
        console.log("Erro ao coletar chatRoom pelo seu id")
      })
  }, [])

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading])

  const salvarMensagem = async (dados) => {
    try {
      await api.post(`chatrooms/${room}`, dados)
    } catch (e) {
      console.log("Erro ao salvar mensagens no banco")
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.containerIsLoading}>
        <ActivityIndicator animating={true} size="large" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userHeader}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `${(anuncioImg) ? anuncioImg : API_URL + "images/sem_foto.png"}`
          }}
        />
        <Text style={styles.titulo}>{nomeChatRoom}</Text>
        <IconButton
          icon="chevron-right"
          color="#FF7D04"
          size={28}
          style={{ padding: 0 }}
          onPress={() => {
            navigation.navigate('Anúncio', {
              itemId: anuncioId,
            });
          }}
        />
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {chat.map((chatMessage, index) =>
          (email === chatMessage.emailUser)
            ?
            <View key={chatMessage._id} style={styles.row}>
              <Text style={styles.messageBoxRight}>
                {chatMessage.mensagem} {"\n"}{"\n"}
                <Text style={{ fontSize: 11, textAlign: "right" }}>
                  {chatMessage.mensagemData}
                </Text>
              </Text>
            </View>
            :
            <View key={chatMessage._id}>
              <View style={styles.rowUser}>
                <View style={styles.messageBoxLeft}>
                  <Text style={{ fontSize: 11, color: "white" }}>
                    {chatMessage.nomeUser}
                  </Text>
                </View>
              </View>
              <View style={styles.rowTexto}>
                <View style={styles.messageBoxLeftMess}>
                  <Text style={{ fontSize: 18 }}>
                    {chatMessage.mensagem}
                  </Text>
                  <Text style={{ fontSize: 11, paddingTop: 15 }}>
                    {chatMessage.mensagemData}
                  </Text>
                </View>
              </View>
            </View>
        )}
      </ScrollView>
      <View style={styles.rowInput}>
        <TextInput
          placeholder="Digite uma mensagem..."
          value={message}
          onChangeText={e => setMessage(e)}
          style={styles.texto}
          onSubmitEditing={() => {
            dados.mensagemData = new Date();
            dados.mensagemData = dados.mensagemData.toLocaleDateString() + " " + dados.mensagemData.toLocaleTimeString()

            salvarMensagem(dados);
            sendMessage(dados);
            setMessage("");
          }}
        />
        <IconButton
          icon="check"
          color="#FF7D04"
          size={28}
          onPress={() => {
            dados.mensagemData = new Date();
            dados.mensagemData = dados.mensagemData.toLocaleDateString() + " " + dados.mensagemData.toLocaleTimeString()

            salvarMensagem(dados);
            sendMessage(dados);
            setMessage("");
          }}
        />
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#d3d3d3'
  },
  containerIsLoading: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center",
    // alignSelf: "center"
  },
  inputContainerTop: {
    margin: 8,
    marginTop: 100
  },
  inputContainer: {
    margin: 8
  },
  titulo: {
    fontSize: 18,
    fontWeight: "600",
    // textAlign: "center",
    textAlignVertical: "center",
    padding: 6
  },
  row: {
    // flex: 1,
    flexDirection: "row",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowUser: {
    // flex: 1,
    flexDirection: "row",
    padding: 10,
    paddingLeft: 0,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowTexto: {
    // flex: 1,
    flexDirection: "row",
    padding: 10,
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowInput: {
    // flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  },
  texto: {
    width: "85%",
    // flex: 1,
    // height: 30,
    // borderColor: 'black',
    // borderWidth: 1,
    fontSize: 18,
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  botao: {
    marginTop: 10,
  },
  messageBoxRight: {
    backgroundColor: "#FF7D04",
    color: "white",
    textAlign: 'left',
    marginBottom: 5,
    marginLeft: 'auto',
    padding: 10,
    fontSize: 18,
    // borderColor: 'black',
    // borderWidth: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  messageBoxLeft: {
    backgroundColor: '#1b9382',
    textAlign: 'left',
    // marginBottom: 5,
    marginRight: 'auto',
    padding: 10,
    // borderColor: 'black',
    // borderWidth: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    fontSize: 18,
  },
  messageBoxLeftMess: {
    backgroundColor: '#fff',
    textAlign: 'left',
    marginBottom: 5,
    marginRight: 'auto',
    padding: 10,
    // borderColor: 'black',
    // borderWidth: 1,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    fontSize: 18,
  },
  userHeader: {
    textAlignVertical: "center",
    // height: 50,
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    backgroundColor: '#fff',
    justifyContent: "center",
    flexDirection: "row",
    // borderColor: 'black',
    // borderWidth: 1,
    elevation: 4
  },
  tinyLogo: {
    width: 54,
    height: 54,
  },
  descricao: {
    paddingBottom: 15
  },
})


export default ChatRoom;