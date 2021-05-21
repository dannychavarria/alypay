import React, { useState, useEffect, useReducer, useCallback } from "react"
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
    Colors
} from "../../utils/constants"
import SearchMap from "../SearchMap/SearchMap" //Importacion del buscador
import styleMap from "../../animations/map-dark-mode.json"

// Import Assets
import imageProfileAvatar from "../../static/ecommerce-avatar.png"
import IconMarket from "../../static/maket-icon-logo-yellow.png"
import iconDirection from "../../static/icon-directions-map.png"

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

            if (data.error) {
                throw String(data.message)
            }

            console.log('Comercios: ',data)

            let commerceFilter = data.filter(info => info.id_state != 2 && info.id_state != 3)

            setInfo(commerceFilter)
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    // Funcion que rendecira las tarjetas de los commercios
    const renderCarouselItem = useCallback(({ item }) => {
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

        const image = item.image
        const parsedImage = image.replace("http", "https")

        return (
            <TouchableOpacity style={styles.cardContainer} onPress={direcction}>
                <Image
                    style={styles.cardImage}
                    source={{ uri: parsedImage }}
                />
                <View style={styles.containerImageAndTitle}>
                    <View style={styles.containerImage}>
                        <Image source={imageProfileAvatar} style={styles.avatarEcommerce} />
                    </View>

                    <View style={styles.carSubcontainer}>
                        <Text style={styles.cardTitle}>{item?.name_commerce}</Text>
                        <Text style={styles.cardDirection}>{item?.address}</Text>
                    </View>
                </View>

                <View style={styles.containerTextDirection}>
                    <Text style={styles.textDirection}>Ver direcciones</Text>
                    <Image source={iconDirection} style={styles.imageDirectionText} />
                </View>
            </TouchableOpacity>
        )
    }, [])

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
                        showsMyLocationButton={false}
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
                                key={item.index}
                                ref={ref => (item[index] = ref)}
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                }}>
                                <Image
                                    source={IconMarket}
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
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: 15,
        borderColor: Colors.colorYellow + 55,
        borderWidth: 2,
        overflow: "hidden",
    },
    containerImageAndTitle: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    containerImage: {
        borderRadius: RFValue(50),
        borderWidth: 1,
        borderColor: Colors.colorYellow,
        padding: 10,
        marginLeft: 20,
    },
    avatarEcommerce: {
        resizeMode: "cover",        
        height: RFValue(24),
        width: RFValue(24),
    },
    carSubcontainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 10,
    },
    cardImage: {
        height: RFValue(150),
        width: "100%",
        resizeMode: "cover",
    },
    cardDirection: {
        color: "#CCC"
    },
    cardTitle: {
        color: Colors.colorYellow,
        fontSize: 22,
    },
    containerTextDirection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    imageDirectionText: {
        resizeMode: "cover",
        height: RFValue(16),
        width: RFValue(16)
    },
    textDirection: {
        color: Colors.colorYellow,
        fontSize: RFValue(12)
    },
    itemCommerce: {
        width: RFValue(60),
        height: RFValue(70),
        resizeMode: "contain",
    },
})

export default MapsCommerce
