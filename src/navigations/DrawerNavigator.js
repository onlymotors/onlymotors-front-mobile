import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerBar from '../components/DrawerBar';
import StackNavigator from './StackNavigator';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerBar {...props} backBehavior="history" />}
    >
      <Drawer.Screen name="Only Motors" component={StackNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;