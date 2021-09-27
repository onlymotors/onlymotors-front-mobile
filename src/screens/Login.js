import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Alerta from '../components/Alerta';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState();
  const [visibilidade, setVisibilidade] = useState(false);

  const setToken = async (value) => {
    await AsyncStorage.setItem('token', value)
  }

  const logar = () => {
    const data = { emailUser: email, senhaUser: senha }
    api.post("login", data)
      .then(res => {
        console.log(res)
        // alert(res.data.user._id)
        // localStorage.setItem('token', res.data.token);
        // AsyncStorage.setItem('token', res.data.token);
        setToken(res.data.token)
        navigation.navigate('Only Motors')
      })
      .catch(e => {
        console.log(e.response)
        setMensagem(e.response.data.error)
        setVisibilidade(true)
      })
  }

  return (
    <View>
      <Alerta mensagem={mensagem} visibilidade={visibilidade} />
      <TextInput keyboardType="email-address" value={email} onChangeText={e => setEmail(e)} />
      <TextInput secureTextEntry={true} value={senha} onChangeText={e => setSenha(e)} />
      <Button title="Entrar" onPress={() => logar()} />
      <Text>Não possui uma conta?<Text style={{ color: "#FF7D04", fontWeight: "700" }} onPress={() => navigation.navigate('Cadastro de Usuário')}> Clique aqui</Text>.</Text>

    </View >
  );
}

export default Login;