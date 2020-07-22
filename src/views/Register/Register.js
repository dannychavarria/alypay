import React, { useEffect, useReducer } from "react"

// Import components
import Video from "react-native-video"
import Modal from "react-native-modal"
import DatePicker from "react-native-date-picker"
import { View as ViewAnimation } from "react-native-animatable"
import { Text, TextInput, StyleSheet, Image, View, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, FlatList, ScrollView } from "react-native"

// Import functions and constant
import { GlobalStyles, reducer, RFValue, Colors, htttp, errorMessage, loader } from "../../utils/constants"

// Import Assets
import logo from "../../static/alypay.png"
import videoclip from "../../static/videos/cover.mp4"
import moment from "moment"

const initialState = {
    // Datos para el fomulario
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
    birthday: new Date(),
    city: "",
    postalCode: "",

    // datos para listado de paises
    countries: [],
    country: 10,

    // Filtro para busqueda
    filter: "",
    showCountries: false,

    // Vista seleccionada
    tab: 0,
}

const { height, width } = Dimensions.get("window")


const Register = ({ navigation }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    /**Metodo que configura todo el componente */
    const configurateComponent = async () => {
        try {
            // Loader mode on
            loader(true)

            // Obtenemos el listado de paises
            const { data } = await htttp.get("/register/countries")

            dispatch({ type: "countries", payload: data })
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            // loader mode off
            loader(false)
        }
    }

    /**Metodo que confirma la salida del usuario a la pantalla de inicio */
    const goBack = () => {
        Alert.alert("Estas a punto de salir", "Perderas todo tus registros. ¿Salir?", [
            {
                text: "Cancelar",
                onPress: () => { }
            },
            {
                text: "Salir",
                onPress: () => navigation.pop()
            }
        ])

        return true
    }

    /**Metodo que se ejecuta cuando el usuario selecciona una ciudad */
    const selectedCountry = (item) => {
        dispatch({ type: "country", payload: item })

        dispatch({ type: "showCountries", payload: false })
    }

    /**render element country modal */
    const ItemCountry = ({ item, index }) => {
        if (item.name.length > 0 && item.name.toLowerCase().search(state.filter.toLocaleLowerCase()) > -1) {
            return (
                <TouchableOpacity style={styles.itemCountry} key={index} onPress={_ => selectedCountry(index)}>
                    <Text style={{ color: "#FFF" }}>{item.name}</Text>
                    <Text style={{ color: Colors.colorYellow }}>{item.phoneCode}</Text>
                </TouchableOpacity>
            )
        }
    }

    /**Funcion que envia los datos al servidor backend */
    const onSubmit = () => { }

    /**Funcion que carga la siguiente ventana */
    const nextPage = () => {
        const { tab } = state

        dispatch({ type: "tab", payload: (tab + 1) })
    }

    /**Funcion que carga la anterior ventana */
    const previousPage = () => {
        const { tab } = state

        dispatch({ type: "tab", payload: (tab - 1) })
    }

    /**Muestra/oculta la ventana con todos los paises */
    const toggleModalCountries = (payload = false) => {
        dispatch({ type: "showCountries", payload })
    }

    /**Funcion que ejecuta cuando el suuario se cambia la fecha de cumple */
    const onChangeBirthday = (payload) => {
        dispatch({ type: "birthday", payload })
    }

    useEffect(() => {
        configurateComponent()
    }, [])


    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.rootContainer}>

            <Video
                selectedVideoTrack={{ type: "disabled" }}
                repeat={true}
                resizeMode="cover"
                playInBackground={true}
                controls={false}
                muted={true}
                playWhenInactive={true}
                source={videoclip}
                style={styles.videoclip} />

            <View style={styles.cap} />

            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always" keyboardDismissMode="interactive">
                <ViewAnimation animation="fadeIn" style={styles.subcontainer}>
                    <Image source={logo} style={styles.logo} />

                    {
                        (state.tab === 0) &&
                        <ViewAnimation style={styles.contentTab} animation="fadeIn">
                            <View style={styles.row}>
                                <Text style={styles.legend}>Nombre</Text>

                                <TextInput
                                    style={GlobalStyles.textInput}
                                    value={state.firstname}
                                    autoCorrect={false}
                                    keyboardAppearance="dark"
                                    onChangeText={payload => dispatch({ type: "firstname", payload })} />
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.legend}>Apellido</Text>

                                <TextInput
                                    style={GlobalStyles.textInput}
                                    value={state.lastname}
                                    autoCorrect={false}
                                    keyboardAppearance="dark"
                                    onChangeText={payload => dispatch({ type: "lastname", payload })} />
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.legend}>Correo Electronico</Text>

                                <TextInput
                                    style={GlobalStyles.textInput}
                                    value={state.email}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    keyboardAppearance="dark"
                                    onChangeText={payload => dispatch({ type: "email", payload })} />
                            </View>

                            {
                                state.countries.length > 0 &&
                                <>
                                    <View style={styles.row}>
                                        <Text style={styles.legend}>Numero de telefono</Text>

                                        <View style={styles.rowPhoneNumber}>
                                            <TouchableOpacity style={[GlobalStyles.textInput, { marginRight: 10 }]} onPress={_ => toggleModalCountries(true)}>
                                                <Text style={{ color: Colors.colorYellow }}>{state.countries[state.country].phoneCode}</Text>
                                            </TouchableOpacity>

                                            <TextInput
                                                style={[GlobalStyles.textInput, { flex: 1 }]}
                                                value={state.phoneNumber}
                                                autoCorrect={false}
                                                keyboardType="number-pad"
                                                keyboardAppearance="dark"
                                                onChangeText={payload => dispatch({ type: "phoneNumber", payload })} />
                                        </View>
                                    </View>
                                </>
                            }

                            <View style={styles.rowButtons}>
                                <TouchableOpacity onPress={goBack} style={styles.registerButton}>
                                    <Text style={styles.textRegisterButton}>Volver</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={nextPage} style={[GlobalStyles.buttonPrimaryLine, { flex: 1 }]}>
                                    <Text style={GlobalStyles.textButtonPrimaryLine}>Siguiente</Text>
                                </TouchableOpacity>
                            </View>
                        </ViewAnimation>
                    }

                    {
                        state.tab === 1 &&
                        <ViewAnimation style={styles.contentTab} animation="fadeIn">
                            <View style={styles.row}>
                                <Text style={styles.legend}>Fecha de tu cumpleaños</Text>

                                <DatePicker
                                    style={styles.datePicker}
                                    mode="date"
                                    onDateChange={onChangeBirthday}
                                    date={state.birthday} />
                            </View>


                            <View style={styles.row}>
                                <Text style={styles.legend}>Ciudad</Text>

                                <View style={styles.rowPhoneNumber}>
                                    <TextInput
                                        style={[GlobalStyles.textInput, { marginRight: 10 }]}
                                        placeholderTextColor="#FFF"
                                        placeholder="Codigo postal"
                                        keyboardAppearance="dark"
                                        value={state.postalCode}
                                        onChangeText={payload => dispatch({ type: "postalCode", payload })} />

                                    <TextInput
                                        style={[GlobalStyles.textInput, { flex: 1 }]}
                                        placeholderTextColor="#FFF"
                                        keyboardAppearance="dark"
                                        placeholder="Cuidad"
                                        value={state.city}
                                        onChangeText={payload => dispatch({ type: "city", payload })} />
                                </View>
                            </View>

                            <View style={styles.rowButtons}>
                                <TouchableOpacity onPress={previousPage} style={styles.registerButton}>
                                    <Text style={styles.textRegisterButton}>Atras</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={nextPage} style={[GlobalStyles.buttonPrimaryLine, { flex: 1 }]}>
                                    <Text style={GlobalStyles.textButtonPrimaryLine}>Siguiente</Text>
                                </TouchableOpacity>
                            </View>
                        </ViewAnimation>
                    }

                    {
                        (state.tab === 2) &&
                        <ViewAnimation style={styles.contentTab} animation="fadeIn">
                            <View style={styles.row}>
                                <Text style={styles.legend}>Nombre de usuario</Text>

                                <TextInput
                                    style={GlobalStyles.textInput}
                                    value={state.username}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    keyboardAppearance="dark"
                                    onChangeText={payload => dispatch({ type: "username", payload })} />
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.legend}>Contraseña</Text>

                                <TextInput
                                    style={GlobalStyles.textInput}
                                    value={state.password}
                                    secureTextEntry={true}
                                    keyboardAppearance="dark"
                                    onChangeText={payload => dispatch({ type: "password", payload })} />
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.legend}>Confirmar contraseña</Text>

                                <TextInput
                                    style={GlobalStyles.textInput}
                                    value={state.passwordConfirm}
                                    secureTextEntry={true}
                                    keyboardAppearance="dark"
                                    onChangeText={payload => dispatch({ type: "passwordConfirm", payload })} />
                            </View>

                            <View style={styles.rowButtons}>
                                <TouchableOpacity onPress={previousPage} style={styles.registerButton}>
                                    <Text style={styles.textRegisterButton}>Atras</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={nextPage} style={[GlobalStyles.buttonPrimaryLine, { flex: 1 }]}>
                                    <Text style={GlobalStyles.textButtonPrimaryLine}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </ViewAnimation>
                    }


                </ViewAnimation>

            </ScrollView>


            <Modal animationIn="fadeIn" backdropOpacity={0.9} animationOut="fadeOut" isVisible={state.showCountries}>
                <View style={styles.containerModal}>
                    <TextInput
                        style={GlobalStyles.textInput}
                        placeholder="Buscar"
                        placeholderTextColor="#FFF"
                        value={state.filter}
                        onChangeText={payload => dispatch({ type: "filter", payload })} />


                    <View style={{ height: 10 }} />


                    <FlatList
                        keyboardShouldPersistTaps="always"
                        data={state.countries}
                        renderItem={ItemCountry}
                        keyExtractor={(_, i) => i.toString()} />
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    cap: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 0,
    },

    videoclip: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height,
        zIndex: 0,
    },

    logo: {
        marginTop: 25,
        alignSelf: "center",
        resizeMode: "contain",
        height: RFValue(128),
        width: RFValue(256),
    },

    subcontainer: {
        alignItems: "center",
        flex: 1,
        height: Dimensions.get("window").height,
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 20
    },

    row: {
        marginVertical: RFValue(10),
        paddingHorizontal: RFValue(25),
        width: '100%',
    },

    rowButtons: {
        alignItems: "center",
        marginVertical: RFValue(10),
        paddingHorizontal: RFValue(25),
        width: '100%',
        flexDirection: "row"
    },

    rowPhoneNumber: {
        alignItems: "center",
        flexDirection: "row",
        width: '100%',
    },

    legend: {
        color: Colors.colorYellow,
        fontSize: RFValue(12),
        marginBottom: RFValue(2.5),
    },

    containerModal: {
        alignSelf: "center",
        backgroundColor: Colors.colorMain,
        borderRadius: 10,
        padding: 10,
        height: "80%",
        width: "80%",
    },

    selectCodeCountry: {
        borderRadius: 5,
        backgroundColor: Colors.colorBlack,
        padding: 10,
    },

    itemCountry: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },

    registerButton: {
        marginRight: RFValue(50)
    },

    textRegisterButton: {
        fontSize: RFValue(14),
        color: Colors.colorYellow,
    },

    contentTab: {
        flex: 1,
        width: "100%"
    },

    datePicker: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        overflow: "hidden",
        width: Platform.OS === "ios" ? (width * 0.85) : (width * 0.87),
    },

})

export default Register