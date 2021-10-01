import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import api from '../services/api';
import { Button, DataTable } from 'react-native-paper';
import variaveis from '../services/variaveis';

const Anuncio = ({ route, navigation }) => {

  const { itemId } = route.params;
  const [anuncio, setAnuncio] = useState({
    anoFabricacao: 0,
    anoModelo: 0,
    descricaoVeiculo: "",
    nomeFabricante: "",
    veiculoMarca: "",
    veiculoValor: "",
  });

  useEffect(() => {
    api(`anuncios/${itemId}`)
      .then(res => {
        setAnuncio(res.data[0])
      })
  }, [navigation, itemId])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          style={styles.img}
          source={{
            uri: variaveis.serverUrl + "images/sem_foto.png"
          }}
        />
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
        <Button mode="contained" color="#FF7D04" labelStyle={{ color: "white" }} style={styles.botao}>Mensagem</Button>
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