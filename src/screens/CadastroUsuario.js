import React, { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, Linking, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Button, Checkbox, List } from 'react-native-paper';
import ImageViewer from 'react-native-image-zoom-viewer';
import { API_URL } from '../services/api';
import { useIsFocused } from '@react-navigation/core';
import ProgressoUpload from '../components/ProgressoUpload';

const CadastroUsuario = ({ navigation, route }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState()
  const [status, setStatus] = useState("")
  const [type, setType] = useState("")
  const [apiUrl, setApiUrl] = useState("")

  const isFocused = useIsFocused();
  const [checkedTermos, setCheckedTermos] = useState(false);
  const [checkedPrivacidade, setCheckedPrivacidade] = useState(false);

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
          setStatus("Cadastrando usuário(s)...")
          setType("text/csv")
          setApiUrl("users")
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
      url: API_URL + "images/template_usuario.png"
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
        description={<Text>Crie um arquivo.csv no seguinte formato. <Text style={{ color: "#FF7D04", fontWeight: "700" }} onPress={() => Linking.openURL('http://localhost:3333/:3333/download/template_usuario.csv')}>Clique aqui</Text> para baixar o template.</Text>}
      />
      <List.Item
        title="Exemplo CSV"
        description={
          <Text>Nome | Apelido | CPF | CNPJ | Telefone | E-mail </Text>
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
      <View style={{ flexDirection: "column", alignSelf: "center", paddingTop: 36 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            color="#FF7D04"
            status={checkedTermos ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckedTermos(!checkedTermos);
            }}
          />
          <Text style={styles.texto}>
            Aceito os
            <Text
              style={{ color: "#FF7D04", fontWeight: "700" }}
              onPress={() => { navigation.navigate('Termos e Condições') }}
            > Termos e Condições de Uso</Text>
            .
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            color="#FF7D04"
            status={checkedPrivacidade ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckedPrivacidade(!checkedPrivacidade);
            }}
          />
          <Text style={styles.texto}>
            Concordo com a
            <Text
              style={{ color: "#FF7D04", fontWeight: "700" }}
              onPress={() => { navigation.navigate('Política de Privacidade') }}
            > Política de Privacidade</Text>
            .
          </Text>
        </View>
      </View>
      <View style={{ paddingTop: 36, paddingBottom: 36 }}>
        <Button
          disabled={(checkedTermos === true && checkedPrivacidade === true) ? false : true}
          mode="contained"
          color="#FF7D04"
          labelStyle={{ color: "white", textAlignVertical: "center" }}
          onPress={() => enviarUpload()}
          style={styles.botao}
        >
          Enviar
        </Button>
      </View>
    </ScrollView >
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
  },
  texto: {
    alignSelf: "center"
  },
});

export default CadastroUsuario;