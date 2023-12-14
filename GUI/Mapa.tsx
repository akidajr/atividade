import * as React from 'react';
import {useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

MapboxGL.setAccessToken('sk.eyJ1IjoiY3BqdW5pb3IiLCJhIjoiY2xwYTgwY3UxMDQ2bjJpcXMzd3hiOWNtOSJ9.9kBIldmFoCyRxpGtSRxf6g');
MapboxGL.setTelemetryEnabled(false);
//MapboxGL.setWellKnownTileServer('Mapbox');

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

export default function MapaScreen({ route, navigation }) {
    const [
        currentLongitude,
        setCurrentLongitude
    ] = useState(-46.60041165570071);
    const [
        currentLatitude,
        setCurrentLatitude
    ] = useState(-23.580602706486154);

    const buscaLocalizacao = () => {
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            //getting the Longitude from the location json
            const currentLongitude =
              JSON.stringify(position.coords.longitude);

            //getting the Latitude from the location json
            const currentLatitude =
              JSON.stringify(position.coords.latitude);

            setCurrentLongitude(currentLongitude);
            setCurrentLatitude(currentLatitude);
          },
        );
    }

    const [lista, setListaItens] = useState([]);
    const CarregarLista = async () => {
        var novaLista = await getData();
        setListaItens(novaLista);
        buscaLocalizacao();
    }
    useEffect(() => {
        CarregarLista();
    });

    return (
        <View style={styles.container}>
            <MapboxGL.MapView
                style={styles.map}
                zoomEnabled={true}
                styleURL='mapbox://styles/mapbox/streets-v12'
                rotateEnabled={true}
            >
                <MapboxGL.Camera
                    zoomLevel={14}
                    centerCoordinate={[currentLongitude, currentLatitude]}
                    pitch={60}
                    animationMode={'flyTo'}
                    animationDuration={2300}
                />
                {
                    lista.map((valor) => {
                        return (
                            <MapboxGL.PointAnnotation
                                id={valor.nome}
                                coordinate={[valor.longitude, valor.latitude]}>
                                <View style={styles.markerContainer}>
                                    <Fontisto name='map-marker-alt' size={22} color={valor.cor} />
                                </View>
                            </MapboxGL.PointAnnotation>
                        )
                    })
                }
            </MapboxGL.MapView>
            <FAB style={styles.fab} icon="plus" small
                onPress={
                () =>
                    navigation.navigate('Nova Localização')
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    map: {
        flex: 1,
    },
    markerContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        marginTop: 40,
        right: 0,
        bottom: 0,
    }
});
