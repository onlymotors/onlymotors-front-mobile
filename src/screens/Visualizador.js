import React from 'react';
import { Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { API_URL } from '../services/api';

const Visualizador = ({ navigation, route }) => {

  const { imagem } = route.params;

  const imagens = [
    {
      url: imagem || API_URL + "images/sem_foto.png"
    }
  ]

  return (
    <ImageViewer
      renderIndicator={() => <Text></Text>}
      imageUrls={imagens}
    />
  )
}

export default Visualizador;