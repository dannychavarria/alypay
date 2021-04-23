import React, { useState, useEffect, useReducer } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Linking,
    Platform,
} from "react-native"
import { PERMISSIONS, request, check } from "react-native-permissions"

// Import Constans and Components
import Geolocation from "react-native-geolocation-service"
import MapView, { Marker, Callout } from "react-native-maps"
import Carousel from "react-native-snap-carousel"
import {
    errorMessage,
    RFValue,
    http,
    getHeaders,
    loader,
} from "../../utils/constants"
import SearchMap from "../SearchMap/SearchMap" //Importacion del buscador
import styleMap from "../../animations/map-dark-mode.json"

// Import Assets
import Commerce from "../../static/UbicationCommerce.png"

const initialState = {
    latitude: null,
    longitude: null,
}

const reducer = (state, action) => {
    return {
        ...state,
        [action.type]: action.payload,
    }
}

const MapsCommerce = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [info, setInfo] = useState([])
    const [click, setClick] = useState(false)
    //Estados para la nueva posicion de la camara
    const [newLongitude, setNewLongitude] = useState(999)
    const [newLatitude, setNewLatitude] = useState(999)
    //Estado para referenciar al MapView y poder usar sus metodos
    const [ref, setRef] = useState()

    // Funcion que permite dar los permisos para la Geolocalizacion
    const ConfigureLocation = async () => {
        try {
            if (Platform.OS === "android") {
                await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                const auth = await check(
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                )

                if (auth === "granted") {
                    positionMap()
                }
            }
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    // Funcion que almacena la posicion en el mapa
    const positionMap = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
        }

        Geolocation.getCurrentPosition(
            position => {
                if (position !== null && position !== undefined) {
                    dispatch({
                        type: "latitude",
                        payload: position.coords.latitude,
                    })
                    dispatch({
                        type: "longitude",
                        payload: position.coords.longitude,
                    })
                }
            },
            error => {
                console.log(error.message)
            },
            options,
        )
    }

    // Hacemos la peticion al server para optener las lista de los comercios cercanos
    const informationCommerce = async () => {
        try {
            const dataSent = {
                lat: state.latitude,
                long: state.longitude,
            }

            const { data } = await http.post(
                "/ecommerce/company/list/",
                dataSent,
                getHeaders(),
            )

            console.log(data)

            if (data.error) {
                throw String(data.message)
            }
            // console.log("Data", data)
            setInfo(data)
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    // Funcion que rendecira las tarjetas de los commercios
    const renderCarouselItem = ({ item }) => {
        //console.log(item)

        // Obtenemos las posisciones iniciales del usuario
        const scheme = Platform.select({
            ios: `maps:${state.latitude},${state.longitude}?q=`,
            android: `geo:${state.latitude},${state.longitude}?q=`,
        })

        // Obtenemos las posiciones del comercio
        const latLng = `${item.latitude},${item.longitude}`
        //Obtenemos el nombre del comercio
        const label = item.name_commerce

        // Hacemos la verificacion de que dispositivo esta utilizando
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
        })

        // Funcion que nos permite dirigirnos al Google Maps para visualizar la ruta mas sercana del comercio
        const direcction = () => {
            Linking.openURL(url)
        }
        return (
            <TouchableOpacity onPress={direcction}>
                <View style={styles.cardContainer}>
                    <Text style={styles.cardTitle}>{item.name_commerce}</Text>
                    <Image
                        style={styles.cardImage}
                        source={{ uri: item.image }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        ConfigureLocation()
        loader(true)
    }, [])

    useEffect(() => {
        if (state.latitude && state.longitude) {
            informationCommerce()
        }
    }, [state.latitude, state.longitude])
    /**
     * useEffect para cambiar la posicion de la camara si cambian los estados de:
     * @param {newLongitude, newLatitude} index
     */
    useEffect(() => {
        if (ref) {
            ref.animateToRegion({
                longitude: newLongitude,
                latitude: newLatitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.045,
            })
        }
    }, [newLatitude, newLongitude, click])
    /**Funcion para setear la ubicacion de lal item que se muestra en el carrusel
     *
     * @param {newLatitude, newLongitude} index
     */
    const onChangeTap = index => {
        var commerce = info[index]

        setNewLatitude(commerce.latitude)
        setNewLongitude(commerce.longitude)
    }

    return (
        <View style={styles.container}>
            {state.latitude !== null && state.longitude !== null && (
                <>
                    <MapView
                        showsUserLocation={true}
                        style={styles.map}
                        ref={map => setRef(map)} //setear "ref" para tener una referencia del MapView y usar sus metodos
                        customMapStyle={styleMap}
                        initialRegion={{
                            longitude: state.longitude,
                            latitude: state.latitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.045,
                        }}
                        onMarkerDragEnd={event => {
                            dispatch({
                                type: "longitude",
                                payload: event.nativeEvent.coordinate.longitude,
                            })
                            dispatch({
                                type: "latitude",
                                payload: event.nativeEvent.coordinate.latitude,
                            })
                        }}>
                        {info.map((item, index) => (
                            <Marker
                                key={item.name}
                                ref={ref => (item[index] = ref)}
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                }}>
                                <Image
                                    source={Commerce}
                                    style={styles.itemCommerce}
                                />
                                <Callout>
                                    <Text>{item.name_commerce}</Text>
                                </Callout>
                            </Marker>
                        ))}
                    </MapView>

                    <Carousel
                        data={info}
                        renderItem={renderCarouselItem}
                        containerCustomStyle={styles.carousel}
                        itemWidth={300}
                        sliderWidth={Dimensions.get("window").width}
                        removeClippedSubviews={false}
                        layout={"default"}
                        onSnapToItem={index => onChangeTap(index)} //mandar el index de la targeta actual a la funcion
                    />

                    <SearchMap
                        data={info}
                        setNewLongitude={setNewLongitude}
                        setNewLatitude={setNewLatitude}
                        click={click}
                        setClick={setClick}
                    />
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    logo: {
        width: RFValue(30),
        height: RFValue(30),
    },
    carousel: {
        position: "absolute",
        bottom: 0,
        marginBottom: 30,
    },
    cardContainer: {
        //flexDirection: 'column',
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        height: "100%",
        width: "100%",
        //padding: 24,
        borderRadius: 15,
        alignItems: "center",
    },
    cardImage: {
        height: RFValue(150),
        width: "100%",
        // bottom: 0,
        // position: 'absolute',
        // borderBottomLeftRadius: 24,
        //borderBottomRightRadius: 24,
        resizeMode: "contain",
        padding: 50,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    cardTitle: {
        color: "white",
        fontSize: 22,
    },
    itemCommerce: {
        width: RFValue(60),
        height: RFValue(70),
        resizeMode: "contain",
    },
})

export default MapsCommerce
