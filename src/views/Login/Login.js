import React, { useEffect, useReducer, useRef } from "react"

// Import config get info device
import { getBrand, getDeviceId, getMacAddress, getSystemName } from "react-native-device-info"
import getPublicIp from "react-native-public-ip"

// Import apollo server
import { View as ViewAnimation } from "react-native-animatable"
import { useMutation } from "@apollo/react-hooks"
import { login } from "../../graphql/mutation/mutations"

// Import components
import Video from "react-native-video"
import { Text, TextInput, StyleSheet, Image, View, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"

// Import constants and functions
import { reducer, Colors, GlobalStyles, RFValue } from "../../utils/constants"
import { showMessage } from "react-native-flash-message"

// Import Assets
import logo from "../../static/alypay.png"
import videoclip from "../../static/videos/cover.mp4"

const initialState = {
    email: "",
    password: "",

    // Info device
    ipAddress: "",
    macAddress: "",
    systemName: "",
}

const { width, height } = Dimensions.get("window")

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Referencia al componente video
    const videoRef = useRef(null)

    const [submit, { loading }] = useMutation(login, {
        onError: (err) => {
            console.log(err)

            showMessage({
                message: "Error en autenticacion",
                description: "Autenticacion fallida, Correo o contraseña incorrecta",
                backgroundColor: Colors.colorRed,
                color: "#fff",
                autoHide: false,
                icon: "warning"
            })
        },
        onCompleted: (data) => {
            console.log(data)
        }
    })

    /**
     * Funcion que obtiene
     */
    const getDeviceInfo = async () => {

        // Obtenemos la ip publica del dispositivo
        getPublicIp().then((payload) => {
            dispatch({ type: "ipAddress", payload })
        })

        /**Marca del dispositivo */
        const device = await getBrand()

        /**Modelo del dispositivo */
        const deviceId = await getDeviceId()

        // Ingresamos al store la informacion del dispositivo
        dispatch({ type: "ipAddress", payload: `${device} - ${deviceId}` })

        // Obtenemos la direccion mac del dispositvo
        await getMacAddress().then(payload => dispatch({ type: "ipAddress", payload }))

        const systemVersion = await getSystemName()

        dispatch({ type: "systemName", payload: systemVersion })
    }

    const onEndVideo = () => {
        console.log(videoRef)
    }

    useEffect(() => {
        getDeviceInfo()
        // $email: String!, $password: String!, $ip_publica: String!, $device: String!, $mac_adress: String!, $system_name: String!

    }, [])


    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.rootContainer}>
            <Video
                selectedVideoTrack={{ type: "disabled" }}
                repeat={true}
                ref={videoRef}
                resizeMode="cover"
                playInBackground={true}
                onVideoEnd={onEndVideo}
                controls={false}
                muted={true}
                playWhenInactive={true}
                source={videoclip}
                style={styles.videoclip} />

            <View style={styles.cap} />

            <ViewAnimation style={styles.subcontainer}>
                <Image source={logo} style={styles.logo} />

                <View style={styles.row}>
                    <Text style={styles.legend}>Correo Electronico</Text>

                    <TextInput
                        style={GlobalStyles.textInput}
                        value={state.email}
                        keyboardType="email-address"
                        onChangeText={payload => dispatch({ type: "email", payload })} />
                </View>

                <View style={styles.row}>
                    <Text style={styles.legend}>Contraseña</Text>

                    <TextInput
                        style={GlobalStyles.textInput}
                        value={state.password}
                        secureTextEntry={true}
                        onChangeText={payload => dispatch({ type: "password", payload })} />
                </View>


                <View style={styles.rowButtons}>
                    <TouchableOpacity style={styles.registerButton}>
                        <Text style={styles.textRegisterButton}>Registrase</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[GlobalStyles.buttonPrimaryLine, { flex: 1 }]}>
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