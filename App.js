
import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/Routes';

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
      <Routes />
    </PaperProvider>
  );
};

export default App;