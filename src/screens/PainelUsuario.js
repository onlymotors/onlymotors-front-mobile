import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import api from '../services/api';
import { Button, DataTable, Modal, Portal } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/core';
import { clearToken, getToken } from '../services/tokenService';
import Alerta from '../components/Alerta';

const PainelUsuario = ({ route, navigation }) => {

  const { mensagem } = route.params;
  const { visibilidade } = route.params;
  const [visible, setVisible] = useState(visibilidade);

  // const [senha, setSenha] = useState("");

  const [visibleModal, setVisibleModal] = useState(false);

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const isFocused = useIsFocused();

  const [token, setToken] = useState("")

  const [usuario, setUsuario] = useState({
    nomeUser: "",
    apelidoUser: "",
    cpfUser: "",
    cnpjUser: "",
    telefoneUser: "",
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
    setVisible(visibilidade)
    getToken().then(tkn => {
      setToken(tkn)
    })
    api(`users/userid`)
      .then(res => {
        setUsuario(res.data[0])
      })
      .catch(() => {
        console.log("Acesso negado ao recuperar dados do usuário")
      })
  }, [isFocused === true])

  const excluir = async () => {
    await api.delete(`users/userid`)
      .then(res => {
        clearToken()
        resetParams()
        navigation.navigate('Home', {
          mensagem: res.data.message,
          visibilidade: true
        });
      })
      .catch(e => {
        resetParams()
        navigation.navigate('Painel do Usuário', {
          mensagem: e.message,
          visibilidade: true
        })
      })
  }

  const resetParams = () => {
    navigation.setParams({
      mensagem:
        route.params.mensagem = undefined,
      visibilidade:
        route.params.visibilidade = false
    })
  }

  const reset = () => {
    setVisible(false);
    resetParams()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Alerta mensagem={mensagem} visible={visible} reset={reset} navigation={navigation} />
      <ScrollView>
        <Portal>
          <Modal
            visible={visibleModal}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            {/* <Text>Digite sua senha para confirmar a exclusão de sua conta:</Text> */}
            <Text>Tem certeza que deseja excluir sua conta? Clique no botão para confirmar a exclusão.</Text>
            {/* <TextInput
              label="Senha"
              mode="outlined"
              secureTextEntry={true}
              value={senha}
              onChangeText={e => setSenha(e)}
            /> */}
            <View style={styles.direcaoExclusao}>
              <Button
                mode="contained"
                color="#FF7D04"
                style={styles.botaoConfirmar}
                labelStyle={{ color: "white" }}
                onPress={() => { hideModal(); excluir(); }}
              >
                Excluir
              </Button>
              <Button
                mode="contained"
                color="#FF7D04"
                style={styles.botaoConfirmar}
                labelStyle={{ color: "white" }}
                onPress={() => { hideModal(); }}
              >
                Cancelar
              </Button>
            </View>
            <Text><Text style={{ fontWeight: "bold" }}>Obs: </Text>Os dados serão removidos completamente de nosso sistema em até 30 dias.</Text>
          </Modal>
        </Portal>
        <Text style={styles.textSecao}>Informações da conta</Text>
        <DataTable.Row>
          <View>
            <Text style={styles.textDetalhe}>CNPJ/CPF</Text>
            <Text style={styles.text}>{(usuario.cpfUser.length > 0) ? usuario.cpfUser : usuario.cnpjUser}</Text>
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
        <View style={styles.direcao}>
          <Button
            mode="contained"
            color="#FF7D04"
            labelStyle={{ color: "white" }}
            style={styles.botao}
            onPress={() => {
              resetParams()
              navigation.navigate('Alterar Dados Cadastrais', {
                token: token,
              })
            }}
          >
            Alterar
          </Button>
          <Button
            mode="contained"
            color="#FF7D04"
            labelStyle={{ color: "white" }}
            style={styles.botao}
            onPress={() => showModal()}
          >
            Excluir
          </Button>
        </View>
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
    margin: 8,
    alignSelf: "center"
  },
  direcao: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "flex-start"
    // flexWrap: "wrap"
  },
  direcaoExclusao: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center"
  }
});

export default PainelUsuario;