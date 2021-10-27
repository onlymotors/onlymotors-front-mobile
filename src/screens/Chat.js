import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../services/api';
import Alerta from '../components/Alerta';
import { Button, TextInput } from 'react-native-paper';
import { setToken } from '../services/tokenService';
import { useIsFocused } from '@react-navigation/core';

const Chat = ({ navigation, route }) => {

  const isFocused = useIsFocused();
 

  useEffect(() => {
   
  }, [isFocused]);

  
  return (
    <View>
      

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainerTop: {
    margin: 8,
    marginTop: 100
  },
  inputContainer: {
    margin: 8
  },
  texto: {
    marginTop: 46,
    alignSelf: "center"
  },
  botao: {
    marginTop: 46,
    alignSelf: "center"
  }
})


export default Chat;