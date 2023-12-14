import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MapaScreen from './GUI/Mapa';
import AddScreen from './GUI/Adicionar';
import ExibScreen from './GUI/Listar';
import EditScreen from './GUI/Editar';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Nova Localização" component={AddScreen} />
      <Stack.Screen name="Editar Localização" component={EditScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Mapa">
            <Drawer.Screen name="Mapa" component={MapaScreen} />
            <Drawer.Screen name="Nova Localização" component={AddScreen} />
            <Drawer.Screen name="Localizações" component={ExibScreen} />
            <Drawer.Screen name="Editar Localização" component={EditScreen}  options={{drawerItemStyle: {height: 0}}} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}
