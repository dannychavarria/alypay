import React, { useState, useEffect, useReducer } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import { PERMISSIONS, request, check } from 'react-native-permissions'

// Import Constans and Components
import Container from '../Container/Container'
import Geolocation from 'react-native-geolocation-service'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Carousel from 'react-native-snap-carousel'
import { errorMessage, RFValue, http, getHeaders } from '../../utils/constants'

// Import Assets 
import logo from '../../static/Commerce.png'


const initialState = {
    latitude: null,
    longitude: null
}

const reducer = (state, action) => {
    return {
        ...state,
        [action.type]: action.payload
    }
}


const MapsCommerce = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [info, setInfo] = useState('')

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
        const options = { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }

        Geolocation.getCurrentPosition((position) => {
            if (position !== null && position !== undefined) {
                dispatch({ type: "latitude", payload: position.coords.latitude })
                dispatch({ type: "longitude", payload: position.coords.longitude })
            }
        }, (error) => {
            console.log(error.message)
        }, options)
    }

    const informationCommerce = async () => {
        try {

            const dataSent = {
                lat: state.latitude,
                long: state.longitude,
                acurrancy: 25
            }
            console.log('DataSets',dataSent)

            const { data } = await http.get("/ecommerce/company/list", dataSent, getHeaders())
            console.log("data", data)
            //console.log('Header', getHeaders())

            if (data.error) {
                throw String(data.message)
            }

            setInfo(data)

        } catch (error) {
            errorMessage(error.toString())
        }
    }

    const renderCarouselItem = ({ item }) => {
        return (
            <View style={styles.cardContainer} >
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Image style={styles.cardImage} source={item.image} />
            </View >
        )
    }

    useEffect(() => {
        ConfigureLocation()
        //informationCommerce()
    }, [])

    return (
        <View style={styles.container}>
            {
                (state.latitude !== null && state.longitude !== null) &&
                <MapView
                    style={styles.map}
                    initialRegion={{
                        longitude: state.longitude,
                        latitude: state.latitude,
                        latitudeDelta: 0.050,
                        longitudeDelta: 0.045
                    }}
                    onMarkerDragEnd={(event) => {
                        dispatch({ type: "longitude", payload: event.nativeEvent.coordinate.longitude })
                        dispatch({ type: "latitude", payload: event.nativeEvent.coordinate.latitude })
                    }}
                    
                >
                    <Marker
                        coordinate={{
                            longitude: state.longitude,
                            latitude: state.latitude,
                        }}
                        draggable={true}
                        
                    />

                    {/*  {
                        coordinates.map((item, index) => (
                            <Marker
                                key={item.name}
                                ref={ref => item[index] = ref}
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude: item.longitude
                                }}
                            >
                            </Marker>
                        ))
                    } */}

                </MapView>
            }
            {/*  {
                (state.latitude !== null && state.longitude !== null) &&
                <Carousel
                    data={coordinates}
                    renderItem={renderCarouselItem}
                    containerCustomStyle={styles.carousel}
                    itemWidth={300}
                    sliderWidth={Dimensions.get('window').width}
                    removeClippedSubviews={false}
                    layout={'default'}
                />
            } */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    carousel: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 30
    },
    cardContainer: {
        //flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: '100%',
        width: '100%',
        //padding: 24,
        borderRadius: 15,
        alignItems: 'center',
    },
    cardImage: {
        height: RFValue(100),
        width: RFValue(140),
        // bottom: 0,
        // position: 'absolute',
        // borderBottomLeftRadius: 24,
        //borderBottomRightRadius: 24,
        resizeMode: 'contain',
        padding: 50
    },
    cardTitle: {
        color: 'white',
        fontSize: 22,
    }
})

export default MapsCommerce