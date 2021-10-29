
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import DrawerNavigator from './src/navigations/DrawerNavigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF7D04',
    bannerTexto: "white"
  },
}

const App = () => {

  console.log("Bem-Vindo");

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;