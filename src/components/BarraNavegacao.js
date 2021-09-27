import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'

const BarraNavegacao = (props) => {

  const token = localStorage.getItem("token");
  // const token = AsyncStorage.getItem("token");

  if (token) {
    return (
      <DrawerContentScrollView {...props}>
        <Drawer.Section>
          <DrawerItem
            label="NomeUsuario"
            labelStyle={styles.textSecao}
            onPress={() => { props.navigation.navigate('Painel do Usuário') }}
          />
        </Drawer.Section>
        <DrawerItem
          label="Página Inicial"
          onPress={() => { props.navigation.navigate('Only Motors') }}
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
          onPress={() => { localStorage.clear(); props.navigation.navigate('Only Motors'); }}
        // onPress={() => { AsyncStorage.clear(); props.navigation.navigate('Only Motors'); }}
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
        onPress={() => { props.navigation.navigate('Only Motors') }}
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

export default BarraNavegacao;

