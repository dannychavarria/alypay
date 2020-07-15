import React, { useEffect, useReducer, useRef } from "react"

// Import config get info device
import { getBrand, getDeviceId, getMacAddress, getSystemName } from "react-native-device-info"
import getPublicIp from "react-native-public-ip"

// Import apollo server
import { View as ViewAnimation } from "react-native-animatable"

// Import components
import Video from "react-native-video"
import Loader from "../../components/Loader/Loader"
import { Text, TextInput, StyleSheet, Image, View, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"

// Import constants and functions
import { reducer, Colors, GlobalStyles, RFValue, setStorage, htttp, loader } from "../../utils/constants"
import { showMessage } from "react-native-flash-message"
import validator from "validator"

// Import reduz store and types
import store from "../../store/index"
import { SETSTORAGE } from "../../store/actionsTypes"

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

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Referencia al componente video
    const videoRef = useRef(null)

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

            await htttp.post("/login", variables)
                .then(response => {
                    const { data } = response

                    // Verificamos si hay un error
                    if (data.error) {
                        throw data.message
                    } else {
                        // Validamos si los datos que retornan son validos
                        if (Object.values(data).length > 0) {
                            store.dispatch({ type: SETSTORAGE, payload: data })

                            setStorage(data)
                        }
                    }
                })

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

        // Obtenemos la ip publica del dispositivo
        getPublicIp().then((payload) => dispatch({ type: "ipAddress", payload }))

        /**Marca del dispositivo */
        const device = await getBrand()

        /**Modelo del dispositivo */
        const deviceId = await getDeviceId()

        // Ingresamos al store la informacion del dispositivo
        dispatch({ type: "device", payload: `${device} - ${deviceId}` })

        // Obtenemos la direccion mac del dispositvo
        await getMacAddress().then(payload => dispatch({ type: "macAddress", payload }))

        const systemVersion = await getSystemName()

        dispatch({ type: "systemName", payload: systemVersion })
    }

    useEffect(() => {
        getDeviceInfo()
    }, [])

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.rootContainer}>
            <Video
                selectedVideoTrack={{ type: "disabled" }}
                repeat={true}
                ref={videoRef}
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
                    <TouchableOpacity style={styles.registerButton}>
                        <Text style={styles.textRegisterButton}>Registrase</Text>
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
        fontSize: RFValue(14),
        color: Colors.colorYellow,
    },
})

export default Login