import React, { useEffect, useState } from 'react';
import { Banner } from 'react-native-paper';

const Alerta = (props) => {

  const [visible, setVisible] = React.useState();
  const [innerMensagem, setInnerMensagem] = useState();

  useEffect(() => {
    console.log(props.mensagem, props.visibilidade)
    setInnerMensagem(props.mensagem)
    setVisible(props.visibilidade)
  }, [props.mensagem, props.visibilidade])

  return (
    <Banner
      visible={visible}
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

export default Alerta;