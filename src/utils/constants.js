import Asyncstorage from "@react-native-community/async-storage"
import { Alert, Platform, StatusBar, Dimensions, StyleSheet, Linking } from "react-native"
import { isIphoneX } from "react-native-iphone-x-helper"

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
        backgroundColor: Colors.colorMain,
        borderRadius: 5,
        borderWidth: 2,
        color: '#FFF',
        elevation: 5,
        padding: 5,
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