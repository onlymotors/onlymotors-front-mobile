import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Badge, Button, Chip, Divider, List, Menu, Provider, Snackbar } from 'react-native-paper';
import Alerta from '../components/Alerta';
import MenuContexto from '../components/MenuContexto';
import api from '../services/api';
import variaveis from '../services/variaveis';
import * as DocumentPicker from 'expo-document-picker';
import ProgressoUpload from '../components/ProgressoUpload';

const PainelAnuncios = ({ navigation, route }) => {

  const [renderizar, setRenderizar] = useState(0);
  const [anuncios, setAnuncios] = useState();
  const [contadorPagina, setContadorPagina] = useState(20)
  const [numAnuncios, setNumAnuncios] = useState();
  const isFocused = useIsFocused();

  const { mensagem } = route.params;
  const { visibilidade } = route.params;
  const [visible, setVisible] = useState(visibilidade);

  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState()
  const [status, setStatus] = useState("")
  const [type, setType] = useState("")
  const [apiUrl, setApiUrl] = useState("")

  useEffect(() => {
    setIsLoading(false)
  }, [isFocused])

  const inserirFoto = async (item) => {
    await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false
    })
      .then(file => {
        setFile(file)
        setStatus("Enviando foto...")
        setType("image/jpeg")
        setApiUrl(`anuncios/${item._id}`)
      })
      .finally(() => {
        setIsLoading(true)
        setRenderizar(renderizar + 1)
      })
  }

  useEffect(() => {
    setIsLoading(false)
    api('anuncios/userid')
      .then(res => {
        const slice = res.data.anuncio.slice(0, contadorPagina);
        setNumAnuncios(res.data.anuncio.length)
        setContadorPagina(contadorPagina + 10)
        setAnuncios(slice)
      })
  }, [isFocused])

  useEffect(() => {
    api('anuncios/userid')
      .then(res => {
        const slice = res.data.anuncio.slice(0, contadorPagina);
        setNumAnuncios(res.data.anuncio.length)
        setContadorPagina(30)
        setAnuncios(slice)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [renderizar])


  const trocarPagina = async () => {
    await api("anuncios/userid")
      .then(r => {
        const slice = r.data.anuncio.slice(0, contadorPagina);
        setContadorPagina(contadorPagina + 10)
        setAnuncios(slice)
      })
  }

  const onDismissSnackBar = () => setVisible(false);

  if (isLoading) {
    return (
      <ProgressoUpload
        navigation={navigation}
        route={route}
        requestName="image"
        httpMethod="patch"
        file={file}
        status={status}
        type={type}
        apiUrl={apiUrl}
      />
    )
  }

  return (
    <SafeAreaView>
      <Snackbar
        visible={visible}
        duration={3000}
        onDismiss={onDismissSnackBar}
      >
        {mensagem}
      </Snackbar>
      {/* <Alerta mensagem={mensagem} visible={visible} setVisible={setVisible} /> */}
      <FlatList
        data={anuncios}
        onEndReachedThreshold={1}
        onEndReached={trocarPagina}
        extraData={anuncios}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitulo}>{numAnuncios} anúncios encontrados</Text>
            <View style={styles.direcao}>
              <Button
                mode="contained"
                color="#FF7D04"
                labelStyle={{ color: "white", fontSize: 12 }}
                onPress={() => { navigation.navigate("Inserir Anúncio") }}
                style={styles.botao}
              >
                Inserir Anúncio
              </Button>
              <Button
                mode="contained"
                color="#FF7D04"
                labelStyle={{ color: "white", fontSize: 12 }}
                onPress={() => { }}
                style={styles.botao}
              >
                Gerar Relatório
              </Button>
            </View>
          </View>
        }
        keyExtractor={item => item._id.toString()}
        removeClippedSubviews={true}
        renderItem={({ item }) => (
          <List.Item
            left={() =>
              <TouchableOpacity onPress={() => { inserirFoto(item) }}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: `${(item.urlImage) ? item.urlImage : variaveis.serverUrl + "images/inserir_foto.png"}`
                  }}
                />
              </TouchableOpacity>
            }
            right={() =>
              // <View style={styles.botoesContainer}>
              //   <Button mode="contained" color="#FF7D04" labelStyle={{ color: "white", fontSize: 10 }} onPress={() => { }} style={styles.botao}>Editar</Button>
              //   <Button mode="contained" color="#FF7D04" labelStyle={{ color: "white", fontSize: 10 }} onPress={() => { }} style={styles.botao}>Pausar</Button>
              //   <Button mode="contained" color="#FF7D04" labelStyle={{ color: "white", fontSize: 10 }} onPress={() => { }} style={styles.botao}>Excluir</Button>
              // </View>
              <MenuContexto
                anuncioId={item._id}
                navigation={navigation}
                renderizar={renderizar}
                setRenderizar={setRenderizar}
                setVisible={setVisible}
                status={(item.statusAnuncio)
                  ? "Pausar" : "Republicar"}
              />
            }
            title={
              (item.statusAnuncio)
                ? <View><View style={styles.badgePublicado}><Text style={styles.textoPulicado}>Publicado</Text></View><Text style={styles.listTitulo}>{item.veiculoMarca} {item.descricaoVeiculo} - {item.anoModelo}</Text></View>
                : <View><View style={styles.badgePausado}><Text style={styles.textoPausado}>Pausado</Text></View><Text style={styles.listTitulo}>{item.veiculoMarca} {item.descricaoVeiculo} - {item.anoModelo}</Text></View>}
            description={
              < View >
                {/* <Text style={styles.listTitulo}>{item.veiculoMarca} {item.descricaoVeiculo} - {item.anoModelo}</Text> */}
                <Text>Visitas: <Text style={styles.numeroNegrito}>{item.numVisitas}</Text>   Contatos: <Text style={styles.numeroNegrito}>{item.numContatos}</Text></Text>
                <Text style={styles.listPreco}>{item.veiculoValor}</Text>
              </View >
            }
            descriptionNumberOfLines={2}
          />
        )}
      />
    </SafeAreaView >
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
    fontWeight: "700",
    paddingBottom: 10
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
    fontSize: 15,
    marginBottom: 5
  },
  listPreco: {
    color: "black",
    paddingTop: 13,
    fontSize: 18,
  },
  botao: {
    // flex: 1,
    margin: 4,
    alignSelf: "stretch"
  },
  direcao: {
    marginLeft: 0,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "flex-start"
    // flexWrap: "wrap"
  },
  botoesContainer: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
  numeroNegrito: {
    fontWeight: "bold"
  },
  badgePausado: {
    borderColor: "#FF7D04",
    borderRadius: 50,
    backgroundColor: "#21282B",
    marginBottom: 5,
    fontSize: 12,
    // color: "#FFF",
    alignSelf: "flex-start",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  badgePublicado: {
    borderColor: "#FF7D04",
    borderRadius: 50,
    backgroundColor: "#1b9382",
    marginBottom: 5,
    fontSize: 12,
    // color: "#FFF",
    alignSelf: "flex-start",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textoPausado: {
    fontSize: 12,
    color: "#FFF",
    // alignSelf: "flex-start",
    // padding: 5,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  textoPulicado: {
    fontSize: 12,
    color: "#FFF",
    // alignSelf: "flex-start",
    // padding: 5,
    // paddingLeft: 10,
    // paddingRight: 10,
  }
});

export default PainelAnuncios;
