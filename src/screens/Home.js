import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Banner, List } from 'react-native-paper';
import api from '../services/api';
import variaveis from '../services/variaveis';
import Alerta from '../components/Alerta';

const Home = ({ route, navigation }) => {

  const [anuncios, setAnuncios] = useState();
  const [contadorPagina, setContadorPagina] = useState(20)
  const [numAnuncios, setNumAnuncios] = useState();
  const isFocused = useIsFocused();
  // const [innerMensagem, setInnerMensagem] = useState();
  // const [visible, setVisible] = React.useState();
  const { mensagem } = route.params;
  const { visibilidade } = route.params;

  useEffect(() => {
    // console.log(mensagem, visibilidade)
    // setInnerMensagem(mensagem)
    // setVisible(visibilidade)
    api('anuncios')
      .then(res => {
        const slice = res.data.anuncio.slice(0, contadorPagina);
        console.log(res.data)
        setNumAnuncios(res.data.anuncio.length)
        setContadorPagina(contadorPagina + 10)
        setAnuncios(slice)
      })
  // }, [isFocused, mensagem, visibilidade])
  }, [isFocused])


  const trocarPagina = async () => {
    await api("anuncios")
      .then(r => {
        const slice = r.data.anuncio.slice(0, contadorPagina);
        setContadorPagina(contadorPagina + 10)
        setAnuncios(slice)
      })
  }

  return (
    <SafeAreaView>
      <Alerta mensagem={mensagem} visibilidade={visibilidade}/>
      {/* <Banner
        visible={visible}
        actions={[
          {
            label: 'Aceitar',
            onPress: () => setVisible(false),
          }
        ]}
      >
        {innerMensagem}
      </Banner> */}
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
            title={<Text style={styles.listTitulo}>{item.veiculoMarca} {item.descricaoVeiculo}</Text>}
            description={
              <View>
                <Text>{item.anoModelo}</Text>
                <Text style={styles.listPreco}>{item.veiculoValor}</Text>
              </View>
            }
            descriptionNumberOfLines={2}
            onPress={() => {
              navigation.navigate('Anúncio', {
                itemId: item._id,
              });
            }}
            left={() =>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: variaveis.serverUrl + "images/sem_foto.png"
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