import React, { useEffect, useReducer } from "react"

// Import config get info device
import { getBrand, getDeviceId, getMacAddress, getSystemName } from "react-native-device-info"
import getPublicIp from "react-native-public-ip"

// Import components
import Video from "react-native-video"
import { View as ViewAnimation } from "react-native-animatable"
import { Text, TextInput, StyleSheet, Image, View, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"

// Import constants and functions
import ROUTES from "../../utils/routes.config"
import validator from "validator"
import { useNavigation } from "@react-navigation/native"
import { reducer, Colors, GlobalStyles, RFValue, setStorage, http, loader, errorMessage, serverAddress } from "../../utils/constants"
import { showMessage } from "react-native-flash-message"

// Import reduz store and types
import store from "../../store/index"
import { SETSTORAGE, SETNAVIGATION } from "../../store/actionsTypes"

// Import Assets
import logo from "../../static/alypay.png"
import videoclip from "../../static/videos/cover.mp4"

const initialState = {
    email: "",
    password: "",

    // Info device
    ipAddress: "",
    device: "",
    macAddress: "",
    systemName: "",
}

const { height } = Dimensions.get("window")

const Login = ({ navigation }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const { navigate } = useNavigation()

    /***
     * Metodo que se ejecuta cuando el usuario ejecuta login
     */
    const onSubmit = async () => {
        try {

            // Verificamos si el formato es un correo
            if (!validator.isEmail(state.email.trim())) {
                throw "Correo electronico no es correcto"
            }

            if (state.password.length === 0) {
                throw "Ingrese alguna Contraseña"
            }

            // Loader app mode on
            loader(true)

            const variables = {
                email: state.email,
                password: state.password,
                public_ip: state.ipAddress,
                device: state.device,
                mac_adress: state.macAddress,
                system_name: state.systemName
            }

            const { data } = await http.post("/login", variables)

            // Verificamos si hay un error
            if (data.error) {
                throw String(data.message)
            } else {
                // Validamos si los datos que retornan son validos
                if (Object.values(data).length > 0) {
                    store.dispatch({ type: SETSTORAGE, payload: data })

                    setStorage(data)
                }
            }

            // submit({ variables })
        } catch (error) {
            showMessage({
                message: error.toString(),
                description: "Error en autenticar",
                color: "#FFF",
                backgroundColor: Colors.colorRed,
                icon: "warning",
            })
        } finally {
            // Loader app mode off
            loader(false)
        }
    }

    /**
     * Funcion que obtiene
     */
    const getDeviceInfo = async () => {
        try {
            // Obtenemos la ip publica del dispositivo
            // const ip = await getPublicIp()

            // console.log(ip)

            // dispatch({ type: "ipAddress", payload: ip })

            /**Marca del dispositivo */
            const device = await getBrand()

            /**Modelo del dispositivo */
            const deviceId = await getDeviceId()

            // Ingresamos al store la informacion del dispositivo
            dispatch({ type: "device", payload: `${device} - ${deviceId}` })

            // Obtenemos la direccion mac del dispositvo
            const macAddress = await getMacAddress()

            dispatch({ type: "macAddress", payload: macAddress })

            const systemVersion = await getSystemName()

            dispatch({ type: "systemName", payload: systemVersion })

        } catch (error) {
            errorMessage(error.toString())
        }
    }

    /**Funcion que lleva a la pantalla de registro */
    const toRegister = () => {
        navigate(ROUTES.REGISTER)
    }

    useEffect(() => {
        store.dispatch({ type: SETNAVIGATION, payload: navigation })

        getDeviceInfo()
    }, [])

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.rootContainer}>
            <Video
                selectedVideoTrack={{ type: "disabled" }}
                resizeMode="cover"
                playInBackground={true}
                controls={false}
                muted={true}
                playWhenInactive={true}
                source={videoclip}
                style={styles.videoclip} />

            <View style={styles.cap} />

            <ViewAnimation animation="fadeIn" style={styles.subcontainer}>
                <Image source={logo} style={styles.logo} />

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

                <View style={styles.row}>
                    <Text style={styles.legend}>Contraseña</Text>

                    <TextInput
                        style={GlobalStyles.textInput}
                        value={state.password}
                        secureTextEntry={true}
                        keyboardAppearance="dark"
                        onChangeText={payload => dispatch({ type: "password", payload })} />
                </View>


                <View style={styles.rowButtons}>
                    <TouchableOpacity onPress={toRegister} style={styles.registerButton}>
                        <Text style={styles.textRegisterButton}>registrarme</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onSubmit} style={[GlobalStyles.buttonPrimaryLine, { flex: 1 }]}>
                        <Text style={GlobalStyles.textButtonPrimaryLine}>Iniciar</Text>
                    </TouchableOpacity>
                </View>
            </ViewAnimation>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    subcontainer: {
        alignItems: "center",
        flex: 1,
        height: Dimensions.get("window").height,
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 20
    },

    cap: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 15,
    },

    videoclip: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height,
        zIndex: 0,
    },

    logo: {
        alignSelf: "center",
        resizeMode: "contain",
        height: RFValue(128),
        width: RFValue(256),
    },

    legend: {
        color: Colors.colorYellow,
        fontSize: RFValue(12),
        marginBottom: RFValue(2.5),
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

    registerButton: {
        marginRight: RFValue(50)
    },

    textRegisterButton: {
        textTransform: "uppercase",
        fontSize: RFValue(14),
        color: Colors.colorYellow,
    },
})

export default Login