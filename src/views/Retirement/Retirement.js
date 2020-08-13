import React, { useReducer, useEffect } from "react"

// import components from react native
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native"

// Import components
import Container from "../../components/Container/Container"
import Modal from "react-native-modal"
import Lottie from "lottie-react-native"
import QRCodeScanner from "react-native-qrcode-scanner"

// import constants and functions
import TouchID from "react-native-touch-id"
import { RNCamera } from "react-native-camera"
import { reducer, RFValue, Colors, GlobalStyles, WithDecimals, CheckTouchIDPermission } from "../../utils/constants"

// Import Assets
import scanQRAnimation from "../../animations/scan-qr.json"
import ItemWallet from "../../components/ItemWallet/ItemWallet"

// store from redux
import store from "../../store"

const initialState = {

    // direccion wallet a depositar
    walletAdress: "",

    // mostar/coultar modal de scaner
    showScaner: false,

    // monto en dolares
    amountUSD: 0,

    // fraccion de moneda
    amountFraction: ""
}

const Retirement = ({ route }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { params: data } = route

    /** Metodo que se ejecuta cuando el lector QR lee el codigo */
    const onReadCodeQR = ({ data }) => {
        toggleScan()

        dispatch({ type: "walletAdress", payload: data })
    }

    /** Metodo que se ejeucta cuando el suuario escibe el monto en fracciones */
    const onChangeFractions = (payload = "") => {
        dispatch({ type: "amountFraction", payload })

        const newAmount = data.price * parseFloat(payload)

        dispatch({ type: "amountUSD", payload: isNaN(newAmount) ? 0 : newAmount.toFixed(2) })
    }

    /** Metodo que se ejcuta cuando el usuario  */
    const onSubmit = async () => {
        await CheckTouchIDPermission()


        const { permissions } = store.getState()

        if (permissions.touchID === true) {
            await TouchID.authenticate("Para continuar", {
                title: "Retiro Alypay",
                passcodeFallback: true,
                cancelText: "CANCELAR"
            })
        }
    }

    /** Metodo que se ejcuta para activar/desactivar el scaner QR */
    const toggleScan = () => dispatch({ type: "showScaner", payload: !state.showScaner })

    return (
        <Container showLogo>
            <View style={styles.containerWallet}>
                <ItemWallet data={data} disabled />
            </View>

            <Text style={styles.textTitle}>Retirar fondos</Text>

            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.legend}>Dirección de billetera externa</Text>

                    <View style={styles.rowInput}>
                        <TextInput
                            value={state.walletAdress}
                            onChangeText={payload => dispatch({ type: "walletAdress", payload })}
                            // onBlur={onComprobateWallet}
                            style={[GlobalStyles.textInput, { flex: 1 }]} />

                        <TouchableOpacity onPress={toggleScan} style={styles.buttonScan}>
                            <Lottie source={scanQRAnimation} style={styles.lottieQRAnimation} autoPlay loop />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.legend}>Monto ({data.symbol})</Text>

                    <TextInput
                        value={state.amountFraction}
                        onChangeText={onChangeFractions}
                        keyboardType="number-pad"
                        style={GlobalStyles.textInput} />
                </View>

                <View style={[styles.col, { justifyContent: "center", alignItems: "center" }]}>
                    <Text style={styles.legend}>Monto (USD)</Text>

                    <Text style={styles.legendUSDAmount}>
                        {WithDecimals(state.amountUSD)} <Text style={{ fontSize: RFValue(8) }}>USD</Text>
                    </Text>
                </View>
            </View>

            <Text style={styles.legendText}>Recuerda que comisión es de 1.5% si tienes Alycoin's, de lo contrario tu comisión será de 2.5%</Text>

            <TouchableOpacity onPress={onSubmit} style={[GlobalStyles.buttonPrimary, styles.buttonSend]}>
                <Text style={GlobalStyles.textButton}>Retirar</Text>
            </TouchableOpacity>

            <Modal backdropOpacity={0.9} animationIn="fadeIn" onBackButtonPress={toggleScan} onBackdropPress={toggleScan} animationOut="fadeOut" isVisible={state.showScaner}>
                <View style={styles.constainerQR}>
                    <QRCodeScanner
                        onRead={onReadCodeQR}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                    />
                </View>
            </Modal>
        </Container>
    )
}

const styles = StyleSheet.create({
    containerWallet: {
        margin: RFValue(10),
    },

    textTitle: {
        alignSelf: "center",
        color: Colors.colorYellow,
        fontSize: RFValue(16),
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: RFValue(10),
        marginHorizontal: RFValue(10),
    },

    col: {
        flex: 1,
        marginHorizontal: RFValue(10),
    },

    legend: {
        color: Colors.colorYellow,
        marginBottom: RFValue(5)
    },

    legendUSDAmount: {
        color: "#FFF",
        fontSize: RFValue(24)
    },

    rowInput: {
        alignItems: "center",
        flexDirection: "row"
    },

    lottieQRAnimation: {
        height: RFValue(32),
        width: RFValue(32),
    },

    buttonSend: {
        marginHorizontal: "10%",
    },

    legendText: {
        alignSelf: "center",
        color: Colors.colorYellow,
        fontSize: RFValue(8),
        textAlign: "center",
        marginVertical: RFValue(25),
        marginHorizontal: "10%",
        opacity: 0.5,
    },

    constainerQR: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: RFValue(5),
        height: RFValue(320),
        overflow: "hidden",
    },

    buttonScan: {
        backgroundColor: Colors.colorYellow,
        borderRadius: RFValue(5),
        padding: RFValue(5),
        marginLeft: RFValue(10),
        zIndex: 1000,
    },
})

export default Retirement