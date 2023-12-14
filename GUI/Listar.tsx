import * as React from 'react';
import {useState, useEffect} from 'react';
import { Button, View, FlatList, Alert } from 'react-native';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { styled } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { FAB } from 'react-native-paper';
import { TouchableHighlight } from 'react-native-gesture-handler';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-key');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
    alert(e);
  }
};

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function ExibScreen({ route, navigation }) {
  const [lista, setListaItens] = useState([]);
  const CarregarLista = async () => {
    var novaLista = await getData();
    setListaItens(novaLista);
  }
  useEffect(() => {
    CarregarLista();
  });

  return (
  <FlatList
      data={lista}
      renderItem={({item}) =>
        <TouchableHighlight
            onPress={() => navigation.navigate('Editar Localização', {dados: item})}
        >
            <Card style={{padding: 5}}>
                <Card.Title title={item.nome} left={LeftContent} />
                <Card.Content>
                    <Text>ID: {item.id}</Text>
                    <Text>Longitude: {item.longitude}</Text>
                    <Text>Latitude: {item.latitude}</Text>
                    <Text>Cor: {item.cor}</Text>
                </Card.Content>
            </Card>
        </TouchableHighlight>
    }
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    fab: {
       position: 'absolute',
       margin: 16,
       marginTop: 40,
       right: 0,
       bottom: 0,
    }
});

