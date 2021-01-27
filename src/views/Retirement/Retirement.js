import React, { useReducer, useEffect } from "react"

// import components from react native
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native"

// Import components
import Container from "../../components/Container/Container"
import Modal from "react-native-modal"
import Lottie from "lottie-react-native"
import QRCodeScanner from "react-native-qrcode-scanner"

// import constants and functions
import _ from "lodash"
import { RNCamera } from "react-native-camera"
import { reducer, RFValue, Colors, GlobalStyles, WithDecimals, CheckTouchIDPermission, errorMessage, http, getHeaders, loader, successMessage, getFeePercentage } from "../../utils/constants"

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
    amountFraction: "",

    // monto de fee a cobrar
    fee: 0,
}

const Retirement = ({ route, navigation }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { params: data } = route

    const { global, functions } = store.getState()

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
        try {
            loader(true)


            // validamos si hay alguna wallet ingresada
            if (state.walletAdress.length === 0) {
                throw String("Ingresa una billetera")
            }

            const amount = parseFloat(state.amountFraction)

            // Validamos si el monto tiene un formato correcto
            if (isNaN(amount)) {
                throw String(`Monto de ${data.description} tiene un formato incorrecto`)
            }

            // verificamos los permisos del TouchID
            const auth = await CheckTouchIDPermission()

            // validamos si el usuario no esta autenticado
            if (!auth) {
                throw String("Autenticación incorrecta")
            }

            const dataSend = {
                wallet: state.walletAdress,
                id_wallet: data.id,
                amount,
                symbol: data.symbol,
            }

            const { data: response } = await http.post("/wallets/retirement", dataSend, getHeaders())

            if (response.error) {
                throw String(response.message)
            } else if (response.response === "success") {
                successMessage("Tu solictud de retiro esta en proceso")

                // limpiamos todos los campos
                dispatch({ type: "walletAdress", payload: "" })

                onChangeFractions("")
            } else {
                throw String("Tu solictud no se ha podido procesar, contacte a soporte")
            }
            
            // actualizamos la wallets
            functions?.reloadWallets()

            // retornamos a la vista anterios
            navigation.pop();
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    /** Metodo que se ejcuta para activar/desactivar el scaner QR */
    const toggleScan = () => dispatch({ type: "showScaner", payload: !state.showScaner })

    useEffect(() => {

        const dataAly = global.wallets.find((item) => {
            if (item.symbol === 'ALY') {
                return item
            }
        })

        const { fee, fee_aly } = getFeePercentage(state.amountUSD, 2, global.fee)

        const amountFee = state.amountUSD * fee

        const amountFeeAly = state.amountUSD * fee_aly


        if (dataAly.amount >= amountFeeAly) {
            dispatch({ type: 'fee', payload: { amount: amountFeeAly, symbol: 'ALY' } })
        } else {
            dispatch({ type: 'fee', payload: { amount: amountFee / data.price, symbol: data.symbol } })
        }

    }, [state.amountUSD])

    return (
        <Container showLogo>
            <KeyboardAvoidingView enabled behavior="padding">
                <View style={styles.containerWallet}>
                    <ItemWallet data={data} disabled />
                </View>

                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.legend}>Dirección de billetera externa</Text>

                        <View style={styles.rowInput}>
                            <TextInput
                                value={state.walletAdress}
                                returnKeyLabel="done"
                                onChangeText={payload => dispatch({ type: "walletAdress", payload })}
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
                            keyboardType="numeric"
                            returnKeyType="done"
                            style={GlobalStyles.textInput} />
                    </View>

                    <View style={[styles.col, { justifyContent: "center", alignItems: "center" }]}>
                        <Text style={styles.legend}>Monto (USD) Aprox.</Text>

                        <Text style={styles.legendUSDAmount}>
                            {WithDecimals(state.amountUSD)} <Text style={{ fontSize: RFValue(8) }}>USD</Text>
                        </Text>
                    </View>
                </View>

                {
                    state.amountFraction.trim() !== "" &&
                    <View style={styles.containerFee}>
                        <View style={styles.headerFee}>
                            <Text style={styles.textHeaderFee}>SubTotal</Text>
                            <Text style={styles.textHeaderFee}>Comisión</Text>
                            <Text style={styles.textHeaderFee}>Total</Text>
                        </View>

                        <View style={styles.bodyFee}>
                            <Text style={styles.textBodyFee}>{state.amountFraction} {data.symbol}</Text>
                            <Text style={styles.textBodyFee}>{_.floor(state.fee.amount, 8)} {state.fee.symbol}</Text>
                            {
                                state.fee.symbol !== data.symbol
                                    ? <Text style={styles.textBodyFee}>{state.amountFraction} {data.symbol}</Text>
                                    : <Text style={styles.textBodyFee}>{_.floor(parseFloat(state.amountFraction) + state.fee.amount, 8)} {state.fee.symbol}</Text>
                            }
                        </View>
                    </View>
                }

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
            </KeyboardAvoidingView>
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
        marginTop: RFValue(10)
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

    containerFee: {
        // backgroundColor: "red",
        flexDirection: "column",
        marginVertical: RFValue(10),
        marginHorizontal: RFValue(20),
    },

    headerFee: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomColor: Colors.colorYellow,
        borderBottomWidth: 1,
    },

    textHeaderFee: {
        color: Colors.colorYellow,
        fontSize: RFValue(12),
    },

    bodyFee: {
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    textBodyFee: {
        color: "#FFF",
    }
})

export default Retirement