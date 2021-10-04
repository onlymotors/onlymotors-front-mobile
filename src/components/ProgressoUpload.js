import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { View, Text, StyleSheet } from 'react-native';
import api from '../services/api';
import { ActivityIndicator, ProgressBar } from 'react-native-paper';

const ProgressoUpload = (props) => {

  useEffect(() => {
    const data = new FormData();
    data.append("file", {
      uri: props.file.uri,
      type: props.type,
      name: props.file.name
    });

    api.post(props.apiUrl, data)
      .then(res => {
        props.navigation.navigate('Only Motors', {
          mensagem: res.data.message,
          visibilidade: true
        });
      })
      .catch(e => {
        props.navigation.navigate('Only Motors', {
          mensagem: e.message,
          visibilidade: true
        });
      })

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