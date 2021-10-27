import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import api from '../services/api';
import { Button, DataTable } from 'react-native-paper';
import { API_URL } from 'react-native-dotenv';
import { getChatRooms } from '../services/chatService';
import { getToken } from '../services/tokenService';

const Anuncio = ({ route, navigation }) => {


  const { itemId } = route.params;
  const [anuncio, setAnuncio] = useState({
    anoFabricacao: 0,
    anoModelo: 0,
    descricaoVeiculo: "",
    nomeFabricante: "",
    veiculoMarca: "",
    veiculoValor: "",
    urlImage: ""
  });

  useEffect(() => {


    api(`anuncios/${itemId}`)
      .then(res => {
        setAnuncio(res.data[0])
        api.patch(`anuncios/${itemId}/numvisitas`, { contagem: res.data[0].numVisitas + 1 })
      })
      .catch(e => {
        console.log("Erro ao coletar anúncio pelo seu id")
      })
  }, [navigation, itemId])

  const visualizar = () => {
    navigation.navigate("Visualizador", {
      imagem: anuncio.urlImage
    })
  }





  const criarChatRoom = async () => {

    let tkn;
    getToken()
      .then(res => {
        tkn = res

      })
      .catch(e => {
        console.log("Erro ao coletar o token")
      })

    try {
      let res = await api.get(`chatrooms/userid`)
      let lista = res.data
      let found = lista.find(item => (item.anuncioId._id === itemId))
      if (found) {
        navigation.navigate("Chat Room", {
          chatRoomId: found._id,
          token: tkn
        })
      } else {
        let dados = {
          anuncioId: itemId,
          nomeChatRoom: `${anuncio.veiculoMarca} ${anuncio.descricaoVeiculo} - ${anuncio.anoModelo}`
        }
        let chatRoom = await api.post(`chatrooms`, dados)
        console.log(chatRoom)
        console.log(tkn)
        navigation.navigate("Chat Room", {
          chatRoomId: chatRoom.chatRoomId,
          token: tkn
        })
        // api.post(`chatrooms`, dados)
        //   .then(res => {
        //     navigation.navigate("Chat Room", {
        //       chatRoomId: res.data.chatRoomId,
        //       token: tkn
        //     })
        //   })
        //   .catch(e => {
        //     console.log(e.response.data)
        //   })
      }
    } catch (e) {
      return console.log("O usuário não está logado")
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={() => { visualizar() }}>
          <Image
            style={styles.img}
            source={{
              uri: `${(anuncio.urlImage) ? anuncio.urlImage : API_URL + "images/sem_foto.png"}`
            }}
          />
        </TouchableOpacity>
        <Text style={styles.textSecao}>Informações do anúncio</Text>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Nome do fabricante</Text>
            <Text style={styles.text}>{anuncio.nomeFabricante}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Marca</Text>
            <Text style={styles.text}>{anuncio.veiculoMarca}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Modelo</Text>
            <Text style={styles.text}>{anuncio.descricaoVeiculo}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Ano de fabricação</Text>
            <Text style={styles.text}>{anuncio.anoFabricacao}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Ano do Modelo</Text>
            <Text style={styles.text}>{anuncio.anoModelo}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Valor do veículo</Text>
            <Text style={styles.text}>{anuncio.veiculoValor}</Text>
          </View>
        </DataTable.Row>
        <Text style={styles.textSecao}>Contatar anunciante:</Text>
        <Button
          mode="contained"
          color="#FF7D04"
          labelStyle={{ color: "white" }}
          style={styles.botao}
          onPress={() => criarChatRoom()}
        >
          Mensagem
        </Button>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: "100%",
    height: 320
  },
  textSecao: {
    fontSize: 20,
    fontWeight: "500",
    padding: 16
  },
  textDetalhe: {
    color: "grey"
  },
  text: {
    marginLeft: 15,
    fontSize: 16,
  },
  botao: {
    marginLeft: 16,
    marginBottom: 16,
    alignSelf: "flex-start"
  }
});

export default Anuncio;