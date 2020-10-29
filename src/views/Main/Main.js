import React, { useState, useEffect, useReducer, } from "react"

// Import componentes
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import QRCodeScanner from "react-native-qrcode-scanner"
import Switch from "../../components/Switch/Switch"
import { RNCamera } from "react-native-camera"
import { Text, StyleSheet, TouchableOpacity, View, TextInput, } from "react-native"
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import * as CryptoJS from 'react-native-crypto-js';
import LoaderScan from '../../components/Loader/LoaderScan'

// Import constant
import { RFValue, CheckCameraPermission, http, reducer, errorMessage, getHeaders, loader, Colors, GlobalStyles } from "../../utils/constants"

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
const PayComponent = ({ onChangeTransactionStatus = _ => { } }) => {
    const { navigate } = useNavigation()

    // Estado que renderiza la lectura del QR cada 10s
    const [reload, setReload] = useState(true)

    // Estado que almacena el valor de la orden
    const [checkAmount, setCheckAmount] = useState("")

    // let checkInterval = null

    // const checkTransactionStatus = async _ => {
    //     try {
    //         const status = await AsyncStorage.getItem('transactionStatus')
    //         console.log(status)
    //         if (status) {
    //             await AsyncStorage.removeItem('transactionStatus')
    //             onChangeTransactionStatus()
    //             window.clearInterval(checkInterval)
    //         }
    //         console.log('interval')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    /**
     * Funcion que realiza el pago si la orden es escrita
     * @param {*} orderId 
     */
    const submit = async (orderId) => {
        try {
            loader(true)

            // Verificamos si hay un numero de orden para hacer el pago
            if (checkAmount.trim().length === 0) {
                throw String("Ingresa el numero de orden para continuar el pago")
            }

            navigate("Pagar", { data: { order: orderId }, scan: false })
            // checkInterval = _ => checkTransactionStatus()
            // window.setInterval(checkInterval, 1000)

        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    /**
     *  Fucnion que hace la lectura del QR
     * @param {*} response 
     */
    const onReadCodeQR = async (response) => {
        try {
            loader(true)

            const splitData = response.data.split(',')
            const bytes = CryptoJS.AES.decrypt(splitData[0], splitData[1]).toString(CryptoJS.enc.Utf8)
            const parsedData = JSON.parse(bytes);
            setReload(false)

            window.setTimeout(_ => setReload(true), 1000)
            navigate("Pagar", { data: parsedData, scan: true })
            // checkInterval = _ => checkTransactionStatus()
            // window.setInterval(checkInterval, 1000)

        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    const styles = StyleSheet.create({
        constainerQR: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: RFValue(5),
            height: RFValue(320),
            overflow: "hidden",
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
        buttonPay: {
            backgroundColor: Colors.colorYellow,
            borderRadius: RFValue(5),
            padding: RFValue(10),
            marginLeft: RFValue(10),
            zIndex: 1000,
        },

    })

    return (
        <>
            <View style={styles.constainerQR}>
                {
                    reload &&
                    <QRCodeScanner
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
                }
            </View>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 10 }}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.legend}>Numero de Orden</Text>

                        <View style={styles.rowInput}>
                            <TextInput
                                style={[GlobalStyles.textInput, { flex: 1 }]}
                                placeholder="Ingrese el numero de orden"
                                placeholderTextColor="#FFF"
                                keyboardType="numeric"
                                value={checkAmount}
                                onChangeText={setCheckAmount}
                            />

                            <TouchableOpacity style={styles.buttonPay} onPress={() => submit(checkAmount)}>
                                <Text>PAGAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>

    )
}

const initialState = {
    wallets: []
}

const Main = () => {
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
                throw String(data.message)
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
            <Switch onSwitch={setStateView} items={switchItems} />

            <View style={styles.containerWallets}>
                {
                    stateView === TYPE_VIEW.WALLET &&
                    state.wallets.map((wallet, index) => <ItemWallet key={index} data={wallet} />)
                }

                {
                    stateView === TYPE_VIEW.PAY &&
                    <PayComponent
                        onChangeTransactionStatus={_ => setStateView(TYPE_VIEW.WALLET)} />
                }
            </View>

        </Container>
    )
}

export default Main