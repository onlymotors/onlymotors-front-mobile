import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import Alerta from '../components/Alerta';

const AlterarDados = ({ navigation, route }) => {

  const [isLoading, setIsLoading] = useState(true)

  const isFocused = useIsFocused();

  const [showDropDown, setShowDropDown] = useState(false);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

  const { token } = route.params;
  const { senha } = route.params;

  const [statusCadastro, setStatusCadastro] = useState();
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  const [senhaAtual, setSenhaAtual] = useState(senha);
  const [senhaNova, setSenhaNova] = useState("");
  const [verificaSenha, setVerificaSenha] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    obterEstados()
    axios(`${API_URL}users/userid`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        setTelefone(res.data[0].telefoneUser)
        setCep(res.data[0].enderecoUser.cep)
        setLogradouro(res.data[0].enderecoUser.logradouro)
        setNumero(res.data[0].enderecoUser.numero)
        setComplemento(res.data[0].enderecoUser.complemento)
        setBairro(res.data[0].enderecoUser.bairro)
        setCidade(res.data[0].enderecoUser.cidade)
        setUf(res.data[0].enderecoUser.uf)
        setStatusCadastro(res.data[0].statusCadastro)
      })
      .catch(e => {
        console.log("Erro ao coletar usuário")
      })
  }, [isFocused])

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading])

  useEffect(() => {
    obterCidades()
  }, [uf]);

  const salvar = () => {
    if (!statusCadastro && (senhaNova.length < 1 || logradouro.length < 1)) {
      setMensagem("Você precisa preencher uma nova senha e o endereço completo")
      setVisible(true)
      return
    }

    let dados = {
      enderecoUser: {
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf
      }
    }
    if (!telefone.includes('X')) {
      let valor = telefone.replace(/\D/g, "")
      dados.telefoneUser = valor
    }
    if (senhaNova === verificaSenha && senhaNova.length > 0) {
      dados.senhaNova = senhaNova
    }
    if (senhaNova !== verificaSenha && senhaNova.length > 0) {
      setMensagem("As novas senhas não são iguais")
      setVisible(true)
      return
    }
    if (senhaAtual.length > 0) {
      dados.senhaAtual = senhaAtual
    }
    if (!statusCadastro) {
      axios.patch(`${API_URL}users/userid`, dados, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => {
          navigation.navigate('Login', {
            mensagem: res.data.message,
            visibilidade: true
          })
        })
        .catch(e => {
          navigation.navigate('Login', {
            mensagem: e.message,
            visibilidade: true
          })
        })
    } else {
      axios.patch(`${API_URL}users/userid`, dados, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => {
          navigation.navigate('Painel do Usuário', {
            mensagem: res.data.message,
            visibilidade: true
          })
        })
        .catch(e => {
          navigation.navigate('Painel do Usuário', {
            mensagem: e.message,
            visibilidade: true
          })
        })
    }
  }

  const tratarCep = (cep) => {
    let valor = cep.replace(/\D/g, "")
    if (valor.length < 8) {
      return valor
    }
    if (valor.length === 8) {
      valor = valor.substring(0, 5) + "-" + valor.substring(5,)
      return valor
    }
  }

  const mascararTelefone = (telefone) => {
    var valor = telefone.replace(/\D/g, "")
    setTelefone(valor)
    if (valor < 10) {
      setTelefone(valor)
    }
    if (valor.length === 10) {
      setTelefone("(" + valor.substring(0, 2) + ") " + valor.substring(2, 6) + "-" + valor.substring(6,))
    }
    if (valor.length === 11) {
      setTelefone("(" + valor.substring(0, 2) + ") " + valor.substring(2, 7) + "-" + valor.substring(7,))
    }
  }


  const obterEnderecoPorCep = async (cep) => {
    setCep(tratarCep(cep))
    var valor = cep.replace(/\D/g, "")
    valor = valor.padStart(8, "0");
    await axios("https://viacep.com.br/ws/" + valor + "/json")
      .then(r => {
        setLogradouro(r.data.logradouro)
        setBairro(r.data.bairro)
        setCidade(r.data.localidade)
        setUf(r.data.uf)
      })
      .catch(e => {
        console.log("Erro CEP inexistente")
      })
  };

  const obterEstados = async () => {
    await axios("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(r => {
        var lista = r.data
        lista.sort((a, b) => a.sigla.localeCompare(b.sigla))
        let estados = []
        lista.map((item, index) => {
          estados.push({
            label: item.sigla,
            value: item.sigla
          })
        })
        setEstados(estados)
      })
      .catch(e => {
        console.log("Erro ao coletar Estados")
      })
  }

  const obterCidades = async () => {
    await axios("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + uf + "/municipios")
      .then(r => {
        let cidades = []
        r.data.map((item, index) => {
          cidades.push({
            label: item.nome,
            value: item.nome
          })
        })
        setCidades(cidades)
        setCidade(cidade)
      })
      .catch(e => {
        console.log("Erro ao coletar Cidades")
      })
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.containerIsLoading}>
        <ActivityIndicator animating={true} size="large" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Alerta mensagem={mensagem} visible={visible} setVisible={setVisible}
      />
      <ScrollView>
        <Text style={styles.textSubSecao}>Troque sua senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Digite sua senha atual"
            secureTextEntry={true}
            mode="outlined"
            style={styles.input}
            outlineColor="lightgrey"
            value={senhaAtual}
            onChangeText={e => setSenhaAtual(e)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Digite sua nova senha"
            secureTextEntry={true}
            mode="outlined"
            style={styles.input}
            outlineColor="lightgrey"
            value={senhaNova}
            onChangeText={e => setSenhaNova(e)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Digite a nova senha novamente"
            secureTextEntry={true}
            mode="outlined"
            style={styles.input}
            outlineColor="lightgrey"
            value={verificaSenha}
            onChangeText={e => setVerificaSenha(e)}
          />
        </View>
        <Text style={styles.textSubSecao}>Troque seu Telefone</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Telefone"
            mode="outlined"
            keyboardType="default"
            style={styles.input}
            outlineColor="lightgrey"
            value={telefone}
            onChangeText={e => mascararTelefone(e)}
          />
        </View>
        <Text style={styles.textSubSecao}>Troque seu Endereço</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="CEP"
            mode="outlined"
            style={styles.input}
            outlineColor="lightgrey"
            value={cep}
            onChangeText={e => obterEnderecoPorCep(e)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Logradouro"
            mode="outlined"
            style={styles.input}
            outlineColor="lightgrey"
            value={logradouro}
            onChangeText={e => setLogradouro(e)}
          />
        </View>
        <View
          style={styles.inputContainer}>
          <TextInput
            label="Número"
            mode="outlined"
            style={styles.input}
            outlineColor="lightgrey"
            value={numero}
            onChangeText={e => setNumero(e)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Complemento"
            mode="outlined"
            style={styles.input}
            outlineColor="lightgrey"
            value={complemento}
            onChangeText={e => setComplemento(e)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Bairro"
            mode="outlined"
            style={styles.input}
            outlineColor="lightgrey"
            value={bairro}
            onChangeText={e => setBairro(e)}
          />
        </View>
        <View style={styles.inputContainer}>
          <SafeAreaView>
            <DropDown
              label={"Cidade"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={cidade}
              setValue={e => setCidade(e)}
              list={cidades}
            />
          </SafeAreaView>
        </View>
        <View style={styles.inputContainer}>
          <SafeAreaView>
            <DropDown
              label={"Estado"}
              mode={"outlined"}
              visible={showMultiSelectDropDown}
              showDropDown={() => setShowMultiSelectDropDown(true)}
              onDismiss={() => setShowMultiSelectDropDown(false)}
              value={uf}
              setValue={e => setUf(e)}
              list={estados}
            />
          </SafeAreaView>
        </View>
        <Button
          mode="contained" color="#FF7D04"
          style={styles.botao}
          labelStyle={{ color: "white" }} onPress={() => salvar()}
        >
          Salvar Alterações
        </Button>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerIsLoading: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center",
    // alignSelf: "center"
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
    marginTop: 16,
    marginBottom: 16,
    alignSelf: "center"
  },
  textSubSecao: {
    fontSize: 18,
    fontWeight: "500",
    padding: 16
  },
})

export default AlterarDados;