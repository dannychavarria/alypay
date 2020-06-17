import React, { useState, useCallback, useEffect } from "react"

// Import componentes
import Loader from "../../components/Loader/Loader"
import Container from "../../components/Container/Container"
import QRCodeScanner from "react-native-qrcode-scanner"
import { RNCamera } from "react-native-camera"
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native"

// Import store from redux
import Store from "../../store/index"
import { Colors, RFValue, CheckCameraPermission } from "../../utils/constants"

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
    const onReadCodeQR = (data) => {
        console.log(data)
    }

    return (
        <QRCodeScanner
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
    )
}

/**
 * Componente que representa la billetera del usuario
 */
const ItemWallet = () => {
    const urlImage = "https://s2.coinmarketcap.com/static/img/coins/128x128/1.png"

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            backgroundColor: Colors.colorBlack,
            borderRadius: RFValue(5),
            padding: RFValue(10),
            flexDirection: "row",
        },

        image: {
            resizeMode: "contain",
            marginRight: RFValue(10),
            height: RFValue(64),
            width: RFValue(64),
        },

        subContainerInfo: {
            flex: 1,
        },

        row: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: RFValue(2.5),
            width: "100%",
        },

        lastCol: {
            alignItems: "flex-end",
        },

        key: {
            color: "#CCC",
            fontSize: RFValue(12),
        },

        superValue: {
            color: Colors.colorYellow,
            fontSize: RFValue(24),
        },

        value: {
            color: Colors.colorYellow,
            fontSize: RFValue(16),
        },
    })

    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} source={{ uri: urlImage }} />

            <View style={styles.subContainerInfo}>
                <View style={styles.row}>
                    <Text style={styles.superValue}>
                        Bitcoin
                    </Text>

                    <View style={styles.lastCol}>
                        <Text style={styles.key}>Balance</Text>
                        <Text style={styles.value}>0.0002 BTC</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.key}>Precio del mercado</Text>
                        <Text style={styles.value}>$ 9,580.54</Text>
                    </View>

                    <View style={styles.lastCol}>
                        <Text style={styles.key}>Balance USD</Text>
                        <Text style={styles.value}>$ 25</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Main = () => {
    /**Store from reduz */
    const store = Store.getState()

    const [state, setState] = useState(TYPE_VIEW.WALLET)

    const styles = StyleSheet.create({
        containerWallets: {
            marginHorizontal: RFValue(10),
        }
    })    

    useEffect(() => {
        console.log(store)

        CheckCameraPermission()

        Store.subscribe((e) => {
            const newStore = Store.getState()

            console.log(e)

            console.log(newStore)
        })
    }, [])

    return (
        <Container showLogo>
            <Switch onSwitch={e => console.log(e)} />

            {
                state === TYPE_VIEW.WALLET &&
                <View style={styles.containerWallets}>
                    <ItemWallet />
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