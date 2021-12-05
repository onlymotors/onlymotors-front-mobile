import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api, { API_URL } from '../services/api';
import Alerta from '../components/Alerta';
import { Button, Checkbox, TextInput } from 'react-native-paper';
import { setToken } from '../services/tokenService';
import { useIsFocused } from '@react-navigation/core';
import axios from 'axios';

const Login = ({ navigation, route }) => {

  const isFocused = useIsFocused();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const mensagemRecebida = route.params.mensagem;
  const { visibilidade } = route.params;
  const [visible, setVisible] = useState(false);
  const [mensagem, setMensagem] = useState(mensagemRecebida);
  const [showTermos, setShowTermos] = useState(false);
  const [checkedTermos, setCheckedTermos] = useState(false);
  const [checkedPrivacidade, setCheckedPrivacidade] = useState(false);
  const [localToken, setLocalToken] = useState("");

  useEffect(() => {
    setVisible(visibilidade)
    setMensagem(mensagemRecebida)
  }, [isFocused === true]);

  const logar = () => {
    const data = { emailUser: email, senhaUser: senha }
    api.post("login", data)
      .then(res => {
        if (res.data.statusCadastro === true) {
          if (res.data.termosAceitos) {
            setToken(res.data.token)
            setEmail("")
            setSenha("")
            resetParams()
            navigation.navigate('Home')
          }
          else {
            setLocalToken(res.data.token)
            setShowTermos(true)
          }
        }
        else {
          resetParams()
          navigation.navigate('Alterar Dados Cadastrais', {
            token: res.data.token,
            senha: senha
          })
          setEmail("")
          setSenha("")
        }
      })
      .catch(e => {
        setMensagem(e.response.data.error)
        setVisible(true)
      })
  }

  const processarTermos = () => {
    let dados;
    if (checkedTermos && checkedPrivacidade)
      dados = { termosAceitos: true }
    else
      dados = { termosAceitos: false }

    axios.patch(`${API_URL}users/termos`, dados, { headers: { "Authorization": `Bearer ${localToken}` } })
      .then(() => {
        setToken(localToken)
        setEmail("")
        setSenha("")
        resetParams()
        navigation.navigate('Home')
      })
      .catch(() => {
        console.log("Erro ao salvar termos")
      })
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

  if (showTermos) {
    return (
      <View>
        <View style={{ alignSelf: "center", padding: 10, paddingTop: 36 }}>
          <Text>
            Atualizamos os Termos e Condições de Uso para sua segurança revise-os para continuar.
          </Text>
        </View>
        <View style={{ flexDirection: "column", alignSelf: "center", paddingTop: 30 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              color="#FF7D04"
              status={checkedTermos ? 'checked' : 'unchecked'}
              onPress={() => {
                setCheckedTermos(!checkedTermos);
              }}
            />
            <Text style={styles.textoTermos}>
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
            <Text style={styles.textoTermos}>
              Concordo com a
              <Text
                style={{ color: "#FF7D04", fontWeight: "700" }}
                onPress={() => { navigation.navigate('Política de Privacidade') }}
              > Política de Privacidade</Text>
              .
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 36 }}>
          <Button
            disabled={(checkedTermos === true && checkedPrivacidade === true) ? false : true}
            mode="contained"
            color="#FF7D04"
            labelStyle={{ color: "white", textAlignVertical: "center" }}
            onPress={() => processarTermos()}
            style={{ alignSelf: "center" }}
          >
            Enviar
          </Button>
        </View>
      </View>
    )
  }

  return (
    <View>
      <Alerta mensagem={mensagem} visible={visible} reset={reset} navigation={navigation} />
      <View style={styles.inputContainerTop}>
        <TextInput
          label="E-mail"
          mode="outlined"
          keyboardType="email-address"
          value={email}
          onChangeText={e => setEmail(e)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry={true}
          value={senha}
          onChangeText={e => setSenha(e)}
          onSubmitEditing={() => logar()}
        />
      </View>
      <Button
        mode="contained"
        color="#FF7D04"
        style={styles.botao}
        labelStyle={{ color: "white" }}
        onPress={() => logar()}
      >
        Entrar
      </Button>
      <Text style={styles.texto}>
        Não possui uma conta?
        <Text
          style={{ color: "#FF7D04", fontWeight: "700" }}
          onPress={() => { resetParams(); navigation.navigate('Cadastro de Usuário') }}
        > Clique aqui</Text>
        .
      </Text>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainerTop: {
    margin: 8,
    marginTop: 100
  },
  inputContainer: {
    margin: 8
  },
  texto: {
    marginTop: 46,
    alignSelf: "center"
  },
  textoTermos: {
    alignSelf: "center"
  },
  botao: {
    marginTop: 46,
    alignSelf: "center"
  }
})


export default Login;