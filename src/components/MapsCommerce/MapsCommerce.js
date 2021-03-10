import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { PERMISSIONS, request, check } from 'react-native-permissions'

// Import Constans and Components
import Container from '../Container/Container'
import Geolocation from 'react-native-geolocation-service'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { errorMessage } from '../../utils/constants'

const MapsCommerce = () => {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    // Funcion que permite dar los permisos para la Geolocalizacion
    const ConfigureLocation = async () => {
        try {
            if (Platform.OS === 'android') {
                await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                const auth = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

                if (auth === 'granted') {
                    positionMap()
                }
            }
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    // Funcion que almacena la posicion en el mapa
    const positionMap = () => {
        Geolocation.getCurrentPosition((position) => {
            console.log('Posision', position)
            if (position !== null && position !== undefined) {
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
            }
        }, (error) => {
            console.log(error.message)
        })
    }

    useEffect(() => {
        ConfigureLocation()
    }, [])

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
                longitude: longitude,
                latitude: latitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.050
            }}
            onMarkerDragEnd={(event) => {
                setLongitude(event.nativeEvent.coordinate.longitude)
                setLatitude(event.nativeEvent.coordinate.latitude)
            }}
        >
            <Marker
                coordinate={{
                    longitude: longitude,
                    latitude: latitude,
                }}
                draggable={true}
            />
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        //width: '100%',
        //...StyleSheet.absoluteFillObject,
    },
})

export default MapsCommerce