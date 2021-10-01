import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import api from '../services/api';
import { setToken } from '../services/tokenService';

const AlterarDados = ({ navigation, route }) => {

  const [senha, setSenha] = useState("");
  const [verificaSenha, setVerificaSenha] = useState("");
  const { token } = route.params;

  const trocarSenha = () => {
    setToken(token)
    navigation.navigate('Only Motors')

  }

  return (
    <View>
      <View style={styles.inputContainerTop}>
        <TextInput label="Digite sua nova senha" secureTextEntry={true} mode="outlined" style={styles.input} outlineColor="lightgrey" value={senha} onChangeText={e => setSenha(e)} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput label="Digite a senha novamente" secureTextEntry={true} mode="outlined" style={styles.input} outlineColor="lightgrey" value={verificaSenha} onChangeText={e => setVerificaSenha(e)} />
      </View>
      <Button mode="contained" color="#FF7D04" style={styles.botao} labelStyle={{ color: "white" }} onPress={() => trocarSenha()}>Salvar Senha</Button>
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
  input: {

  },
  botao: {
    marginTop: 46,
    alignSelf: "center"
  }
})

export default AlterarDados;