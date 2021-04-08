import React, { useState, useEffect, useRef } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native"

// Import Constans
import {
    RFValue,
    Colors,
    GlobalStyles,
    http,
    errorMessage,
    getFeePercentage,
    getHeaders,
    successMessage,
    serverSpeedtradingsURL,
} from "../../utils/constants"

// Import Components
import Lottie from "lottie-react-native"
import Modal from "react-native-modal"
import QRCodeScanner from "react-native-qrcode-scanner"
import { View as ViewAnimation } from "react-native-animatable"
import { RNCamera } from "react-native-camera"
import _ from "lodash"
import Container from "../../components/Container/Container"
import { Picker } from "@react-native-picker/picker"

// Import redux store
import store from "../../store"

import scanQRAnimation from "../../animations/scan-qr.json"

const RetirementCommerce = ({ route, navigation }) => {
    const { global, functions } = store.getState()

    const { params: data } = route

    // Estados que guardan los montos de las monedas y el fee
    const [amount, setAmount] = useState("")
    const [amountSatochi, setTotalAmountSatochi] = useState(0)
    const [amountFee, setAmountFee] = useState(0)
    const [amountFeeUSD, setAmountFeeUSD] = useState(0)

    // Estado que guarda la direccion de la billerera
    const [walletAddress, setWalletAddress] = useState("")

    // Estado que almacena la vista del QR
    const [showScanner, setShowScanner] = useState(false)

    // Estados que guardan la lista y los precios de las monedas
    const [coinIndexSelected, setCoin] = useState(0)
    const [coinList, setCoinList] = useState([])

    const isMounted = useRef(null)
    const toggleScan = () => setShowScanner(!showScanner)

    // Funcion que permite escanear el QR
    const onReadCodeQR = ({ data }) => {
        toggleScan()
        setWalletAddress(data)
    }

    // Hacemos la peticon al server para hacer el retiro
    const _handleSubmit = async () => {
        try {
            if (amount < 5) {
                throw String("El monto minimo a retirar es de 5 USD")
            }

            const dataSent = {
                wallet: walletAddress,
                id_wallet: data.id,
                amount: amountSatochi,
                amountOriginal: parseFloat(amount),
                symbol: coinList[coinIndexSelected].symbol,
            }

            const { data: response } = await http.post(
                "ecommerce/transaction/retirement",
                dataSent,
                getHeaders(),
            )

            if (response.error) {
                throw String(response.message)
            } else if (response.response === "success") {
                successMessage("Tu solicitud de retiro esta en proceso")

                // Limpiamos todos los campos
                setWalletAddress("")
                onChangeAmountFee("")
            } else {
                errorMessage(
                    "Tu solicitud de retiro no se ha podido procesar, contacte a soporte",
                )
            }

            // actualizamos la wallets
            functions?.reloadWallets()
            // retornamos a la vista anterios
            navigation.pop()
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    // metodo que se ejecuta cuando se carga la vista
    const ConfigureComponent = async () => {
        try {
            // obtenemos los precios de las monedas principales
            const { data } = await http.get(
                `${serverSpeedtradingsURL}/collection/prices/minimal`,
            )

            // convertimos el objeto en array
            const arrayCoins = Object.values(data)

            setCoinList(arrayCoins)
        } catch (e) {
            errorMessage(e.message)
        }
    }

    // Calculamos el Fee de la moneda seleccionada
    const onChangeAmountFee = value => {
        if (coinList.length === 0) {
            return
        }

        setAmount(value)

        const { fee, fee_aly } = getFeePercentage(amount, 2, global.fee)

        let _amountFeeUSD = 0

        if (coinList[coinIndexSelected] === "ALY") {
            _amountFeeUSD = _.floor(value * fee_aly, 8)
        } else {
            _amountFeeUSD = _.floor(value * fee, 8)
        }

        setAmountFeeUSD(_amountFeeUSD)
    }

    useEffect(() => {
        isMounted.current = true
        ConfigureComponent()
        return () => {
            isMounted.current = false
        }
    }, [])

    useEffect(() => {
        if (amount.trim()) {
            // total de dolares escritos por el usuario
            const totalAmount = parseFloat(amount)

            // Precio de la moneda selecionada
            const { price } = coinList[coinIndexSelected].quote.USD

            const { fee, fee_aly } = getFeePercentage(
                totalAmount,
                2,
                global.fee,
            )

            const satochi = totalAmount / price

            // Verificamos el fee segun la moneda selecionada
            if (coinList[coinIndexSelected] === "ALY") {
                setAmountFee(_.floor(satochi * fee_aly, 8))
            } else {
                setAmountFee(_.floor(satochi * fee, 8))
            }

            setTotalAmountSatochi(_.floor(satochi, 8))
        } else {
            setTotalAmountSatochi(0)
        }
    }, [amount, coinIndexSelected])

    return (
        <Container showLogo>
            <ViewAnimation style={styles.container} animations="fadeIn">
                <View style={styles.containerTitle}>
                    <Text style={styles.legendTitle}>Retirar Fondos</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.legend}>
                            Dirección de billetera externa
                        </Text>

                        <View style={styles.rowInput}>
                            <TextInput
                                style={[GlobalStyles.textInput, { flex: 1 }]}
                                value={walletAddress}
                                placeholder="Ingrese billetera"
                                placeholderTextColor="#CCC"
                                onChangeText={setWalletAddress}
                                returnKeyLabel="next"
                            />

                            <TouchableOpacity
                                onPress={toggleScan}
                                style={styles.buttonScan}>
                                <Lottie
                                    source={scanQRAnimation}
                                    style={styles.lottieQRAnimation}
                                    autoPlay
                                    loop
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.colSelectionCoin}>
                        <Text style={styles.legend}>Moneda</Text>

                        <View style={GlobalStyles.containerPicker}>
                            <Picker
                                style={GlobalStyles.picker}
                                selectedValue={coinIndexSelected}
                                itemStyle={{
                                    height: RFValue(35),
                                    backgroundColor: "transparent",
                                }}
                                onValueChange={value => setCoin(value)}>
                                {coinList.map((item, index) => (
                                    <Picker.Item
                                        enabled={true}
                                        key={index}
                                        label={item.symbol}
                                        value={index}
                                        color={Colors.colorMain}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.col}>
                        <Text style={styles.legend}>Monto a retirar (USD)</Text>

                        <View style={styles.rowInput}>
                            <TextInput
                                style={[GlobalStyles.textInput, { flex: 1 }]}
                                value={amount}
                                onChangeText={onChangeAmountFee}
                                keyboardType="numeric"
                                placeholderTextColor="#FFF"
                                placeholder="0.00 (USD)"
                                returnKeyType="done"
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.totalFees}>
                    <View style={styles.containerPrinc}>
                        <View style={styles.containerTitleFee}>
                            <Text style={styles.legend}>Monto</Text>
                            <Text style={styles.legend}>
                                Fee ({coinList[coinIndexSelected]?.symbol})
                            </Text>
                            <Text style={styles.legend}>Fee (USD)</Text>
                        </View>

                        <View style={styles.containerTitleFee}>
                            <Text style={styles.legendSubtitle}>
                                {amountSatochi}
                            </Text>
                            <Text style={styles.legendSubtitle}>
                                {amountFee}
                            </Text>
                            <Text style={styles.legendSubtitle}>
                                {amountFeeUSD}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.col}>
                    <Text style={styles.totalSatochi}>
                        {_.floor(amountSatochi + amountFee, 8)}{" "}
                        {coinList[coinIndexSelected]?.symbol}
                    </Text>
                </View>

                <View style={{ padding: 15 }}>
                    <TouchableOpacity
                        onPress={_handleSubmit}
                        style={GlobalStyles.buttonPrimary}>
                        <Text style={GlobalStyles.textButton}>
                            Retirar fondos
                        </Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    backdropOpacity={0.9}
                    animationIn="fadeIn"
                    onBackButtonPress={toggleScan}
                    onBackdropPress={toggleScan}
                    animationOut="fadeOut"
                    isVisible={showScanner}>
                    <View style={styles.constainerQR}>
                        <QRCodeScanner
                            onRead={onReadCodeQR}
                            flashMode={RNCamera.Constants.FlashMode.auto}
                        />
                    </View>
                </Modal>
            </ViewAnimation>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingHorizontal: RFValue(10),
    },

    col: {
        flex: 1,
        marginHorizontal: RFValue(10),
    },

    colSelectionCoin: {
        // flex: 1,
        width: "30%",
        marginHorizontal: RFValue(10),
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: RFValue(10),
    },

    legend: {
        color: Colors.colorYellow,
    },

    rowInput: {
        position: "relative",
        alignItems: "center",
        flexDirection: "row",
    },

    buttonScan: {
        backgroundColor: Colors.colorYellow,
        borderRadius: RFValue(5),
        // padding: RFValue(-),
        marginLeft: RFValue(10),
        zIndex: 1000,
    },

    lottieQRAnimation: {
        height: RFValue(50),
        width: RFValue(35),
    },
    constainerQR: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: RFValue(5),
        height: RFValue(320),
        overflow: "hidden",
    },
    retirementText: {
        fontSize: RFValue(16),
        color: Colors.colorYellow,
        textDecorationLine: "underline",
        textDecorationColor: Colors.colorYellow,
        textDecorationStyle: "double",
        paddingBottom: 5,
        textTransform: "uppercase",
    },
    retirementContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        marginHorizontal: RFValue(10),
    },
    cardInfo: {
        alignItems: "center",
        backgroundColor: Colors.colorGreen,
        justifyContent: "space-between",
        padding: RFValue(10),
        borderRadius: RFValue(10),
        marginVertical: RFValue(25),
        elevation: 25,
        flexDirection: "row",
    },
    subCard: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
    },
    avatar: {
        resizeMode: "contain",
        overflow: "hidden",
        width: RFValue(64),
        height: RFValue(64),
        marginRight: RFValue(15),
    },
    usernameCard: {
        fontSize: RFValue(16),
        color: Colors.colorYellow,
    },
    textFromCard: {
        fontSize: RFValue(12),
        color: "#FFF",
    },
    lottieVerifed: {
        height: RFValue(32),
        width: RFValue(32),
    },
    logo: {
        alignSelf: "center",
        // backgroundColor: 'red',
        resizeMode: "contain",
        height: RFValue(160),
        width: RFValue(380),
    },
    totalSatochi: {
        alignSelf: "center",
        color: Colors.colorYellow,
        fontSize: RFValue(24),
        marginVertical: RFValue(10),
    },
    totalSatochiFee: {
        alignSelf: "center",
        color: Colors.colorYellow,
        fontSize: RFValue(12),
        marginVertical: RFValue(10),
    },
    containerTitle: {
        marginTop: RFValue(10),
        flexDirection: "row",
        justifyContent: "center",
    },
    legendTitle: {
        color: Colors.colorYellow,
        fontSize: RFValue(24),
        textTransform: "uppercase",
        marginBottom: 10,
    },
    totalFees: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: Colors.colorYellow,
        borderBottomColor: Colors.colorYellow,
        marginHorizontal: RFValue(10),
    },
    containerTitleFee: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: RFValue(5),
    },
    containerPrinc: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    legendSubtitle: {
        color: "#FFF",
        fontSize: RFValue(16),
    },
})

export default RetirementCommerce
