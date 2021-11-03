import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, List, Snackbar } from 'react-native-paper';
import MenuContexto from '../components/MenuContexto';
import api, { API_URL } from '../services/api';
import * as DocumentPicker from 'expo-document-picker';
import ProgressoUpload from '../components/ProgressoUpload';
import MenuFoto from '../components/MenuFoto';
import numeral from '../services/formatador';

const PainelAnuncios = ({ navigation, route }) => {

  const refRBSheet = useRef();

  const [renderizar, setRenderizar] = useState(0);
  const [anuncios, setAnuncios] = useState();
  const [contadorPagina, setContadorPagina] = useState(20)
  const [numAnuncios, setNumAnuncios] = useState(0);
  const isFocused = useIsFocused();

  const { mensagem } = route.params;
  const { visibilidade } = route.params;
  const [visible, setVisible] = useState(visibilidade);

  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState()
  const [status, setStatus] = useState("")
  const [type, setType] = useState("")
  const [apiUrl, setApiUrl] = useState("")
  const [anuncioId, setAnuncioId] = useState("")
  // let anuncioId;

  const [imagem, setImagem] = useState(false);

  // useEffect(() => {
  //   setIsLoading(false)
  // }, [isFocused === true])

  const abrirMenuFoto = (item) => {
    setAnuncioId(item._id)
    setImagem(item.urlImage)
    refRBSheet.current.open()
  }

  const visualizar = () => {
    refRBSheet.current.close();
    resetParams();
    navigation.navigate("Visualizador", {
      imagem: imagem
    })
  }

  const inserirFoto = async () => {
    let result;
    await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false
    })
      .then(file => {
        if (file.type == 'success') {
          result = "success"
          setFile(file)
          setStatus("Enviando foto...")
          setType("image/jpeg")
          setApiUrl(`anuncios/${anuncioId}`)
        } else {
          return
        }
      })
      .catch(e => {
        console.log("Erro ao coletar arquivo")
      })
      .finally(() => {
        if (result == "success") {
          setIsLoading(true)
        }
      })
  }

  const deletarFoto = async () => {
    refRBSheet.current.close();
    await api.patch(`anuncios/${anuncioId}`, { deletarFoto: true })
      .then(res => {
        resetParams()
        navigation.navigate("Painel de Anúncios", {
          mensagem: res.data.message
        })
      })
      .catch(e => {
        resetParams()
        navigation.navigate("Painel de Anúncios", {
          mensagem: e.message
        })
      })
      .finally(() => {
        setVisible(true)
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
      .catch(e => {
        console.log("Erro ao coletar anúncios do usuário")
      })
  }, [isFocused === true])

  useEffect(() => {
    api('anuncios/userid')
      .then(res => {
        const slice = res.data.anuncio.slice(0, contadorPagina);
        setNumAnuncios(res.data.anuncio.length)
        setContadorPagina(30)
        setAnuncios(slice)
      })
      .catch(e => {
        console.log("Erro ao coletar anúncios do usuário")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [renderizar])


  const trocarPagina = async () => {
    if (anuncios.length < numAnuncios) {
      await api("anuncios/userid")
        .then(r => {
          const slice = r.data.anuncio.slice(0, contadorPagina);
          setContadorPagina(contadorPagina + 10)
          setAnuncios(slice)
        })
        .catch(e => {
          console.log("Erro ao coletar anúncios do usuário")
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
        renderizar={renderizar}
        setRenderizar={setRenderizar}
      />
    )
  }

  return (
    <SafeAreaView>
      <Snackbar
        visible={visible}
        duration={3000}
        onDismiss={reset}
      >
        {mensagem}
      </Snackbar>
      {/* <Alerta mensagem={mensagem} visible={visible} setVisible={setVisible} /> */}
      <MenuFoto
        refRBSheet={refRBSheet}
        visualizar={visualizar}
        deletarFoto={deletarFoto}
        inserirFoto={inserirFoto}
      />
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
                onPress={() => { resetParams(); navigation.navigate("Inserir Anúncio") }}
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
              <TouchableOpacity onPress={() => { abrirMenuFoto(item) }}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: `${(item.urlImage) ? item.urlImage : API_URL + "images/inserir_foto.png"}`
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
                ? <View><View style={styles.badgePublicado}><Text style={styles.textoPulicado}>Publicado</Text></View></View>
                : <View><View style={styles.badgePausado}><Text style={styles.textoPausado}>Pausado</Text></View></View>}
            description={
              <>
                <View><Text style={styles.listTitulo}>{item.veiculoMarca} {item.descricaoVeiculo} - {item.anoModelo}</Text></View>
                <View><Text>Visitas: <Text style={styles.numeroNegrito}>{item.numVisitas}</Text>   Contatos: <Text style={styles.numeroNegrito}>{item.numContatos}</Text></Text></View>
                <View><Text style={styles.listPreco}>{"R$ " + numeral(item.veiculoValor).format()}</Text></View>

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
  },
  exemplo: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    alignItems: "flex-start"
  },
});

export default PainelAnuncios;
