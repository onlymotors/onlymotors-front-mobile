import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';

const MenuContexto = (props) => {

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const alterarStatusAnuncio = async () => {
    let dados
    if (props.status === "Republicar") {
      dados = {
        statusAnuncio: true
      }
    } else {
      dados = {
        statusAnuncio: false
      }
    }
    await api.patch(`anuncios/${props.anuncioId}`, dados)
      .then(res => {
        props.navigation.navigate("Painel de Anúncios", {
          mensagem: res.data.message
        })
      })
      .finally(() => {
        props.setVisible(true)
        props.setRenderizar(props.renderizar + 1)
      })
  }

  const excluir = async () => {
    api.delete(`anuncios/${props.anuncioId}`)
      .then(res => {
        props.navigation.navigate("Painel de Anúncios", {
          mensagem: res.data.message
        })
      })
      .finally(() => {
        props.setRenderizar(props.renderizar + 1)
        props.setVisible(true)
      })
  }

  return (

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      <Menu
        style={styles.menu}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu}>
            <Icon
              name='more-vert'
              size={24}
              color={'grey'}
            />
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            closeMenu();
            props.navigation.navigate('Anúncio', {
              itemId: props.anuncioId
            });
          }}
          title="Ver Anúncio"
        />
        <Menu.Item onPress={() => { closeMenu(); alterarStatusAnuncio() }} title={props.status} />
        <Menu.Item
          onPress={() => {
            closeMenu();
            props.navigation.navigate("Alterar Dados do Anúncio", {
              itemId: props.anuncioId
            });
          }}
          title="Editar"
        />
        <Menu.Item onPress={() => { closeMenu(); excluir() }} title="Excluir" />
      </Menu>
    </View>
  );

};

export default MenuContexto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  menu: {
    paddingTop: 40,
  }

});