import React, { useState, useEffect, useRef } from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"

// Import Components
import Container from "../../components/Container/Container"
import Lottie from "lottie-react-native"
import Modal from "react-native-modal"
import QRCodeScanner from "react-native-qrcode-scanner"
import Floor from "lodash/floor"
import { Picker } from "@react-native-picker/picker"
import { RNCamera } from "react-native-camera"
import { View as ViewAnimation } from "react-native-animatable"

// Import Styles
import { RetirementExcutiveStyles } from "../../Styles/Views/index"
import { GlobalStyles, Colors, errorMessage } from "../../utils/constants"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"
import useRetreats from "../../hooks/Retreats/useRetreats.hook"

// Import Assets
import scanQRAnimation from "../../animations/scan-qr.json"

// Import redux store
import store from "../../store"

const RetirementExcutive = () => {
    const classes = useStyles(RetirementExcutiveStyles)
    const { global } = store.getState()
    console.log(global)

    const {
        getListCoin,
        infoCoin,
        onChangeAmountFee,
        amount,
        amountFeeUSD,
        amountFee,
        amountSatochi,
        totalAmount,
        submintInformation,
    } = useRetreats()

    // Estado que guarda la direccion de la billerera
    const [walletAddress, setWalletAddress] = useState("")

    // Estado que almacena la vista del QR
    const [showScanner, setShowScanner] = useState(false)

    // Estados que guardan la lista y los precios de las monedas
    const [coinIndexSelected, setCoin] = useState(0)

    const toggleScan = () => setShowScanner(!showScanner)

    // Funcion que permite escanear el QR
    const onReadCodeQR = ({ data }) => {
        toggleScan()
        setWalletAddress(data)
    }

    const submit = () => {
        const dataSet = {
            wallet: walletAddress,
            id_wallet: 51,
            amount: amountSatochi,
            amountOriginal: parseFloat(amount) || 0,
            symbol: infoCoin[coinIndexSelected].symbol,
        }
        submintInformation(dataSet)
    }

    useEffect(() => {
        getListCoin()
    }, [])

    useEffect(() => {
        totalAmount(coinIndexSelected)
    }, [amount, coinIndexSelected])

    return (
        <Container showLogo>
            <ViewAnimation style={classes.container} animation="fadeIn">
                <View style={classes.containerTitle}>
                    <Text style={classes.legendTitle}>Retirar Fondos</Text>
                </View>

                <View style={classes.row}>
                    <View style={classes.col}>
                        <Text style={classes.legend}>
                            Direccion de billetera externa
                        </Text>

                        <View style={classes.rowInput}>
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
                                style={classes.buttonScan}>
                                <Lottie
                                    source={scanQRAnimation}
                                    style={classes.lottieQRAnimation}
                                    autoPlay
                                    loop
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={classes.row}>
                    <View style={classes.colSelectionCoin}>
                        <Text style={classes.legend}>Moneda</Text>

                        <View style={GlobalStyles.containerPicker}>
                            <Picker
                                style={GlobalStyles.picker}
                                selectedValue={coinIndexSelected}
                                itemStyle={classes.pickerItem}
                                onValueChange={value => setCoin(value)}>
                                {Array.isArray(infoCoin) &&
                                    infoCoin.map((item, index) => (
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

                    <View style={classes.col}>
                        <Text style={classes.legend}>
                            Monto a retirar (USD)
                        </Text>

                        <View style={classes.rowInput}>
                            <TextInput
                                style={[GlobalStyles.textInput, { flex: 1 }]}
                                value={amount}
                                onChangeText={value =>
                                    onChangeAmountFee(value, coinIndexSelected)
                                }
                                keyboardType="numeric"
                                placeholderTextColor="#FFF"
                                placeholder="0.00 (USD)"
                                returnKeyType="done"
                            />
                        </View>
                    </View>
                </View>

                <View style={classes.totalFees}>
                    <View style={classes.containerPrinc}>
                        <View style={classes.containerTitleFee}>
                            <Text style={classes.legend}>Monto</Text>
                            <Text style={classes.legend}>
                                Fee ({infoCoin[coinIndexSelected]?.symbol})
                            </Text>
                            <Text style={classes.legend}>Fee (USD)</Text>
                        </View>

                        <View style={classes.containerTitleFee}>
                            <Text style={classes.legendSubtitle}>
                                {amountSatochi}
                            </Text>
                            <Text style={classes.legendSubtitle}>
                                {amountFee}
                            </Text>
                            <Text style={classes.legendSubtitle}>
                                {amountFeeUSD}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={classes.col}>
                    <Text style={classes.totalSatochi}>
                        {Floor(amountSatochi + amountFee, 8)}{" "}
                        {infoCoin[coinIndexSelected]?.symbol}
                    </Text>
                </View>

                <View style={{ padding: 15 }}>
                    <TouchableOpacity
                        onPress={submit}
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
                    <View style={classes.constainerQR}>
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

export default RetirementExcutive
