import Asyncstorage from "@react-native-community/async-storage"
import { Platform, StatusBar, Dimensions, StyleSheet } from "react-native"

// Import Functions
import Clipboard from "@react-native-community/clipboard"
import Toast from "react-native-simple-toast"
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions"
import { isIphoneX } from "react-native-iphone-x-helper"
import { showMessage } from "react-native-flash-message"

// Store and action from redux
import Store from "../store/index"
import { SETPERMISSIONS } from "../store/actionsTypes"

// Constanst
const keyStorage = "@storage"

const { height, width } = Dimensions.get("window")
const standardLength = width > height ? width : height
const offset =
    width > height ? 0 : Platform.OS === "ios" ? 78 : StatusBar.currentHeight // iPhone X style SafeAreaView size in portrait

const deviceHeight =
    isIphoneX() || Platform.OS === "android"
        ? standardLength - offset
        : standardLength

// guideline height for standard 5" device screen is 680
export const RFValue = (fontSize = 0, standardScreenHeight = 680) => {
    const heightPercent = (fontSize * deviceHeight) / standardScreenHeight
    return Math.round(heightPercent)
}

/**Setea los datos de api storage modo encriptado */
export const setStorage = async (json = {}) => {
    const data = JSON.stringify(json)

    await Asyncstorage.setItem(keyStorage, data)
}

/** Elimina el api storage de localstorage */
export const deleteStorage = async () => {
    await Asyncstorage.removeItem(keyStorage)
}

/**Desencripta el api storage del dashboard y lo retorna */
export const getStorage = async () => {
    const storage = await Asyncstorage.getItem(keyStorage)

    if (storage) {
        return JSON.parse(storage)
    } else {
        return {}
    }
}

export const Colors = {
    colorMain: "#2d2d2d",
    colorBlack: "#0d0d0d",
    colorSecondary: "#9ed3da",
    colorYellow: "#ffcb08",
    colorRed: "#c0392b",
    colorGreen: "#16a085",
}

const buttonStyle = {
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "center",
    padding: 8,
}

/**Estilos globales de la app */
export const GlobalStyles = StyleSheet.create({
    button: buttonStyle,

    containerPicker: {
        backgroundColor: Colors.colorMain,
        borderRadius: 5,
        borderWidth: 2,
        elevation: 5,
    },

    picker: {
        paddingHorizontal: 0,
        color: "#FFF",
    },

    textInput: {
        backgroundColor: Colors.colorBlack,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.colorYellow + "55",
        color: '#FFF',
        elevation: 5,
        padding: 5,
        zIndex: 50,
    },

    textButton: {
        color: Colors.colorMain,
        fontWeight: 'bold',
        fontSize: RFValue(18),
        textTransform: "uppercase",
    },

    buttonPrimaryLine: {
        ...buttonStyle,
        borderWidth: 1,
        borderColor: Colors.colorYellow,
    },

    textButtonPrimaryLine: {
        color: Colors.colorYellow,
        fontSize: RFValue(18),
        textTransform: "uppercase",
    },

    buttonPrimary: {
        ...buttonStyle,
        backgroundColor: Colors.colorYellow,
    },

    buttonSecondary: {
        ...buttonStyle,
        backgroundColor: Colors.colorSecondary,
    },

    superContainer: {
        flex: 1,
        backgroundColor: Colors.colorMain
    },
})

/**Metodo que verifica el permiso para aceeder a `Camera` */
export const CheckCameraPermission = async () => {
    try {
        // Check permission of camera
        const checkPermission = await check(PERMISSIONS.ANDROID.CAMERA)

        if (checkPermission === RESULTS.DENIED) {
            // El permiso no se ha solicitado / se ha denegado pero se puede solicitar

            // Solicitamos permiso para ocupar la camara del dispositivo
            const requestPermission = await request(PERMISSIONS.ANDROID.CAMERA)

            console.log(requestPermission)

            if (requestPermission === RESULTS.GRANTED) {
                // El usuario acepto el permiso de la camara
                const payload = {
                    camera: true
                }

                Store.dispatch({ type: SETPERMISSIONS, payload })
            }

            if (requestPermission === RESULTS.DENIED) {
                // Si el usuario 
                throw "No podrás escanear códigos de pago"
            }

            if (requestPermission === RESULTS.BLOCKED) {
                // Si el usuario 
                throw "No podrás escanear códigos de pago en el futuro"
            }
        }

        if (checkPermission === RESULTS.BLOCKED) {
            // El permiso es denegado y ya no se puede solicitar.
            throw 'Configura el permiso de tu camara a Alypay'
        }

        if (checkPermission === RESULTS.GRANTED) {
            // El usuario acepto el permiso de la camara
            const payload = {
                camera: true
            }

            Store.dispatch({ type: SETPERMISSIONS, payload })
        }
    } catch (description) {

        console.log(description)

        showMessage({
            backgroundColor: Colors.colorRed,
            color: "#FFF",
            description: description.toString(),
            icon: "warning",
            message: "AlyPay",
            autoHide: false,
        })
    }
}

/**
 * Funcion que copia un texto al portapeles
 * 
 * @param {String} text
 */
export const CopyClipboard = async (text = "") => {
    await Clipboard.setString(text)

    Toast.show("Copiado a portapeles", Toast.LONG)
}

export const reducer = (state, action) => {
    return {
        ...state,
        [action.type]: action.payload
    }
}