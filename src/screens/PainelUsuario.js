import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import api from '../services/api';
import { Button, DataTable, Modal, Portal, TextInput } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/core';
// import Modal from '../components/Modal';

const PainelUsuario = ({ route, navigation }) => {

  const [senha, setSenha] = useState("");

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const isFocused = useIsFocused();


  const [usuario, setUsuario] = useState({
    nomeUser: "",
    apelidoUser: "",
    cpfUser: 0,
    cnpjUser: 0,
    telefoneUser: 0,
    emailUser: "",
    enderecoUser: {
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      cep: ""
    }
  });

  useEffect(() => {
    api(`users/userid`)
      .then(res => {
        setUsuario(res.data[0])
      })
  }, [isFocused])

  const excluir = () => {
    // localStorage.clear()
    // api.delete(`users/userid`, senha)
    //   .then(res => {
    //     navigation.navigate('Only Motors', {
    //       mensagem: res.data.message,
    //       visibilidade: true
    //     });
    //   })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
            <Text>Digite sua senha para confirmar a exclusão de sua conta:</Text>
            <TextInput label="Senha" mode="outlined" secureTextEntry={true} value={senha} onChangeText={e => setSenha(e)} />
            <Button mode="contained" color="#FF7D04" style={styles.botaoConfirmar} labelStyle={{ color: "white" }} onPress={() => excluir()} >Confirmar</Button>
          </Modal>
        </Portal>
        <Text style={styles.textSecao}>Informações da conta</Text>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>CNPJ/CPF</Text>
            <Text style={styles.text}>{usuario.cpfUser || usuario.cnpjUser}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Nome</Text>
            <Text style={styles.text}>{usuario.nomeUser}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Apelido</Text>
            <Text style={styles.text}>{usuario.apelidoUser}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>E-email</Text>
            <Text style={styles.text}>{usuario.emailUser}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Telefone</Text>
            <Text style={styles.text}>{usuario.telefoneUser}</Text>
          </View>
        </DataTable.Row>

        <Text style={styles.textSubSecao}>Endereço</Text>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Logradouro</Text>
            <Text style={styles.text}>{usuario.enderecoUser.logradouro}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Número</Text>
            <Text style={styles.text}>{usuario.enderecoUser.numero}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Complemento</Text>
            <Text style={styles.text}>{usuario.enderecoUser.complemento}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Bairro</Text>
            <Text style={styles.text}>{usuario.enderecoUser.bairro}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>Cidade</Text>
            <Text style={styles.text}>{usuario.enderecoUser.cidade}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>UF</Text>
            <Text style={styles.text}>{usuario.enderecoUser.uf}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>CEP</Text>
            <Text style={styles.text}>{usuario.enderecoUser.cep}</Text>
          </View>
        </DataTable.Row>
        <Text style={styles.textSecao}>Opções da conta:</Text>
        <Button mode="contained" color="#FF7D04" labelStyle={{ color: "white" }} style={styles.botao} onPress={() => showModal()}>Excluir</Button>
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
  textSubSecao: {
    fontSize: 18,
    fontWeight: "500",
    padding: 16
  },
  textDetalhe: {
    marginLeft: 5,
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
  },
  modal: {
    backgroundColor: 'white',
    padding: 20
  },
  botaoConfirmar: {
    marginTop: 17,
    alignSelf: "center"
  }
});

export default PainelUsuario;