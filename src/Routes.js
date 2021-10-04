
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Appbar } from 'react-native-paper';
import Home from './screens/Home';
import InserirAnuncio from './screens/InserirAnuncio';
import Anuncio from './screens/Anuncio';
import Login from './screens/Login';
import AlterarDados from './screens/AlterarDados';
import CadastroUsuario from './screens/CadastroUsuario';
import PainelUsuario from './screens/PainelUsuario';
import PainelAnuncios from './screens/PainelAnuncios';
import BarraNavegacao from './components/BarraNavegacao';
import { NavigationContainer } from '@react-navigation/native';
import AlterarDadosAnuncio from './screens/AlterarDadosAnuncio';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const Routes = () => {
  const Drawer = createDrawerNavigator();

  const drawerOptions = {
    drawerActiveTintColor: "#1b9382",
    headerStyle: {
      backgroundColor: '#FF7D04',
      borderBottomWidth: 0
    },
    headerTintColor: '#fff',
    headerShown: true,
    headerRight: () => (
      <Appbar.Action color="white" icon="magnify" onPress={() => { }} />
    )
  }

  const drawerOptionsAnuncio = {
    drawerActiveTintColor: "#1b9382",
    headerStyle: {
      backgroundColor: '#FF7D04',
      borderBottomWidth: 0
    },
    headerTintColor: '#fff',
    headerShown: true,
    headerRight: () => (
      <Appbar.Action color="white" icon="magnify" onPress={() => { }} />
    ),
    headerLeft: ({ route }) => (
      <Icon name={'chevron-left'} color='#ffffff' size={24} style={{ marginLeft: 14, marginRight: 14 }}
        onPress={() => { route.current?.goBack() }} />
    )
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <BarraNavegacao {...props} backBehavior="history" />}
      >
        <Drawer.Screen name="Only Motors" component={Home} options={drawerOptions} initialParams={{ mensagem: "", visibilidade: false }} />
        <Drawer.Screen name="Login" component={Login} options={drawerOptions} initialParams={{ mensagem: "", visibilidade: false }} />
        <Drawer.Screen name="Painel de Anúncios" component={PainelAnuncios} options={drawerOptions} initialParams={{ mensagem: "", visibilidade: false }} />
        <Drawer.Screen name="Chat" component={Login} options={drawerOptions} />
        <Drawer.Screen name="Inserir Anúncio" component={InserirAnuncio} options={drawerOptions} />
        <Drawer.Screen name="Anúncio" component={Anuncio} options={drawerOptions} />
        <Drawer.Screen name="Alterar Dados Cadastrais" component={AlterarDados} options={drawerOptions} initialParams={{ token: "", senha: "" }} />
        <Drawer.Screen name="Cadastro de Usuário" component={CadastroUsuario} options={drawerOptions} />
        <Drawer.Screen name="Painel do Usuário" component={PainelUsuario} options={drawerOptions} initialParams={{ mensagem: "", visibilidade: false }} />
        <Drawer.Screen name="Alterar Dados do Anúncio" component={AlterarDadosAnuncio} options={drawerOptions} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;