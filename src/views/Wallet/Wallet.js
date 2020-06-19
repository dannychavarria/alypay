import React, { useState, useReducer } from "react"

// Import components
import Switch from "../../components/Switch/Switch"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import Container from "../../components/Container/Container"

// Import other components
import Lottie from "lottie-react-native"
import QRCode from "react-native-qrcode-svg"

// Import Others components from React-Native
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import { View as ViewAnimate } from "react-native-animatable"


// Import constanst and others things
import { Colors, RFValue, GlobalStyles, CopyClipboard, reducer } from "../../utils/constants"

// Import Assets
import logo from "../../static/alypay.png"
import scanQRAnimation from "../../animations/scan-qr.json"

const switchItems = [
    {
        text: "Recibir",
        state: "RECEIVE"
    },

    {
        text: "Enviar",
        state: "SEND"
    },

    {
        text: "Historial",
        state: "HISTORY"
    },
]

/**
 * Componente que renderiza un qr con la direccion wallet
 */
const ReceiveComponent = ({ wallet = "" }) => {
    return (
        <ViewAnimate animation="fadeIn" style={styles.receivedViewContainer}>
            <View style={styles.qrContainer}>
                <QRCode
                    size={RFValue(256)}
                    backgroundColor="transparent"
                    value={wallet} />
            </View>

            <TouchableOpacity style={GlobalStyles.buttonPrimaryLine} onPress={_ => CopyClipboard(wallet)}>
                <Text selectable style={GlobalStyles.textButtonPrimaryLine}>{wallet}</Text>
            </TouchableOpacity>
        </ViewAnimate>
    )
}


/**Constante que almacena los estado de `SendComponent` */
const initialStateSendComponent = {
    amountFraction: "",
    amountUSD: "",
    walletAdress: "",
}

const SendComponent = () => {
    const [state, dispatch] = useReducer(reducer, initialStateSendComponent)


    const styles = StyleSheet.create({
        container: {
            width: "100%",
            paddingHorizontal: RFValue(10),
        },

        col: {
            flex: 1,
            marginHorizontal: RFValue(10),
        },

        row: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: RFValue(10)
        },

        legend: {
            color: Colors.colorYellow
        },

        rowInput: {
            alignItems: "center",
            flexDirection: "row"
        },

        buttonScan: {
            backgroundColor: Colors.colorYellow,
            borderRadius: RFValue(5),
            padding: RFValue(5),
            marginLeft: RFValue(10),
            zIndex: 1000,
        },

        lottieQRAnimation: {
            height: RFValue(32),
            width: RFValue(32),
        }
    })

    return (
        <ViewAnimate style={styles.container} animation="fadeIn">
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.legend}>Dirección wallet</Text>

                    <View style={styles.rowInput}>
                        <TextInput
                            value={state.amountFraction}
                            onChangeText={payload => dispatch({ type: "amountFraction", payload })}
                            style={[GlobalStyles.textInput, { flex: 1 }]} />

                        <TouchableOpacity style={styles.buttonScan}>
                            <Lottie source={scanQRAnimation} style={styles.lottieQRAnimation} autoPlay loop />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.legend}>Monto (Fracciones)</Text>

                    <TextInput
                        value={state.amountFraction}
                        onChangeText={payload => dispatch({ type: "amountFraction", payload })}
                        style={GlobalStyles.textInput} />
                </View>

                <View style={styles.col}>
                    <Text style={styles.legend}>Monto (USD)</Text>

                    <TextInput
                        value={state.amountUSD}
                        onChangeText={payload => dispatch({ type: "amountUSD", payload })}
                        style={GlobalStyles.textInput} />
                </View>
            </View>


            <View style={{ height: RFValue(10) }} />


            <TouchableOpacity style={GlobalStyles.buttonPrimary}>
                <Text style={GlobalStyles.textButton}>Enviar</Text>
            </TouchableOpacity>
        </ViewAnimate>
    )
}

const Wallet = () => {
    const [state, setState] = useState(switchItems[0].state)

    const walletDirection = "3FALsBdWnBLTm6EC5DMyTntZBpAR9AhvmM"


    return (
        <Container>

            <View style={styles.conatinerWallet}>
                <ItemWallet />
            </View>

            <Switch onSwitch={setState} items={switchItems} />

            {
                // Verificamos si esta en la pantalla de Recibir
                state === switchItems[0].state &&
                <ReceiveComponent wallet={walletDirection} />
            }

            {
                state === switchItems[1].state &&
                <SendComponent />
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    conatinerWallet: {
        margin: RFValue(10),
    },

    qrContainer: {
        backgroundColor: Colors.colorYellow,
        borderRadius: RFValue(5),
        padding: RFValue(12),
        marginBottom: RFValue(10),
    },

    receivedViewContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
})

export default Wallet