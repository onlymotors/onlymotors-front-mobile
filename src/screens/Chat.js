import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import api, { API_URL } from '../services/api';
import { List } from 'react-native-paper';
import { getToken } from '../services/tokenService';
import { useIsFocused } from '@react-navigation/core';

const Chat = ({ navigation, route }) => {

  const [chatRooms, setChatRooms] = useState([]);
  const [contadorPagina, setContadorPagina] = useState(20)
  const [numRooms, setNumRooms] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    api(`chatrooms/userid`)
      .then(res => {
        const slice = res.data.slice(0, contadorPagina);
        setNumRooms(res.data.length)
        setContadorPagina(contadorPagina + 10)
        setChatRooms(slice)
      })
      .catch(e => {
        console.log("Erro ao coletar salas de chats")
      })
  }, [isFocused === true])

  const trocarPagina = async () => {
    if (chatRooms.length < numRooms) {
      await api(`chatrooms/userid`)
        .then(r => {
          const slice = r.data.slice(0, contadorPagina);
          setContadorPagina(contadorPagina + 10)
          setChatRooms(slice)
        })
        .catch(e => {
          console.log("Erro ao coletar salas de chats")
        })
    }
  }

  const entrarChatRoom = (id) => {
    let tkn;
    getToken()
      .then(res => {
        tkn = res
        navigation.navigate("Chat Room", {
          chatRoomId: id,
          token: tkn
        })
      })
      .catch(e => {
        console.log("Erro ao coletar o token")
      })
  }

  return (
    <SafeAreaView>
      <FlatList
        data={chatRooms}
        onEndReachedThreshold={1}
        onEndReached={trocarPagina}
        extraData={chatRooms}
        keyExtractor={item => item._id.toString()}
        removeClippedSubviews={true}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitulo}>Chat</Text>
          </View>
        }
        renderItem={({ item }) => (
          item.anuncioId &&
          <List.Item
            onPress={() => { entrarChatRoom(item._id) }}
            left={() =>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: `${(item.anuncioId && item.anuncioId.urlImage) ? item.anuncioId.urlImage : API_URL + "images/sem_foto.png"}`
                }}
              />
            }
            title={<View style={styles.descricao}><Text style={styles.titulo}>{item.nomeChatRoom}</Text></View>}
            description={
              <>
                <Text style={styles.textoDescricaoHeader}>{(item.mensagens.length) ? item.mensagens[0].nomeUser + " - " + item.mensagens[0].mensagemData + "\n" : ""}</Text>
                <Text style={styles.textoDescricao}>{(item.mensagens.length) ? item.mensagens[0].mensagem : ""}</Text>
              </>
            }
            descriptionNumberOfLines={5}
          />
        )}
      />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 100,
    height: 100,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "600"
  },
  header: {
    padding: 15,
    alignSelf: "center"
  },
  headerTitulo: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700"
  },
  descricao: {
    paddingBottom: 15
  },
  textoDescricaoHeader: {
    fontSize: 12,
    fontWeight: "bold"
  },
  textoDescricao: {
    fontSize: 12,
  }
})


export default Chat;