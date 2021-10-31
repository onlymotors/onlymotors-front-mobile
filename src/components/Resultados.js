import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import api, { API_URL } from '../services/api';
import numeral from '../services/formatador';

const Resultados = (props) => {

  const trocarPagina = async () => {
    // console(anuncios.length)
    if (props.anuncios.length < props.numAnuncios) {
      await api("anuncios")
        .then(r => {
          const slice = r.data.anuncio.slice(0, props.contadorPagina);
          props.setContadorPagina(props.contadorPagina + 10)
          props.setAnuncios(slice)
        })
        .catch(e => {
          console.log("Erro ao coletar anuncios")
        })
    }
  }

  return (
    // <SafeAreaView>
    <FlatList
      // style={{ marginBottom: 30 }}
      // contentContainerStyle={{paddingBottom:20}}
      data={props.anuncios}
      onEndReachedThreshold={1}
      onEndReached={trocarPagina}
      ListHeaderComponent={props.isHeader &&
        <View style={styles.header}>
          <Text style={styles.headerTitulo}>Novos e Usados</Text>
          <Text style={styles.headerSubTitulo}>{props.numAnuncios} anúncios encontrados</Text>
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
              <Text style={styles.listPreco}>
                {
                  "R$ " + numeral(item.veiculoValor).format()
                }
              </Text>
            </View>
          }
          descriptionNumberOfLines={2}
          onPress={() => {
            props.navigation.navigate('Anúncio', {
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
    // </SafeAreaView>
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
    // height: 100,
  },
  logo: {
    width: 66,
    // height: 58,
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

export default Resultados;