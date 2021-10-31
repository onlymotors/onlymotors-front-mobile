import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Busca from "../screens/Busca";
import InserirAnuncio from '../screens/InserirAnuncio';
import Anuncio from '../screens/Anuncio';
import Login from '../screens/Login';
import AlterarDados from '../screens/AlterarDados';
import CadastroUsuario from '../screens/CadastroUsuario';
import PainelUsuario from '../screens/PainelUsuario';
import PainelAnuncios from '../screens/PainelAnuncios';
import AlterarDadosAnuncio from '../screens/AlterarDadosAnuncio';
import Visualizador from '../screens/Visualizador';
import Chat from '../screens/Chat';
import ChatRoom from '../screens/ChatRoom';
import StackBar from "../components/StackBar";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <StackBar {...props} />,
      }}
    >
      {/* <Stack.Screen name="Página Inicial" component={Home} initialParams={{ title: "Only Motors", mensagem: "", visibilidade: false }} /> */}
      <Stack.Screen name="Home" component={Home} initialParams={{ title: "Only Motors", mensagem: "", visibilidade: false }} />
      <Stack.Screen name="Login" component={Login} initialParams={{ title: "Only Motors", mensagem: "", visibilidade: false }} />
      <Stack.Screen name="Painel de Busca" component={Busca} options={{ headerMode: "float", headerShown: false }} initialParams={{ title: "Painel de Busca", anuncio: "testando" }} />
      <Stack.Screen name="Painel de Anúncios" component={PainelAnuncios} initialParams={{ title: "Painel de Anúncios", mensagem: "", visibilidade: false }} />
      <Stack.Screen name="Chat" component={Chat} initialParams={{ title: "Chat" }} />
      <Stack.Screen name="Chat Room" component={ChatRoom} initialParams={{ title: "Chat Room", chatRoomId: "", token: "" }} />
      <Stack.Screen name="Inserir Anúncio" component={InserirAnuncio} initialParams={{ title: "Inserir Anúncio" }} />
      <Stack.Screen name="Anúncio" component={Anuncio} initialParams={{ title: "Anúncio" }} />
      <Stack.Screen name="Alterar Dados Cadastrais" component={AlterarDados} initialParams={{ title: "Alterar Dados Cadastrais", token: "", senha: "" }} />
      <Stack.Screen name="Cadastro de Usuário" component={CadastroUsuario} initialParams={{ title: "Cadastro de Usuário" }} />
      <Stack.Screen name="Painel do Usuário" component={PainelUsuario} initialParams={{ title: "Painel do Usuário", mensagem: "", visibilidade: false }} />
      <Stack.Screen name="Alterar Dados do Anúncio" component={AlterarDadosAnuncio} initialParams={{ title: "Alterar Dados do Anúncio" }} />
      <Stack.Screen name="Visualizador" component={Visualizador} initialParams={{ title: "Visualizador", imagem: "" }} />
    </Stack.Navigator>
  );
}

export default StackNavigator;