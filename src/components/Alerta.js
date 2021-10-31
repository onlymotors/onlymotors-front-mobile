import React from 'react';
// import { StyleSheet } from 'react-native';
import { Banner } from 'react-native-paper';

const Alerta = (props) => {

  // const reset = () => {
  //   props.setVisible(false)
  // props.navigation.reset({
  //   index: 0,
  //   routes: [
  // {
  //   name: 'Only Motors',
  //   params: { mensagem: "", visibilidade: false },
  // },
  // {
  //   name: 'Login',
  //   params: { mensagem: "", visibilidade: false },
  // },
  // {
  //   name: 'Painel de Anúncios',
  //   params: { mensagem: "", visibilidade: false },
  // },
  // {
  //   name: 'Alterar Dados Cadastrais',
  //   params: { token: "", senha: "" },
  // },
  // {
  //   name: 'Painel do Usuário',
  //   params: { mensagem: "", visibilidade: false },
  // },
  //   ],
  // });
  // }

  return (
    <Banner
      // theme={{ colors: { text: 'white' } }}
      visible={props.visible}
      // style={styles.alertaContainer}
      actions={[
        {
          label: 'Aceitar',
          onPress: () => props.reset(),
        }
      ]}
    >
      {props.mensagem}
    </Banner>
  )
}

// const styles = StyleSheet.create({
//   alertaContainer: {
//     backgroundColor: "black",
//   },
// });

export default Alerta;