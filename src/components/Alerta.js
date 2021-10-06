import React from 'react';
import { StyleSheet } from 'react-native';
import { Banner } from 'react-native-paper';

const Alerta = (props) => {

  return (
    <Banner
      // theme={{ colors: { text: 'white' } }}
      visible={props.visible}
      // style={styles.alertaContainer}
      actions={[
        {
          label: 'Aceitar',
          onPress: () => props.setVisible(false),
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