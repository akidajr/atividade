import {useState, useEffect} from 'react';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaView, StyleSheet, TextInput, Alert} from 'react-native';
import { styled } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setLastId = async (value) => {
  try {
    await AsyncStorage.setItem('lastID', value);
  } catch (e) {
    // saving error
    Alert.alert(''+e);
  }
}

export default function AddScreen({ route, navigation }) {
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
      // saving error
      Alert.alert(''+e);
    }
  };

  const [lista, setListaItens] = useState([]);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
      Alert.alert(''+e);
    }
  };

  const CarregarLista = async () => {
    var novaLista = await getData();
    setListaItens(novaLista);
  }

  //const { item } = route.params;
  const [id, onChangeId] = React.useState('');
  const [nome, onChangeNome] = React.useState('');
  const [latitude, onChangeLat] = React.useState('');
  const [longitude, onChangeLong] = React.useState('');
  const [cor, onChangeCor] = React.useState('');


  const getLastId = async () => {
    try {
      var res = await AsyncStorage.getItem('lastID');
      if (res == null) {
        onChangeId("1");
      } else {
        onChangeId(""+res);
      }
    } catch (e) {
      // saving error
      Alert.alert('' + e);
    }
  };

  useEffect(() => {
    getLastId();
    CarregarLista();
  });

  return (
    <AppSafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNome}
        value={nome}
        placeholder="Nome da Localização"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeLat}
        value={latitude}
        placeholder="Latitude"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeLong}
        value={longitude}
        placeholder="Longitude"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeCor}
        value={cor}
        placeholder="Cor do Marcador (EX: #FF0000)"
      />
      <AppView>
        <Button
          title="Salvar" onPress={()=>{
            var listaNova = [
              {
                id: id,
                nome: nome,
                cor: cor,
                latitude: latitude,
                longitude: longitude,
              }
            ]
            var listaSalvar = [...lista, ...listaNova];
            storeData(listaSalvar);
            var abc = parseInt(''+id);
            abc++;
            setLastId(''+abc);
            onChangeNome('');
            onChangeLat('');
            onChangeLong('');
            onChangeCor('');
            alert('Dados Salvo com Sucesso.');
            navigation.navigate('Mapa');
          }}
        />
      </AppView>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

AppView = styled.View`
    display: flex;
    gap: 10px;
    padding: 15px;
`

AppSafeAreaView = styled.SafeAreaView`
    display: flex;
    padding: 25px;
`