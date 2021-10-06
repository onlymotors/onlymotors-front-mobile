import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import api from '../services/api';

const AlterarDadosAnuncio = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const [showDropDown, setShowDropDown] = useState(false);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

  const { itemId } = route.params;

  const [anoFabricacao, setAnoFabricacao] = useState("");
  const [anoModelo, setAnoModelo] = useState("");
  const [descricaoVeiculo, setDescricaoVeiculo] = useState("");
  const [nomeFabricante, setNomeFabricante] = useState("");
  const [veiculoMarca, setVeiculoMarca] = useState("");
  const [veiculoValor, setVeiculoValor] = useState("");

  useEffect(() => {
    api(`anuncios/${itemId}`)
      .then(res => {
        setAnoFabricacao(res.data[0].anoFabricacao.toString())
        setAnoModelo(res.data[0].anoModelo.toString())
        setDescricaoVeiculo(res.data[0].descricaoVeiculo)
        setNomeFabricante(res.data[0].nomeFabricante)
        setVeiculoMarca(res.data[0].veiculoMarca)
        setVeiculoValor(res.data[0].veiculoValor)
      })
      .catch(e => {
        console.log("Erro ao coletar anúncio pelo seu id")
      })
  }, [navigation, itemId])

  const salvar = async () => {
    let dados = {
      anoFabricacao: parseInt(anoFabricacao),
      anoModelo: parseInt(anoModelo),
      descricaoVeiculo,
      nomeFabricante,
      veiculoMarca,
      veiculoValor,
    }
    await api.patch(`anuncios/${itemId}`, dados)
      .then(res => {
        navigation.navigate("Painel de Anúncios", {
          mensagem: res.data.message,
          visibilidade: true
        })
      })
      .catch(e => {
        navigation.navigate("Painel de Anúncios", {
          mensagem: e.message,
          visibilidade: true
        })
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.textSubSecao}>Troque o nome do fabricante</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Nome do fabricante"
            mode="outlined"
            keyboardType="default"
            value={nomeFabricante}
            onChangeText={e => setNomeFabricante(e)}
            outlineColor="lightgrey"
          />
        </View>
        <Text style={styles.textSubSecao}>Troque a marca</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Marca"
            mode="outlined"
            keyboardType="default"
            value={veiculoMarca}
            onChangeText={e => setVeiculoMarca(e)}
            outlineColor="lightgrey"
          />
        </View>
        <Text style={styles.textSubSecao}>Troque o
          modelo</Text>
        <View style={styles.inputContainer}>
          <TextInput label="Modelo"
            mode="outlined"
            keyboardType="default"
            value={descricaoVeiculo}
            onChangeText={e => setDescricaoVeiculo(e)}
            outlineColor="lightgrey"
          />
        </View>
        <Text style={styles.textSubSecao}>Troque o ano de fabricação</Text>
        <View style={styles.inputContainer}>
          <TextInput label="Ano de fabricação"
            mode="outlined"
            keyboardType="numeric"
            value={anoFabricacao}
            onChangeText={e => setAnoFabricacao(e)}
            outlineColor="lightgrey"
          />
        </View>
        <Text style={styles.textSubSecao}>Troque o ano do
          modelo</Text>
        <View style={styles.inputContainer}>
          <TextInput label="Ano do 
          modelo"
            mode="outlined"
            keyboardType="numeric"
            value={anoModelo}
            onChangeText={e => setAnoModelo(e)}
            outlineColor="lightgrey"
          />
        </View>
        <Text style={
          styles.textSubSecao}>Troque valor do veículo</Text>
        <View style={styles.inputContainer}>
          <TextInput label="Valor do veículo"
            mode="outlined"
            keyboardType="numeric"
            value={veiculoValor}
            onChangeText={e => setVeiculoValor(e)}
            outlineColor="lightgrey"
          />
        </View>
        <Button
          mode="contained"
          color="#FF7D04"
          style={styles.botao}
          labelStyle={{ color: "white" }}
          onPress={() => salvar()}
        >
          Salvar Alterações
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainerTop: {
    margin: 8,
    marginTop: 100
  },
  inputContainer: {
    margin: 8
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

export default AlterarDadosAnuncio;