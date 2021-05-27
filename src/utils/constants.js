import Asyncstorage from "@react-native-community/async-storage"
import {
    Platform,
    StatusBar,
    Dimensions,
    StyleSheet,
    Alert,
    Linking,
} from "react-native"

// Import Functions
import TouchID from "react-native-touch-id"
import Clipboard from "@react-native-community/clipboard"
import Toast from "react-native-simple-toast"
import axios from "axios"
import RNFetchBlob from "rn-fetch-blob"
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions"
import { isIphoneX } from "react-native-iphone-x-helper"
import { showMessage } from "react-native-flash-message"
import moment from "moment"

// Store and action from redux
import store from "../store/index"
import { SETPERMISSIONS, DELETESTORAGE, SETLOADER } from "../store/actionsTypes"

import Floor from "lodash/floor"

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

/**
 * Metodo que ejecuta el logOut de la aplicacion
 */
export const logOutApp = async () => {
    await deleteStorage()

    store.dispatch({ type: DELETESTORAGE })
}

/**
 *  Funcion que activa/desactiva precarga general de la aplicacion
 */
export const loader = (payload = false) =>
    store.dispatch({ type: SETLOADER, payload })

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
    colorMain: "#000",
    colorBlack: "#1d1d1d",
    colorSecondary: "#9ed3da",
    colorYellow: "#ffcb08",
    colorRed: "#c0392b",
    colorGreen: "#33d9b2",
}

const PORT = "3000"

/**Direction for server */
// export const serverAddress = "https://alypay.uc.r.appspot.com"
// export const serverAddress = "https://root-anvil-299019.uc.r.appspot.com"
// export const serverAddress = "http://192.168.0.111:3085"
export const serverAddress = "http://a1da9fb04f44.ngrok.io"
export const serverSpeedtradingsURL = "https://ardent-medley-272823.appspot.com"

/**
 * Constante que almacena la url del preview image del simbolo alycoin
 */
export const urlAlyCoin =
    "https://lh3.googleusercontent.com/5LMKBulbDnGu4JBUYp4Ye4fX0MjH88xF7hMy5-4US3VSAkxK2XIWqNxXdqWZFnUZQoRDL3W7nKhrgWWHzM_eL-1nX4fnBPu7d9u7DyRv_miLRhFp6g38cDD32_H9UoZoh936cWUpUUOLx3qvx-_fBV-ZKQb_2TzVHhR19DKYhm_Zpl_Wczi1I73a6wBo7XDbtdNUrnzW8kC_Hv8J9tpv6wQhsTCr6l68UIVwth6rkpoFycZ2Gpzn6GL_7VSs9NlCj2V5v3NHCRcsZzptz2uxAa0HcsvnEqhtOirEmjBsT114hl3LWjT4Xf9dIxcmVcdt1usggqyuF6svD2VF_fdT6SjqfmVg3ifl5zf7zS1s7JfwrIvFDjXN3i1vYo43nzpt8ykabNqDjRuwMnroAvndk2lgIh1jLcDpjlLFtCvjBej6DQUmTR2MK75RLACot2kbfiA-S45pB9tHgBc77QmzWLLMgHIhQ_5d6OtZVdzbKoGS4eUTeemPo39HuWKAMCl_RiT_O2AOfDQZr9DKOFY780VbPBpryFhlG-8rRp6p7LSKRKbn3v2C0R5GNjUJ0tyOsLArAookarLr4437Tl4SkPavSqvFKK_9rmmdFdfb1Hg5_j9gXnYV_pkTMDjIUeN3awIuZhbBC8iKtafsouFqqsfvQVXsmmawCg4edY_NXg6_XPuVjxaJST5Z7fREYx_8obZJQA=w1600-h784-ft"

const http = axios.create({
    baseURL: serverAddress,
    validateStatus: status => {
        if (status === 401) {
            Alert.alert("AlyPay", "Tu sesion ha caducado", [
                {
                    text: "Ok",
                    onPress: () => logOutApp(),
                },
            ])

            return true
        } else {
            return status >= 200 && status < 300
        }
    },
})

http.interceptors.request.use(config => {
    console.log(config.url)
    return config
})

export { http }

// Convierete un blog en un archivo previsaulizable
export const readFile = fileId =>
    new Promise(async (resolve, _) => {
        const { headers } = getHeaders()

        const response = await RNFetchBlob.config({
            fileCache: true,
            appendExt: "jpg",
        }).fetch("GET", `${serverAddress}/ecommerce/file/${fileId}`, headers)

        const base64 = await response.base64()
        resolve(`data:image/jpeg;base64,${base64}`)
    })

/**
 * general button
 */
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
        borderColor: Colors.colorYellow,
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
        color: "#FFF",
        elevation: 5,
        padding: RFValue(10),
        zIndex: 50,
    },

    textButton: {
        color: Colors.colorMain,
        // fontWeight: 'bold',
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
        backgroundColor: Colors.colorMain,
        position: "relative",
    },
})

/**Metodo que verifica el permiso para aceeder a `Camera` */
export const CheckCameraPermission = async () => {
    try {
        const { permissions } = store.getState()

        // Check permission of camera
        const checkPermission = await check(
            Platform.OS === "android"
                ? PERMISSIONS.ANDROID.CAMERA
                : PERMISSIONS.IOS.CAMERA,
        )

        if (checkPermission === RESULTS.DENIED) {
            // El permiso no se ha solicitado / se ha denegado pero se puede solicitar

            // Solicitamos permiso para ocupar la camara del dispositivo
            const requestPermission = await request(
                Platform.OS === "android"
                    ? PERMISSIONS.ANDROID.CAMERA
                    : PERMISSIONS.IOS.CAMERA,
            )

            if (requestPermission === RESULTS.GRANTED) {
                // El usuario acepto el permiso de la camara
                const payload = {
                    camera: true,
                }

                store.dispatch({ type: SETPERMISSIONS, payload })
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
            throw "Configura el permiso de tu camara a Alypay"
        }

        if (checkPermission === RESULTS.GRANTED) {
            // El usuario acepto el permiso de la camara
            const payload = {
                ...permissions,
                camera: true,
            }

            store.dispatch({ type: SETPERMISSIONS, payload })
        }
    } catch (description) {
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

/**Metodo tradicional para verificar los permisos de la camara */
export const checkPermissionCamera = () =>
    new Promise(async (resolve, reject) => {
        try {
            await request(PERMISSIONS.ANDROID.CAMERA)
            const result = await check(PERMISSIONS.ANDROID.CAMERA)

            // verificamos los tres posibles errores de permisos
            switch (result) {
                case RESULTS.DENIED: {
                    throw String("Permiso de camara denegado")
                }

                case RESULTS.BLOCKED: {
                    throw String(
                        "El permiso está denegado y ya no se puede solicitar",
                    )
                }

                case RESULTS.UNAVAILABLE: {
                    throw String("Esta función no está disponible")
                }
            }

            resolve()
        } catch (error) {
            reject(error)
        }
    })

/**
 * Funcion que se ejecuta cuando el
 * usuario no tiene ningun tipo de autenticacion TouchID/FaceID
 */
const securityNotification = () => {
    showMessage({
        icon: "info",
        message: "Sugerencia de Seguridad",
        backgroundColor: "#2f3542",
        description:
            "Te sugerimos proteger tu cuenta con autenticacion TouchID/FaceID. Toca para abrir Preferencias.",
        textStyle: {
            fontSize: RFValue(10),
        },
        onPress: () => Linking.openSettings(),
        floating: true,
        duration: 10000,
    })
}

/** Funcion que verifica que si el dispositivo tiene touchID */
export const CheckTouchIDPermission = async _ => {
    try {
        const biometricType = await TouchID.isSupported().catch(
            securityNotification,
        )

        if (biometricType) {
            await TouchID.authenticate("Para continuar", configTouchIDAuth)

            return true
        } else {
            return true
        }
    } catch (error) {
        return false
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
        [action.type]: action.payload,
    }
}

/**
 * Funcion que ejeucta un mensaje de error solamente para errores de peticion
 */
export const errorMessage = (description = "") => {
    showMessage({
        message: "Se ha producido un error",
        description,
        color: "#FFF",
        backgroundColor: Colors.colorRed,
        icon: "danger",
        duration: 5000,
    })
}

/**
 * Funcion que ejeucta un mensaje de exito
 */
export const successMessage = (description = "", title = "AlyPay") => {
    showMessage({
        message: title,
        description,
        color: "#FFF",
        backgroundColor: Colors.colorGreen,
        icon: "success",
        // autoHide: false
    })
}

/**Muestra una notificacion con estilo global */
export const showNotification = (
    message = "",
    type = "info" | "error" | "warning",
) => {
    showMessage({
        message: "Speed Tradings",
        description: message,
        color: "#FFF",
        backgroundColor: "#EE5A24",
        icon: "warning",
        duration: 10000,
    })
}

/**
 * Funcion que retorna las cabeceras de la peticions
 */
export const getHeaders = () => {
    const { token } = store.getState().global

    return {
        headers: {
            "x-auth-token": token,
        },
    }
}

export const getHeadersMultipartFormData = () => {
    const { token } = store.getState().global

    return {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "x-auth-token": token,
        },
    }
}

/**
 * Format number with decimal miles separator
 * example:
 *  * 10000 *(INPUT)*
 *  * 10,000 *(OUTPUT)*
 *
 * @param {Number} number
 *
 * `return string` */
export const WithDecimals = (number = 0) =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

/**Abre la app de whatsapp para soporte */
export const OpenSupport = () => Linking.openURL("https://wa.me/+50585570529")

/**
 * Obtiene el porcentaje del fee según el monto ingresado y el tipo de fee a verificar
 * @param {Number} amount - Monto actual
 * @param {Number} feeType - tipo de fee (1=transacción, 2=retiro, 3=exchange)
 */
export const getFeePercentage = (amount, feeType, fees) => {
    const enableFees = {
        1: "transaction",
        2: "retirement",
        3: "exchange",
    }

    const currentFeeType = enableFees[feeType]

    const [firstFee, secondFee, lastFee] = fees[currentFeeType]

    // Se verifica sí el monto está dentro del primer rango
    if (amount <= firstFee.limit) {
        return firstFee
    }
    // Se verifica sí el monto está dentro del segundo rango
    if (amount > firstFee.limit && amount <= lastFee.limit) {
        return secondFee
    }
    // Se verifica sí el monto está dentro del último rango
    if (amount > lastFee.limit) {
        return lastFee
    }
    return {}
}

export const calcAge = birthDate => {
    const NOW = moment(new Date(), "DD/MM/YYYY")
    const fromDate = birthDate

    // Se calcula la edad
    const age = moment.duration(NOW.diff(fromDate)).asYears()
    return Floor(age, 0)
}

/**
 * Configuracion de el metodo de authenticacion de touchID
 */
export const configTouchIDAuth = {
    title: "Autenticación",
    passcodeFallback: true,
    cancelText: "CANCELAR",
    fallbackLabel:'CODIGO DE SEGURIDAD'
}

/**
 *
 * @author msobalvarro
 * @summary Funcion que valida direccion de archivos del dispositovp
 * @param {String} uri
 * @returns String
 */
export const formatURI = uri =>
    Platform.OS === "android" ? uri : uri.replace("file://", "")
