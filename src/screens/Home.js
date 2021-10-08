import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { List } from 'react-native-paper';
import api from '../services/api';
import Alerta from '../components/Alerta';
import { API_URL } from 'react-native-dotenv';

const Home = ({ route, navigation }) => {

  const [anuncios, setAnuncios] = useState();
  const [contadorPagina, setContadorPagina] = useState(20)
  const [numAnuncios, setNumAnuncios] = useState();
  const isFocused = useIsFocused();
  const { mensagem } = route.params;
  const { visibilidade } = route.params;
  const [visible, setVisible] = useState(visibilidade);

  useEffect(() => {
    setVisible(visibilidade)
    api('anuncios')
      .then(res => {
        const slice = res.data.anuncio.slice(0, contadorPagina);
        setNumAnuncios(res.data.anuncio.length)
        setContadorPagina(contadorPagina + 10)
        setAnuncios(slice)
      })
      .catch(e => {
        console.log("Erro ao coletar anuncios")
      })
  }, [isFocused])


  const trocarPagina = async () => {
    if (anuncios.length < numAnuncios) {
      await api("anuncios")
        .then(r => {
          const slice = r.data.anuncio.slice(0, contadorPagina);
          setContadorPagina(contadorPagina + 10)
          setAnuncios(slice)
        })
        .catch(e => {
          console.log("Erro ao coletar anuncios")
        })
    }
  }

  const resetParams = () => {
    navigation.setParams({
      mensagem:
        route.params.mensagem = "",
      visibilidade:
        route.params.visibilidade = false
    })
  }

  const reset = () => {
    setVisible(false);
    resetParams()
  }

  return (
    <SafeAreaView>
      <Alerta mensagem={mensagem} visible={visible} reset={reset} navigation={navigation} />
      <FlatList
        data={anuncios}
        onEndReachedThreshold={1}
        onEndReached={trocarPagina}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitulo}>Novos e Usados</Text>
            <Text style={styles.headerSubTitulo}>{numAnuncios} anúncios encontrados</Text>
          </View>
        }
        keyExtractor={item => item._id.toString()}
        removeClippedSubviews={true}
        renderItem={({ item }) => (
          <List.Item
            title={
              <Text style={styles.listTitulo}>
                {item.veiculoMarca} {item.descricaoVeiculo}
              </Text>
            }
            description={
              <View>
                <Text>{item.anoModelo}</Text>
                <Text style={styles.listPreco}>{item.veiculoValor}</Text>
              </View>
            }
            descriptionNumberOfLines={2}
            onPress={() => {
              resetParams()
              navigation.navigate('Anúncio', {
                itemId: item._id,
              });
            }}
            left={() =>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: `${(item.urlImage) ? item.urlImage : API_URL + "images/sem_foto.png"}`
                }}
              />
            }
          />
        )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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
  headerSubTitulo: {
    textAlign: "center"
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },
  listTitulo: {
    fontSize: 18,
  },
  listPreco: {
    color: "black",
    paddingTop: 15,
    fontSize: 22,
  }
});

export default Home;