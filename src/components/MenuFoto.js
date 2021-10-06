import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";

const MenuFoto = (props) => {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >
      <RBSheet
        ref={props.refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
            marginLeft: 30,
            marginRight: 30
          },
          container: {
            height: 200,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          },
          draggableIcon: {
            backgroundColor: "#FF7D04"
          }
        }}
      >
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <List.Item
            title="Visualizar"
            style={{ padding: 3, marginHorizontal: 10 }}
            left={props => <List.Icon {...props} icon="eye" color="#FF7D04" />}
            onPress={() => { props.visualizar() }}
          />
          <List.Item
            title="Trocar foto"
            style={{ padding: 3, marginHorizontal: 10 }}
            left={props => <List.Icon {...props} icon="image-plus" color="#FF7D04" />}
            onPress={() => { props.inserirFoto() }}
          />
          <List.Item
            title="Deletar foto"
            style={{ padding: 3, marginHorizontal: 10 }}
            left={props => <List.Icon {...props} icon="delete" color="#FF7D04" />}
            onPress={() => { props.deletarFoto() }}
          />
        </View>
      </RBSheet>
    </View>
  );
}

export default MenuFoto;