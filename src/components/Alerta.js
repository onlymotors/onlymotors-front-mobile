import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Banner } from 'react-native-paper';

const Alerta = (props) => {

  const [visible, setVisible] = React.useState();
  const [innerMensagem, setInnerMensagem] = useState();

  useEffect(() => {
    setInnerMensagem(props.mensagem)
    setVisible(props.visibilidade)
  }, [props.mensagem, props.visibilidade])

  return (
    <Banner
      // theme={{ colors: { text: 'white' } }}
      visible={visible}
      // style={styles.alertaContainer}
      actions={[
        {
          label: 'Aceitar',
          onPress: () => setVisible(false),
        }
      ]}
    >
      {innerMensagem}
    </Banner>
  )
}

// const styles = StyleSheet.create({
//   alertaContainer: {
//     backgroundColor: "black",
//   },
// });

export default Alerta;