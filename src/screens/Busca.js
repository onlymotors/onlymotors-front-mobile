import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import api, { API_URL } from '../services/api';
import Alerta from '../components/Alerta';
import { Button, TextInput, List } from 'react-native-paper';
import { setToken } from '../services/tokenService';
import { useIsFocused } from '@react-navigation/core';

const Busca = ({ navigation, route }) => {

  return (
    <Text> Olá
    </Text>
  )

}

const styles = StyleSheet.create({

})


export default Busca;