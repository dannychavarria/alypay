import React, { useState, useEffect, useReducer } from "react"

// Import componentes
import Loader from "../../components/Loader/Loader"
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import QRCodeScanner from "react-native-qrcode-scanner"
import Switch from "../../components/Switch/Switch"
import { RNCamera } from "react-native-camera"
import { Text, StyleSheet, TouchableOpacity, View } from "react-native"
import { showMessage } from "react-native-flash-message"

// Import constant
import { RFValue, CheckCameraPermission, htttp, reducer, errorMessage, getHeaders } from "../../utils/constants"

// Import store from redux
import store from "../../store/index"
import { SETNAVIGATION } from "../../store/actionsTypes"

// Import Assets

/**
 * Constante que almacena el tipo de vista seleccionada del switch
 * Types: `wallet` or `pay`
 */
const TYPE_VIEW = {
    WALLET: "wallet",
    PAY: "pay"
}

/**
 * Constante que almacena los datos a mostrar en el switch
 */
const switchItems = [
    {
        text: "Wallets",
        state: TYPE_VIEW.WALLET
    },
    {
        text: "Pagar",
        state: TYPE_VIEW.PAY
    }
]

/**
 * Vista componente que se renderiza cuando 
 * el usuario ejecuta el componente pagar en el switch 
 */
const PayComponent = () => {
    const onReadCodeQR = (data) => {
        console.log(data)
    }

    const styles = StyleSheet.create({
        constainerQR: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: RFValue(5),
            height: RFValue(320),
            overflow: "hidden",
        }
    })

    return (
        <View style={styles.constainerQR}>
            <QRCodeScanner
                sty
                onRead={onReadCodeQR}
                flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                    <Text>Scan Code Example</Text>
                }
                bottomContent={
                    <TouchableOpacity>
                        <Text>OK. Got it!</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

const initialState = {
    wallets: []
}

const Main = ({ navigation }) => {
    const { global } = store.getState()

    const [stateView, setStateView] = useState(TYPE_VIEW.WALLET)

    const [state, dispatch] = useReducer(reducer, initialState)

    const styles = StyleSheet.create({
        containerWallets: {
            marginHorizontal: RFValue(10),
        }
    })

    /**
     * Metodo que configura el componente, inicializando todas las tareas
     */
    const configurateComponent = () => {
        try {
            htttp.get("/wallets", getHeaders()).then(response => {
                const { data } = response

                if (data.error) {
                    throw data.message
                } else {
                    dispatch({ type: "wallets", payload: data })
                }
            })
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    useEffect(() => {
        // Dispatch to redux navigation
        store.dispatch({ type: SETNAVIGATION, payload: navigation })

        configurateComponent()

        CheckCameraPermission()
    }, [])

    return (
        <Container showLogo>
            <Switch onSwitch={setStateView} items={switchItems} />

            <View style={styles.containerWallets}>
                {
                    stateView === TYPE_VIEW.WALLET &&
                    state.wallets.map((wallet, index) => <ItemWallet key={index} data={wallet} />)
                }

                {
                    stateView === TYPE_VIEW.PAY &&
                    <PayComponent />
                }
            </View>

        </Container>
    )
}

export default Main