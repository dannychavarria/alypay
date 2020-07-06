import React, { useState, useEffect } from "react"

// import React navigation functions
import { StackActions } from "@react-navigation/native"

// Import componentes
import Loader from "../../components/Loader/Loader"
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import QRCodeScanner from "react-native-qrcode-scanner"
import { RNCamera } from "react-native-camera"
import { Text, StyleSheet, TouchableOpacity, View } from "react-native"

// Import constant
import { RFValue, CheckCameraPermission } from "../../utils/constants"

// Import store from redux
import Store from "../../store/index"
import { SETNAVIGATION } from "../../store/actionsTypes"
import Switch from "../../components/Switch/Switch"

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

const Main = ({ navigation }) => {

    const [state, setState] = useState(TYPE_VIEW.WALLET)

    const styles = StyleSheet.create({
        containerWallets: {
            marginHorizontal: RFValue(10),
        }
    })

    useEffect(() => {
        // Dispatch to redux navigation
        Store.dispatch({ type: SETNAVIGATION, payload: navigation })

        CheckCameraPermission()
    }, [])

    return (
        <Container showLogo>
            <Switch onSwitch={setState} items={switchItems} />

            {
                state === TYPE_VIEW.WALLET &&
                <View style={styles.containerWallets}>
                    <ItemWallet onPress={_ => navigation.dispatch(StackActions.push("Wallet"))} />
                </View>
            }

            {
                state === TYPE_VIEW.PAY &&
                <View style={styles.containerWallets}>
                    <PayComponent />
                </View>
            }

        </Container>
    )
}

export default Main