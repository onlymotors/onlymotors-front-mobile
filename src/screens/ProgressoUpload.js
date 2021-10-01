import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../services/api';
import { ProgressBar } from 'react-native-paper';

const ProgressoUpload = ({ route, navigation }) => {

  const { file } = route.params;
  const { status } = route.params;
  const { type } = route.params;
  const { apiUrl } = route.params;

  useEffect(() => {
    const data = new FormData();
    data.append("file", {
      uri: file.uri,
      type: type,
      name: file.name
    });

    api.post(apiUrl, data)
      .then(res => {
        navigation.navigate('Only Motors', {
          mensagem: res.data.message,
          visibilidade: true
        });
      })
      .catch(e => {
        navigation.navigate('Only Motors', {
          mensagem: e.message,
          visibilidade: true
        });
      })

  }, [])

  return (
    <View style={styles.container}>
      <ProgressBar progress={1} color="#FF7D04" style={styles.progress} />
      <Text style={styles.texto}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  texto: {
    padding: 20
  },
  progress: {
    height: 5,
    width: 300
  }
});

export default ProgressoUpload;