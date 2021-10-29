import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerStatus
} from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import api from '../services/api';
import { getToken, clearToken } from '../services/tokenService';

const DrawerBar = (props) => {

  const drawerOpen = useDrawerStatus()
  const [nomeUser, setNomeUser] = useState("")
  const [token, setToken] = useState();
  const [active, setActive] = React.useState('');

  useEffect(() => {
    if (drawerOpen === "open") {
      getToken()
        .then(res => {
          setToken(res)
        })
        .catch(e => {
          console.log("Erro ao coletar o token no menu")
        })
    }
  }, [drawerOpen])

  const getUser = () => {
    api(`users/userid`)
      .then(res => {
        setNomeUser(res.data[0].nomeUser.split(" ")[0])
      })
      .catch(e => {
        console.log("Erro ao coletar o nomeUser no menu")
        clearToken()
      })
  }

  if (token !== null) {

    getUser()

    return (
      <DrawerContentScrollView {...props}>
        <Drawer.Section>
          <DrawerItem
            label={nomeUser}
            labelStyle={styles.textSecao}
            onPress={() => { props.navigation.navigate('Painel do Usuário') }}
          />
        </Drawer.Section>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          label="Página Inicial"
          onPress={() => { props.navigation.navigate('Home') }}
        />
        <DrawerItem
          label="Painel de Anúncios"
          onPress={() => { props.navigation.navigate('Painel de Anúncios') }}
        />
        <DrawerItem
          label="Chat"
          onPress={() => { props.navigation.navigate('Chat') }}
        />
        <DrawerItem
          label="Inserir Anúncio"
          onPress={() => { props.navigation.navigate('Inserir Anúncio') }}
        />
        <DrawerItem
          label="Sair"
          onPress={() => { clearToken(); props.navigation.navigate('Home'); }}
        />
      </DrawerContentScrollView>
    )
  }

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section>
        <DrawerItem
          label="Acesse sua conta"
          labelStyle={styles.textSecao}
          onPress={() => { props.navigation.navigate('Login') }}
        />
      </Drawer.Section>
      <DrawerItem
        label="Página Inicial"
        onPress={() => { props.navigation.navigate('Home') }}
      />
      <DrawerItem
        label="Painel de Anúncios"
        onPress={() => { props.navigation.navigate('Login') }}
      />
      <DrawerItem
        label="Chat"
        onPress={() => { props.navigation.navigate('Login') }}
      />
      <DrawerItem
        label="Inserir Anúncio"
        onPress={() => { props.navigation.navigate('Login') }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  textSecao: {
    fontSize: 20
  },
});

export default DrawerBar;

