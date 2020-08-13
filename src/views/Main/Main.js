import React, { useState, useEffect, useReducer } from "react"

// Import componentes
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import QRCodeScanner from "react-native-qrcode-scanner"
import Switch from "../../components/Switch/Switch"
import { RNCamera } from "react-native-camera"
import { Text, StyleSheet, TouchableOpacity, View } from "react-native"

// Import constant
import { RFValue, CheckCameraPermission, http, reducer, errorMessage, getHeaders, loader } from "../../utils/constants"

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
                flashMode={RNCamera.Constants.FlashMode.auto}
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
    const configurateComponent = async () => {
        try {
            loader(true)

            const { data } = await http.get("/wallets", getHeaders())

            if (data.error) {
                throw data.message
            } else {
                dispatch({ type: "wallets", payload: data })
            }
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    useEffect(() => {
        configurateComponent()

        CheckCameraPermission()
    }, [])

    return (
        <Container onRefreshEnd={configurateComponent} showLogo>
            {/* <Switch onSwitch={setStateView} items={switchItems} /> */}

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