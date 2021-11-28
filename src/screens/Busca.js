import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import api from '../services/api';
import Resultados from "../components/Resultados";
import { Button, TextInput, Searchbar, IconButton } from 'react-native-paper';
import { geradorRandomico } from '../services/geradores';
import DropDown from 'react-native-paper-dropdown';
import numeral from '../services/formatador';
import { Ionicons } from '@expo/vector-icons';

const Busca = ({ navigation, back, route }) => {

  // let contadorPagina = 20;
  // let contar = "true";
  const searchInput = useRef();
  const [visible, setVisible] = useState(true);
  const [showSearchQuery, setShowSearchQuery] = useState(true);
  const [showFiltro, setShowFiltro] = useState(false);
  const [showResultados, setShowResultados] = useState(true);
  const [showAfterSearch, setShowAfterSearch] = useState(false);

  const [valorMinimo, setValorMinimo] = useState("");
  const [valorMaximo, setValorMaximo] = useState("");
  const [marca, setMarca] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [modelo, setModelo] = useState("");
  const [modelos, setModelos] = useState([]);
  const [ano, setAno] = useState("");
  const [anos, setAnos] = useState([]);
  const [resCampoBusca, setResCampoBusca] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [possiveisResultados, setPossiveisResultados] = useState([]);

  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownAno, setShowDropDownAno] = useState(false);

  const onChangeSearch = query => setSearchQuery(query);

  const [anuncios, setAnuncios] = useState();
  const [contadorPagina, setContadorPagina] = useState(20)
  const [contar, setContar] = useState("")
  // const [numAnuncios, setNumAnuncios] = useState(0);
  const [buscador, setBuscador] = useState("");
  const [sugerido, setSugerido] = useState("");

  useEffect(() => {

    setContar("true")

    let lista = [{ label: "Ano", value: "Ano" }]
    for (let index = 2022; index >= 1901; index--) {
      lista.push({ label: String(index), value: String(index) })
    }
    setAnos(lista)
    api('search/colecoes')
      .then(res => {
        let listaMa = res.data.marcas
        listaMa.sort((a, b) => a.localeCompare(b))
        let listaMarcas = [{ label: "Marca", value: "Marca" }]
        listaMa.map(item => {
          listaMarcas.push({
            label: item,
            value: item
          })
        })
        setMarcas(listaMarcas)
        let listaMo = res.data.modelos
        listaMo.sort((a, b) => a.localeCompare(b))
        let listaModelos = [{ label: "Modelo", value: "Modelo" }]
        listaMo.map(item => {
          listaModelos.push({
            label: item,
            value: item
          })
        })
        setModelos(listaModelos)
        setResCampoBusca(res.data.resCampoBusca)
        // setVisible(true)
        setPossiveisResultados(res.data.resCampoBusca)
        searchInput.current.focus()
      })
      .catch(e => {
        console.log("Erro ao coletar coleçoes de busca")
      })
  }, [])

  useEffect(() => {
    // const items = ['item 1', 'thing', 'id-3-text', 'class'];
    if (searchQuery) {
      const matches = resCampoBusca.filter(s => s.includes(searchQuery));
      setPossiveisResultados(matches)
    } else {
      setPossiveisResultados(resCampoBusca);
    }

  }, [searchQuery])

  const buscarPalavras = async () => {
    // let marcaVeiculo = "";
    // let modeloVeiculo = "";
    if (marca === "Ano" && modelo === "Modelo") {
      let matches = resCampoBusca.filter(s => s.includes(searchQuery))
      if (matches.length) {
        matches.forEach(item => {
          let itemSplit = item.split(" ")
          let searchSplit = searchQuery.split(" ")
          if (itemSplit.length === 1) {
            if (itemSplit[0].toLowerCase() === searchSplit[0].toLowerCase()) {
              setMarca(item)
              // marcaVeiculo = item
            }
          } else {
            if (searchSplit.length > 1) {
              if (itemSplit[1].toLowerCase() === searchSplit[1].toLowerCase()) {
                setMarca(itemSplit[0])
                // marcaVeiculo = itemSplit[0]
                setModelo(itemSplit[1])
                // modeloVeiculo = itemSplit[1]
              }
              if (itemSplit[1].toLowerCase() === searchSplit[0].toLowerCase()) {
                setMarca(itemSplit[0])
                // marcaVeiculo = itemSplit[0]
                setModelo(itemSplit[1])
                // modeloVeiculo = itemSplit[1]
              }
            } else {
              if (itemSplit[0].toLowerCase() === searchSplit[0].toLowerCase()) {
                setMarca(itemSplit[0])
                // marcaVeiculo = itemSplit[0]
              }
              if (itemSplit[1].toLowerCase() === searchSplit[0].toLowerCase()) {
                setModelo(itemSplit[1])
                // modeloVeiculo = itemSplit[1]
              }
            }
          }
        })
      }
    }
    if (searchQuery !== "") {
      await api.get(`search/${searchQuery}?pular=0&limitar=${contadorPagina}&contar=${contar}`)
        .then(res => {
          // if (res.data.numAnuncios)
          //   setNumAnuncios(res.data.numAnuncios)
          setContadorPagina(contadorPagina + 20);
          setContar("false");
          setAnuncios(res.data.anuncio)
          setBuscador("buscarPalavras")
        })
        .catch(e => {
          console.log("Erro ao coletar anuncios")
        })
    } else {
      await api.get(`anuncios?pular=0&limitar=${contadorPagina}&contar=${contar}`)
        .then(res => {
          // if (res.data.numAnuncios)
          //   setNumAnuncios(res.data.numAnuncios)
          setContadorPagina(contadorPagina + 20);
          setContar("false");
          setAnuncios(res.data.anuncio)
          setBuscador("buscarPalavras")
        })
        .catch(e => {
          console.log("Erro ao coletar anuncios")
        })
    }
  }

  const buscarFiltros = async () => {
    let marcaVeiculo = marca
    if (marca === "Marca")
      marcaVeiculo = ""
    let modeloVeiculo = modelo
    if (modelo === "Modelo")
      modeloVeiculo = ""
    let anoVeiculo = ano
    if (ano === "Ano")
      anoVeiculo = "0"
    let valMinimo = valorMinimo
    if (valorMinimo === "") {
      valMinimo = "0"
    }
    let valMaximo = valorMaximo
    if (valorMaximo === "") {
      valMaximo = "0"
    }
    await api.get(`search?palavras=${searchQuery}&marca=${marcaVeiculo}&modelo=${modeloVeiculo}&ano=${anoVeiculo}&valorMinimo=${valMinimo}&valorMaximo=${valMaximo}&pular=0&limitar=${contadorPagina}&contar=${contar}`)
      .then(res => {
        // if (res.data.numAnuncios)
        //   setNumAnuncios(res.data.numAnuncios)
        setContadorPagina(contadorPagina + 20)
        setContar("false")
        setAnuncios(res.data.anuncio)
        setBuscador("buscarFiltros")
      })
      .catch(e => {
        console.log("Erro ao coletar anuncios")
      })
  }

  const buscarSugerido = async (item) => {
    let itemSplit = item.split(" ")
    if (itemSplit.length > 1) {
      setMarca(itemSplit[0])
      setModelo(itemSplit[1])
    } else {
      setMarca(itemSplit[0])
    }
    await api.get(`search/${item}?pular=0&limitar=${contadorPagina}&contar=${contar}`)
      .then(res => {
        // if (res.data.numAnuncios)
        //   setNumAnuncios(res.data.numAnuncios)
        setContadorPagina(contadorPagina + 20);
        setContar("false");
        setAnuncios(res.data.anuncio)
        setBuscador("buscarSugerido")
      })
      .catch(e => {
        console.log("Erro ao coletar anuncios")
      })
  }

  const mascararValor = (value, cb) => {
    var number = numeral(value).format();
    number = "R$ " + number
    cb(number);
  };

  const selecionadorBuscador = () => {
    if (buscador === "buscarSugerido")
      buscarSugerido(sugerido)
    else if (buscador === "buscarFiltros")
      buscarFiltros()
    else
      buscarPalavras()
  }


  useEffect(() => {
    selecionadorBuscador()
  }, [contar === "true"])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showSearchQuery &&
        // Seção SearchQuery
        <View>
          <View style={styles.container}>
            <View>
              <Searchbar
                icon="arrow-left"
                style={styles.barraBusca}
                mode="outlined"
                placeholder="Digite a marca ou o modelo"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={navigation.goBack}
                ref={searchInput}
                onFocus={() => {
                  setVisible(true);
                  setShowAfterSearch(false);
                }}
                onEndEditing={() => {
                  setVisible(false);
                  // setShowResultados(true);
                  setShowAfterSearch(true);
                  Keyboard.dismiss();
                }}
                onSubmitEditing={() => {
                  setBuscador("buscarPalavras")
                  setVisible(false);
                  // setShowResultados(true);
                  setShowAfterSearch(true);
                  setContadorPagina(20);
                  setContar("true");
                  // buscarPalavras();
                }}
              // onTouchEnd={() => {
              //   setVisible(false);
              //   setShowResultados(true);
              //   setShowAfterSearch(true);
              // }}
              // onBlur={() => {
              //   setVisible(false);
              //   setShowResultados(true);
              //   setShowAfterSearch(true);
              //   // Keyboard.dismiss();
              // }}
              />
            </View>
            {showAfterSearch &&
              // Seção AfterSearch
              <View
                style={styles.afterSearchRow}
              >
                {/* <Text style={styles.textoAnuEncontrados}>
                  {numAnuncios} anúncios encontrados
                </Text> */}
                <View style={styles.badge}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowFiltro(true);
                      setShowResultados(false);
                      setShowAfterSearch(false);
                      setShowSearchQuery(false);
                    }}
                  >
                    <View style={styles.headerBotaoFiltrar}>
                      <Text style={styles.textoBadge}>
                        Filtrar
                      </Text>
                      <Ionicons
                        name="options"
                        size={20}
                        color="white"
                        style={styles.headerIcon}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            }
          </View>
          <ScrollView keyboardShouldPersistTaps="handled" style={styles.queryPossiveis}>
            {visible && possiveisResultados.map(item =>
              <TouchableOpacity key={geradorRandomico(10)} onPress={() => {
                setBuscador("buscarSugerido")
                setSugerido(item)
                setSearchQuery(item);
                setVisible(false);
                setShowResultados(true);
                setShowAfterSearch(true);
                setContadorPagina(20);
                setContar("true");
                // buscarSugerido(item);
                Keyboard.dismiss();

              }} >
                <View>
                  <Text
                    key={geradorRandomico(10)}
                    style={styles.resPossiveis}
                  >
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      }
      {showFiltro &&
        // Seção Filtro
        <ScrollView>
          <View style={styles.headerFiltros}>
            <View style={styles.flexContainer}>
              <TouchableOpacity
                onPress={() => {
                  setMarca("Marca");
                  setModelo("Modelo");
                  setAno("Ano");
                  setValorMinimo("");
                  setValorMaximo("");
                }}
              >
                <Text style={styles.botaoLimpar}>
                  Limpar
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.flexContainer}>
              <Text style={styles.headerFiltrosTitulo}>Filtros</Text>
            </View>
            <View style={styles.flexContainer}>
              <IconButton
                icon="close"
                color="white"
                size={18}
                style={styles.botaoFechar}
                onPress={() => {
                  setShowFiltro(false);
                  setShowResultados(true);
                  setShowAfterSearch(true);
                  setShowSearchQuery(true)
                }}
              />
            </View>
          </View>
          <View style={styles.espacamento}>
            <Text>Filtrar por:</Text>
          </View>
          <View style={styles.espacamento}>
            <DropDown
              label={"Marca"}
              mode={"outlined"}
              visible={showMultiSelectDropDown}
              showDropDown={() => setShowMultiSelectDropDown(true)}
              onDismiss={() => setShowMultiSelectDropDown(false)}
              value={marca}
              setValue={e => setMarca(e)}
              list={marcas}
            />
          </View>
          <View style={styles.espacamento}>
            <DropDown
              label={"Modelo"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={modelo}
              setValue={e => setModelo(e)}
              list={modelos}

            />
          </View>
          <View style={styles.espacamento}>
            <DropDown
              label={"Ano"}
              mode={"outlined"}
              visible={showDropDownAno}
              showDropDown={() => setShowDropDownAno(true)}
              onDismiss={() => setShowDropDownAno(false)}
              value={ano}
              setValue={e => setAno(e)}
              list={anos}
            />
          </View>
          <View style={styles.espacamento}>
            <Text>Valor (R$):</Text>
          </View>
          <View style={styles.espacamentoFinal}>
            <View style={styles.flexContainerRow}>
              <View style={styles.flexContainer}>
                <TextInput label="Min"
                  mode="outlined"
                  keyboardType="numeric"
                  value={valorMinimo}
                  style={styles.valorInput}
                  onChangeText={e => mascararValor(e, setValorMinimo)}
                  outlineColor="lightgrey"
                />
              </View>
              <View style={styles.flexContainer}>
                <TextInput label="Max"
                  mode="outlined"
                  keyboardType="numeric"
                  value={valorMaximo}
                  style={styles.valorInput}
                  onChangeText={e => mascararValor(e, setValorMaximo)}
                  outlineColor="lightgrey"
                />
              </View>
            </View>
          </View>
          <View style={styles.espacamento}>
            <Button
              mode="contained"
              color="#FF7D04"
              style={styles.botao}
              labelStyle={styles.botaoLabel}
              onPress={() => {
                setBuscador("buscarFiltros")
                setShowFiltro(false);
                setShowResultados(true);
                setShowAfterSearch(true);
                setShowSearchQuery(true);
                setSearchQuery("");
                setContadorPagina(20);
                setContar("true");
                // buscarFiltros();
              }}
            >
              Filtrar
            </Button>
          </View>
        </ScrollView>
      }
      {showResultados &&
        // Seção Resultados
        <View style={styles.flexContainer}>
          <Resultados
            route={route}
            navigation={navigation}
            anuncios={anuncios}
            // numAnuncios={numAnuncios}
            trocarPagina={selecionadorBuscador}
            isHeader={false}
          />
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  // ResPossiveis
  container: {
    paddingBottom: 8,
    paddingTop: 24,
    backgroundColor: "white",
    elevation: 4,
  },
  barraBusca: {
    padding: 0,
    elevation: 0,
    paddingLeft: 4,
    paddingRight: 4
  },
  resPossiveis: {
    paddingLeft: 60,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 18
  },
  queryPossiveis: {
    backgroundColor: "white",
    elevation: 1
  },


  // Filtro
  flexContainerRow: {
    flexDirection: "row"
  },
  flexContainer: {
    flex: 1
  },
  espacamento: {
    paddingTop: 20,
    paddingRight: 8,
    paddingLeft: 8
  },
  espacamentoFinal: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 8,
    paddingLeft: 8
  },
  valorContainer: {
    flexDirection: "row",
    paddingTop: 20,
    paddingRight: 6,
    paddingLeft: 6,
    paddingBottom: 20
  },
  valorInput: {
    paddingLeft: 2,
    paddingRight: 2
  },
  botao: {
    alignSelf: "center",
  },
  botaoLabel: {
    color: "white",
    fontSize: 30
  },
  headerFiltros: {
    flexDirection: "row",
    padding: 5,
    paddingBottom: 8,
    paddingTop: 33,
    elevation: 4,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerFiltrosTitulo: {
    fontSize: 18,
    textAlign: "center"
  },
  botaoFechar: {
    alignSelf: "flex-end",
    backgroundColor: "#1b9382"
  },
  botaoLimpar: {
    color: "#1b9382",
    paddingLeft: 6,
    fontSize: 15,
    textAlignVertical: "center",
    textDecorationLine: "underline",
    fontWeight: "bold"
  },


  // AfterSearch
  afterSearchRowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#D5D5D5",
    borderTopWidth: 1,
    paddingTop: 8,
    paddingLeft: 19,
    paddingRight: 19,
    position: "absolute",
    bottom: 0
  },
  afterSearchRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    justifyContent: "flex-end",
    borderTopColor: "#D5D5D5",
    borderTopWidth: 1,
    paddingTop: 8,
    paddingLeft: 19,
    paddingRight: 19
  },
  headerBotaoFiltrar: {
    flexDirection: "row",
    justifyContent: 'center'
  },
  headerIcon: {
    textAlignVertical: "center",
    paddingLeft: 10
  },
  badge: {
    borderColor: "#FF7D04",
    borderRadius: 50,
    backgroundColor: "#1b9382",
    fontSize: 12,
    alignSelf: "flex-end",
    padding: 4,
    paddingLeft: 15,
    paddingRight: 15,
  },
  textoBadge: {
    textAlignVertical: "center",
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  textoAnuEncontrados: {
    textAlignVertical: "center"
  },

})

export default Busca;