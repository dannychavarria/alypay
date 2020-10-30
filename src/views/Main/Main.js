import React, { useState, useEffect, useReducer } from "react"

// Import componentes
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import QRCodeScanner from "react-native-qrcode-scanner"
import Switch from "../../components/Switch/Switch"
import { RNCamera } from "react-native-camera"
import { Text, StyleSheet, TouchableOpacity, View, TextInput, KeyboardAvoidingView } from "react-native"
import { useNavigation } from '@react-navigation/native'
import * as CryptoJS from 'react-native-crypto-js';

// Import constant and functions
import { RFValue, CheckCameraPermission, http, reducer, errorMessage, getHeaders, loader, Colors, GlobalStyles } from "../../utils/constants"

// import redux store and configuration
import store from "../../store/index"
import { SETFUNCTION } from "../../store/actionsTypes"

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
        text: "Billeteras",
        state: TYPE_VIEW.WALLET
    },
    {
        text: "AlyPay",
        state: TYPE_VIEW.PAY
    }
]


/**
 * Vista componente que se renderiza cuando 
 * el usuario ejecuta el componente pagar en el switch 
 */
const PayComponent = () => {
    const { navigate } = useNavigation()

    // Estado que almacena el valor de la orden
    const [checkAmount, setCheckAmount] = useState("")

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

            navigate("Payment", { data: { order: orderId }, scan: false })

            const { functions } = store.getState()


            // reset tab default
            functions?.resetTab()

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
            const parsedData = JSON.parse(bytes)

            navigate("Payment", { data: parsedData, scan: true })

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
                <QRCodeScanner
                    vibrate={true}
                    onRead={onReadCodeQR}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                />
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
                                keyboardAppearance="dark"
                                returnKeyType="done"
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

/// ??????
const initialState = {
    wallets: [],
    indexTabActive: 0,
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
        // asignamos el reload de los datos de las wallets
        store.dispatch({
            type: SETFUNCTION,
            payload: {
                reloadWallets: configurateComponent,
                setTabWallet: () => {
                    // asiganamos que el tab este seleccionado
                    setStateView(TYPE_VIEW.WALLET)

                    state.dispatch({ type: "indexTabActive", payload: 0 })
                }
            }
        })
    }, [])

    return (
        <Container onRefreshEnd={configurateComponent} showLogo>
            <Switch onSwitch={setStateView} items={switchItems} indexActive={state.indexTabActive} />

            <KeyboardAvoidingView enabled behavior="padding" style={styles.containerWallets}>
                {
                    stateView === TYPE_VIEW.WALLET &&
                    state.wallets.map((wallet, index) => <ItemWallet key={index} data={wallet} />)
                }

                {
                    stateView === TYPE_VIEW.PAY &&
                    <PayComponent />
                }
            </KeyboardAvoidingView>

        </Container>
    )
}

export default Main