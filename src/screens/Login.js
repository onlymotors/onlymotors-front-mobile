import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../services/api';
import Alerta from '../components/Alerta';
import { Button, TextInput } from 'react-native-paper';
import { setToken } from '../services/tokenService';
import { useIsFocused } from '@react-navigation/core';

const Login = ({ navigation, route }) => {

  const isFocused = useIsFocused();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const mensagemRecebida = route.params.mensagem;
  const { visibilidade } = route.params;
  const [visible, setVisible] = useState(false);
  const [mensagem, setMensagem] = useState(mensagemRecebida);

  useEffect(() => {
    setVisible(visibilidade)
    setMensagem(mensagemRecebida)
  }, [isFocused]);

  const logar = () => {
    const data = { emailUser: email, senhaUser: senha }
    api.post("login", data)
      .then(res => {
        if (res.data.statusCadastro === true) {
          setToken(res.data.token)
          navigation.navigate('Only Motors')
        }
        else {
          navigation.navigate('Alterar Dados Cadastrais', {
            token: res.data.token,
            senha: senha
          })
        }
      })
      .catch(e => {
        setMensagem(e.response.data.error)
        setVisible(true)
      })
  }

  return (
    <View>
      <Alerta mensagem={mensagem} visible={visible} setVisible={setVisible} />
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
          onPress={() => navigation.navigate('Cadastro de Usuário')}
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
  botao: {
    marginTop: 46,
    alignSelf: "center"
  }
})


export default Login;