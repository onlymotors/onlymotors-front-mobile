import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import api from '../services/api';
import Alerta from '../components/Alerta';
import Resultados from '../components/Resultados';

const Home = ({ route, navigation }) => {

  const [anuncios, setAnuncios] = useState([]);
  const [contadorPagina, setContadorPagina] = useState(20)
  const [numAnuncios, setNumAnuncios] = useState(0);
  const isFocused = useIsFocused();
  const { mensagem } = route.params;
  const { visibilidade } = route.params;
  const [visible, setVisible] = useState(visibilidade);

  useEffect(() => {
    setVisible(visibilidade)
    api(`anuncios?pular=0&limitar=20&contar=true`)
      .then(res => {
        setNumAnuncios(res.data.numAnuncios)
        setContadorPagina(contadorPagina + 20)
        setAnuncios(res.data.anuncio)
      })
      .catch(e => {
        console.log("Erro ao coletar anuncios")
      })
  }, [isFocused === true])

  const trocarPagina = async () => {
    if (anuncios.length < numAnuncios) {
      await api(`anuncios?pular=0&limitar=${contadorPagina}`)
        .then(r => {
          setContadorPagina(contadorPagina + 20)
          setAnuncios(r.data.anuncio)
        })
        .catch(e => {
          console.log("Erro ao coletar anuncios")
        })
    }
  }

  const executarTrocarPagina = () => {
    trocarPagina()
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

  return (
    <SafeAreaView>
      <Alerta mensagem={mensagem} visible={visible} reset={reset} navigation={navigation} />
      <Resultados
        route={route}
        navigation={navigation}
        anuncios={anuncios}
        numAnuncios={numAnuncios}
        trocarPagina={executarTrocarPagina}
        isHeader={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  header: {
    padding: 15,
    alignSelf: "center"
  },
  headerTitulo: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700"
  },
  headerSubTitulo: {
    textAlign: "center"
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },
  listTitulo: {
    fontSize: 18,
  },
  listPreco: {
    color: "black",
    paddingTop: 15,
    fontSize: 22,
  }
});

export default Home;