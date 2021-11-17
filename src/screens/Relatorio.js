import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../services/api';
import { ActivityIndicator, Appbar, Button } from 'react-native-paper';
import { getToken } from '../services/tokenService';
import Alerta from '../components/Alerta';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/core';

const Relatorio = ({ route, navigation }) => {

  const [relatorio, setRelatorio] = useState([])
  const [isLoadingRelatorio, setIsLoadingRelatorio] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [visible, setVisible] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused === true)
      setIsLoadingRelatorio(true)
  }, [isFocused])

  useEffect(() => {
    if (isLoadingRelatorio === true)
      gerarRelatorio()
  }, [isLoadingRelatorio])

  useEffect(() => {
    if (isExporting === true)
      exportarExcel()
  }, [isExporting])

  const gerarRelatorio = async () => {
    await api(`relatorio`)
      .then(res => {
        setRelatorio(res.data.relatorio)
      })
      .catch(e => {
        console.log("Erro ao coletar relatório")
      })
      .finally(() => {
        setIsLoadingRelatorio(false)
      })
  }

  const exportarExcel = async () => {
    let url = "http://192.168.18.5:3333/relatorio/download";

    const fileUri = FileSystem.documentDirectory + 'relatorio.xlsx';

    let token = await getToken()

    const downloadedFile = await FileSystem.downloadAsync(url, fileUri,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });


    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      try {
        const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
        const album = await MediaLibrary.getAlbumAsync('Download');
        if (album == null) {
          await MediaLibrary.createAlbumAsync('Download', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }

        setIsExporting(false)
        setMensagem("Arquivo baixado e salvo na pasta Downloads")
        setVisible(true)

      } catch (err) {
        console.log("Save err: ", err)
      }

    }
  }

  const reset = () => {
    setVisible(false);
  }

  const Loading = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.appHeader}>
            <Appbar.Action icon="menu" color="black" onPress={() => { navigation.openDrawer() }} />
            <Appbar.Content title={route.params.title} color="black" style={{ marginLeft: 8, paddingLeft: 12, paddingRight: 12 }} />
            <Appbar.Action icon="magnify" color="black" onPress={() => { navigation.navigate("Painel de Busca") }} />
          </View>
        </View>
        <View style={styles.containerIsLoading}>
          <ActivityIndicator animating={true} size="large" />
          {/* <Text style={{ textAlign: "center", padding: 20 }}>Gerando Relatório...</Text> */}
        </View>
      </SafeAreaView>
    )
  }

  if (isExporting === true) {
    return (

      <Loading />

    )
  }
  if (isLoadingRelatorio) {
    return (

      <Loading />

    )
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>

        <View style={styles.appHeader}>
          <Appbar.Action icon="menu" color="black" onPress={() => { navigation.openDrawer() }} />
          <Appbar.Content title={route.params.title} color="black" style={{ marginLeft: 8, paddingLeft: 12, paddingRight: 12 }} />
          <Appbar.Action icon="magnify" color="black" onPress={() => { navigation.navigate("Painel de Busca") }} />
        </View>

        <View
          style={styles.afterSearchRow}
        >
          <Text style={styles.textoAnuEncontrados}>
            {relatorio.length} anúncios criados
          </Text>
          <View style={styles.badge}>
            <TouchableOpacity
              onPress={() => {
                setIsExporting(true)
              }}
            >
              <View style={styles.headerBotaoFiltrar}>
                <Text style={styles.textoBadge}>
                  Exportar
                </Text>
                <MaterialCommunityIcons
                  name="file-download"
                  size={20}
                  color="white"
                  style={styles.headerIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
      <Alerta mensagem={mensagem} visible={visible} reset={reset} navigation={navigation} />

      <ScrollView >
        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          {relatorio.map(item =>
            <View key={item.id} style={styles.row}>

              <View style={styles.rowRank}>
                <View style={styles.column}>
                  <View style={styles.circle}><Text style={styles.rank} adjustsFontSizeToFit>{item.rank}</Text></View>
                  <Text style={styles.rankTitulo}>Rank</Text>
                </View>
              </View>

              <View style={styles.rowEspacamento}>
                <Text style={styles.anuncioTitulo}>{item.nome}</Text>
                <Text style={styles.secao}>Data de publicação: <Text style={styles.textoSecao}>{new Date(item.dataPublicacao).toLocaleDateString()}</Text></Text>
                <Text style={styles.secao}>Data da última alteração: <Text style={styles.textoSecao}>{new Date(item.dataAlteracao).toLocaleDateString()}</Text></Text>
                <Text style={styles.secao}>Número de visitas: <Text style={styles.textoSecao}>{item.numVisitas}</Text></Text>
                <Text style={styles.secao}>Data da primeira visita: <Text style={styles.textoSecao}>{(item.dataPrimeiraVisita === "Nunca visitado") ? "Nunca visitado" : new Date(item.dataPrimeiraVisita).toLocaleDateString()}</Text></Text>
                <Text style={styles.secao}>Tempo até a primeira visita: <Text style={styles.textoSecao}>{item.primeiraVisita}</Text></Text>
                <Text style={styles.secao}>Média de visitas diárias: <Text style={styles.textoSecao}>{item.medVisitasDia.toLocaleString("pt-BR")}</Text></Text>
                <Text style={styles.secao}>Número de contatos: <Text style={styles.textoSecao}>{item.numContatos}</Text></Text>
                <Text style={styles.secao}>Data do primeiro contato: <Text style={styles.textoSecao}>{(item.dataPrimeiroContato === "Nunca contatado") ? "Nunca contatado" : new Date(item.dataPrimeiroContato).toLocaleDateString()}</Text></Text>
                <Text style={styles.secao}>Tempo até o primeiro contato: <Text style={styles.textoSecao}>{item.primeiroContato}</Text></Text>
                <Text style={styles.secao}>Total de mensagens trocadas: <Text style={styles.textoSecao}>{item.totalMensagens}</Text></Text>
              </View>

            </View>
          )}
        </View>
      </ScrollView>

      {/* 
      <Button
        mode="contained"
        color="#FF7D04"
        labelStyle={{ color: "white", fontSize: 20 }}
        onPress={() => { exportarExcel() }}
        // onPress={() => { relatorio() }}
        style={styles.botao}
      >
        Exportar Excel
      </Button> */}


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerIsLoading: {
    flex: 1,
    justifyContent: 'center'
  },
  appHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4,
    paddingRight: 4
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  column: {
    flexDirection: "column"
  },
  rowRank: {
    padding: 8,
    flexDirection: "column",
    flexShrink: 1,
    width: "15%",
  },
  rowEspacamento: {
    padding: 8,
    flexDirection: "column",
    flexShrink: 1,
    width: "85%"
  },
  rank: {
    fontWeight: "600",
    alignSelf: "center",
    color: "white",
    padding: 2
  },
  rankTitulo: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
    paddingTop: 4
  },
  anuncioTitulo: {
    fontSize: 16,
    fontWeight: "bold"
  },
  secao: {
    flexShrink: 1,
    flexWrap: "wrap",
    fontSize: 13,
    paddingTop: 2
  },
  textoSecao: {
    fontWeight: "bold"
  },
  circle: {
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: "#1b9382",
  },
  botao: {
    // flex: 1,
    margin: 4,
    bottom: 4,
    alignSelf: "center",
    position: 'absolute'
  },
  container: {
    paddingBottom: 8,
    backgroundColor: "white",
    paddingTop: 24,
    elevation: 4,
  },
  afterSearchRowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#D5D5D5",
    borderTopWidth: 1,
    paddingTop: 8,
    paddingLeft: 19,
    paddingRight: 19,
    position: "absolute",
    bottom: 0
  },
  afterSearchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#D5D5D5",
    borderTopWidth: 1,
    paddingTop: 8,
    paddingLeft: 19,
    paddingRight: 19
  },
  headerBotaoFiltrar: {
    flexDirection: "row",
    justifyContent: 'center'
  },
  headerIcon: {
    textAlignVertical: "center",
    paddingLeft: 10
  },
  badge: {
    borderColor: "#FF7D04",
    borderRadius: 50,
    backgroundColor: "#FF7D04",
    fontSize: 12,
    alignSelf: "flex-end",
    padding: 4,
    paddingLeft: 15,
    paddingRight: 15,
  },
  textoBadge: {
    textAlignVertical: "center",
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  textoAnuEncontrados: {
    textAlignVertical: "center"
  },
})

export default Relatorio;