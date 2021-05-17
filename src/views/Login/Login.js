import React, { useEffect, useReducer, useState } from "react"

// Import config get info device
import { getBrand, getDeviceId, getMacAddress, getSystemName } from "react-native-device-info"
import getPublicIp from "react-native-public-ip"

// Import components
import Video from "react-native-video"
import CheckBox from "react-native-check-box"
import Icon from "react-native-vector-icons/MaterialIcons"
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
    activeSession: false,    
}

const { height } = Dimensions.get("window")

/**
 * @author msobalvarro
 * @sumary Promesa que devuelve informacion del dispositivo
 */
const getDeviceInfo = () => new Promise(async (resolve, reject) => {
    try {
        // Obtenemos la ip publica del dispositivo
        const public_ip = await getPublicIp()

        /**Marca del dispositivo */
        const device = await getBrand()

        /**Modelo del dispositivo */
        const deviceId = await getDeviceId()

        // Obtenemos la direccion mac del dispositvo
        const mac_adress = await getMacAddress()

        // sistema (version)
        const system_name = await getSystemName()

        resolve({ device: `${device} - ${deviceId}`, mac_adress, system_name, public_ip })

    } catch (error) {
        reject(error.toString())
    }
})

const Login = ({ navigation }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [showPassword, setShowPassword] = useState(false)

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

            const dataDeviceInfo = await getDeviceInfo()

            const variables = {
                email: state.email,
                password: state.password,
                active_session: state.activeSession,
                ...dataDeviceInfo
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

                    
                    // validamos si el cliente tiene KYC
                    if(data.kyc_type === 0) {
                        // viajamos a la pantalla de KYC
                        navigate("Kyc")                        
                    }
                }
            }
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

    /**Funcion que lleva a la pantalla de registro */
    const toRegister = () => {
        navigate(ROUTES.REGISTER)
    }

    useEffect(() => {
        store.dispatch({ type: SETNAVIGATION, payload: navigation })
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

                    <View style={[styles.textInputWithImage, GlobalStyles.textInput]}>
                        <TextInput
                            style={styles.textInputCol}
                            value={state.password}
                            secureTextEntry={!showPassword}
                            keyboardAppearance="dark"
                            onChangeText={payload => dispatch({ type: "password", payload })} />

                        <TouchableOpacity onPress={_ => setShowPassword(!showPassword)} style={styles.touchableCol}>
                            <Icon name={showPassword ? 'visibility-off' : 'visibility'} color={Colors.colorYellow} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>


                 <View style={[styles.rowButtons, { justifyContent: "flex-end" }]}>
                    <Text style={[styles.legend, { marginRight: 10 }]}>Recordar contraseña</Text>

                    <CheckBox
                        checkBoxColor={Colors.colorYellow}
                        isChecked={state.activeSession}
                        onClick={_ => dispatch({ type: "activeSession", payload: !state.activeSession })}
                    />
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
    textInputWithImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputCol: {
        flex: 0.9,
        paddingLeft: 5,
        padding: 0,
        color: 'white',
    },
    touchableCol: {
        flex: 0.1,
        alignItems: 'flex-end',
    },
})

export default Login