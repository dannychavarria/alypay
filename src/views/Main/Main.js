import React, { useState, useCallback, useEffect } from "react"

// import React navigation functions
import { StackActions } from "@react-navigation/native"

// Import componentes
import Loader from "../../components/Loader/Loader"
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import QRCodeScanner from "react-native-qrcode-scanner"
import { RNCamera } from "react-native-camera"
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native"

// Import constant
import { Colors, RFValue, CheckCameraPermission } from "../../utils/constants"

// Import store from redux
import Store from "../../store/index"
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
 * Componente de switch wallet/sell
 * 
 * @param {Function} onChange 
 */
const Switch = ({ onSwitch = () => { } }) => {
    const [state, setState] = useState(TYPE_VIEW.WALLET)

    // Esperamos que el estado cambie para saber cuando el usuario cambia de estado
    const changeState = useCallback(() => onSwitch(state), [state])

    useEffect(() => changeState(), [state])

    const stylesSwitcher = StyleSheet.create({
        container: {
            alignItems: "center",
            borderColor: Colors.colorYellow,
            borderWidth: 1,
            borderRadius: RFValue(50),
            padding: RFValue(2),
            margin: RFValue(20),
            flexDirection: "row",
            justifyContent: "space-between",
        },

        buttons: {
            alignItems: "center",
            padding: RFValue(10),
            borderRadius: RFValue(50),
            width: "50%"
        },

        buttonActive: {
            backgroundColor: Colors.colorYellow,
        },

        textButton: {
            fontSize: RFValue(24),
        },

        textButtonActive: {
            color: Colors.colorMain,
        },

        buttonDisactive: {
            backgroundColor: "transparent",
        },

        textButtonDisactive: {
            color: Colors.colorYellow,
        },
    })

    return (
        <View style={stylesSwitcher.container}>
            <TouchableOpacity onPress={_ => setState(TYPE_VIEW.WALLET)} style={[state === TYPE_VIEW.WALLET ? stylesSwitcher.buttonActive : stylesSwitcher.buttonDisactive, stylesSwitcher.buttons]}>
                <Text style={[state === TYPE_VIEW.WALLET ? stylesSwitcher.textButtonActive : stylesSwitcher.textButtonDisactive, stylesSwitcher.textButton]}>
                    Wallets
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={_ => setState(TYPE_VIEW.PAY)} style={[state === TYPE_VIEW.PAY ? stylesSwitcher.buttonActive : stylesSwitcher.buttonDisactive, stylesSwitcher.buttons]}>
                <Text style={[state === TYPE_VIEW.PAY ? stylesSwitcher.textButtonActive : stylesSwitcher.textButtonDisactive, stylesSwitcher.textButton]}>
                    Pagar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const PayComponent = () => {
    const { } = Store.getState()

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
            <Switch onSwitch={setState} />

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