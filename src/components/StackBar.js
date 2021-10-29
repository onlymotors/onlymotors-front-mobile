import React, { useState } from "react";
import { Appbar } from "react-native-paper";


function StackBar({ navigation, back, route }) {


  return (
    <Appbar.Header>
      {/* <Appbar.Action icon="menu" onPress={() => { navigation.openDrawer() }} /> */}
      {route.params.title === "Painel de Busca"
        ?
        <Appbar.BackAction color="white" onPress={navigation.goBack} />
        :
        <>
          <Appbar.Action icon="menu" color="white" onPress={() => { navigation.openDrawer() }} />
        </>
      }
      <Appbar.Content title={route.params.title} color="white" />
      <Appbar.Action icon="magnify" color="white" onPress={() => { navigation.navigate("Painel de Busca") }} />
    </Appbar.Header>
  );
}

export default StackBar;