import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Linking, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { List, Button } from 'react-native-paper';
import ImageViewer from 'react-native-image-zoom-viewer';
import ProgressoUpload from '../components/ProgressoUpload';
import { useIsFocused } from '@react-navigation/core';
import { API_URL } from '../services/api';

const InserirAnuncio = ({ navigation, route }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState()
  const [status, setStatus] = useState("")
  const [type, setType] = useState("")
  const [apiUrl, setApiUrl] = useState("")

  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoading(false)
  }, [isFocused === true])

  const enviarUpload = async () => {
    await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false
    })
      .then(file => {
        if (file.type == 'success') {
          setFile(file)
          setStatus("Cadastrando anúncio(s)...")
          setType("text/csv")
          setApiUrl("anuncios")
          setIsLoading(true)
        } else {
          return
        }
      })
      .catch(e => {
        console.log("Erro ao coletar arquivo")
      })
  }

  const imagens = [
    {
      url: API_URL + "images/template_anuncio.png"
    }
  ]

  if (isLoading) {
    return (
      <ProgressoUpload
        navigation={navigation}
        route={route}
        requestName="file"
        httpMethod="post"
        file={file}
        status={status}
        type={type}
        apiUrl={apiUrl}
      />
    )
  }

  return (
    <ScrollView >
      <List.Item
        title="Passo 1"
        description={<Text>Crie um arquivo.csv no seguinte formato. <Text style={{ color: "#FF7D04", fontWeight: "700" }} onPress={() => Linking.openURL('http://localhost:3333/:3333/download/template_anuncio.csv')}>Clique aqui</Text> para baixar o template.</Text>}
      />
      <List.Item
        title="Exemplo CSV"
        description={
          <Text>Nome_do_fabricante | descrição_marca_do_veículo | descrição_do_modelo_do_veículo | cod_do_anunciante | ano_de_fabricação | ano_do_modelo | cpf_do_anunciante | cnpj_do_anunciante | valor_do_veículo</Text>
        }
        descriptionNumberOfLines={6}
      />
      <ImageViewer
        renderIndicator={() => <Text></Text>}
        style={styles.exemplo}
        imageUrls={imagens}
      />
      <List.Item
        title="Passo 2"
        description="Agora clique no botão enviar para escolher o arquivo e enviá-lo automaticamente."
        descriptionNumberOfLines={2}
      />
      <Button
        mode="contained"
        color="#FF7D04"
        labelStyle={{ color: "white" }}
        onPress={enviarUpload}
        style={styles.botao}
      >
        Enviar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  exemplo: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    alignItems: "flex-start"
  },
  botao: {
    alignSelf: "center"
  }
});

export default InserirAnuncio;