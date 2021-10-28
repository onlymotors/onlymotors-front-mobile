import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import api, { API_URL } from '../services/api';
import Alerta from '../components/Alerta';
import { Button, TextInput, List } from 'react-native-paper';
import { setToken } from '../services/tokenService';
import { useIsFocused } from '@react-navigation/core';

const Chat = ({ navigation, route }) => {

  const [chatRooms, setChatRooms] = useState([]);
  const [contadorPagina, setContadorPagina] = useState(20)
  const [numRooms, setNumRooms] = useState();

  const isFocused = useIsFocused();

  useEffect(() => {
    api(`chatrooms/userid`)
      .then(res => {
        const slice = res.data.slice(0, contadorPagina);
        setNumRooms(res.data.length)
        setContadorPagina(contadorPagina + 10)
        setChatRooms(slice)
        console.log(slice)
      })
      .catch(e => {
        console.log("Erro ao coletar salas de chats")
      })
  }, [isFocused])

  const trocarPagina = async () => {
    if (chatRooms.length < numRooms) {
      await api(`chatrooms/userid`)
        .then(r => {
          const slice = r.data.slice(0, contadorPagina);
          setContadorPagina(contadorPagina + 10)
          setChatRooms(slice)
          console.log(slice)
        })
        .catch(e => {
          console.log("Erro ao coletar salas de chats")
        })
    }
  }

  return (
    <SafeAreaView>
      {/* {chatRooms.map(item =>
        <View key={item._id}>

          <Text>{(item.anuncioId.urlImage) ? item.anuncioId.urlImage : API_URL + "images/sem_foto.png"}</Text>
          <Text>{item.nomeChatRoom}</Text>
          <Text>{(item.mensagens.length) ? item.mensagens[0].mensagem + " - " + item.mensagens[0].mensagemData : ""}</Text>
        </View>
      )} */}

      <FlatList
        data={chatRooms}
        onEndReachedThreshold={1}
        onEndReached={trocarPagina}
        extraData={chatRooms}
        keyExtractor={item => item._id.toString()}
        removeClippedSubviews={true}
        // ListHeaderComponent={}
        renderItem={({ item }) => (
          <List.Item
            left={() =>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: `${(item.anuncioId.urlImage) ? item.anuncioId.urlImage : API_URL + "images/sem_foto.png"}`
                }}
              />
            }
            // right={ }
            title={<Text>{item.nomeChatRoom}</Text>}
            description={<Text>{(item.mensagens.length) ? item.mensagens[0].mensagem + " - " + item.mensagens[0].mensagemData : ""}</Text>}
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
})


export default Chat;