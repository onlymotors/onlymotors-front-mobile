import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../services/api';
import { ActivityIndicator } from 'react-native-paper';

const ProgressoUpload = (props) => {

  useEffect(() => {
    const data = new FormData();
    data.append(props.requestName, {
      uri: props.file.uri,
      type: props.type,
      name: props.file.name
    });
    if (props.httpMethod === "post") {
      api.post(props.apiUrl, data)
        .then(res => {
          props.navigation.navigate('Home', {
            mensagem: res.data.message,
            visibilidade: true
          });
        })
        .catch(e => {
          props.navigation.navigate('Home', {
            mensagem: e.message,
            visibilidade: true
          });
        })
        .finally(() => {
          try {
            props.setRenderizar(props.renderizar + 1)
          } catch (e) {
          }
        })
    } else {
      api.patch(props.apiUrl, data)
        .then(res => {
          props.navigation.navigate('Painel de Anúncios', {
            mensagem: res.data.message,
            visibilidade: true
          });
        })
        .catch(e => {
          props.navigation.navigate('Painel de Anúncios', {
            mensagem: e.message,
            visibilidade: true
          });
        })
        .finally(() => {
          try {
            props.setRenderizar(props.renderizar + 1)
          } catch (e) {
          }
        })
    }
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size="large" />
      <Text style={styles.texto}>{props.status}</Text>
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