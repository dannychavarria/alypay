import React, { useState, useEffect, useReducer, useRef } from "react"

// Import componentes
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import QRCodeScanner from "react-native-qrcode-scanner"
import Switch from "../../components/Switch/Switch"
import Modal from "react-native-modal"
import { SETFUNCTION, SETSTORAGE } from "../../store/actionsTypes"
import { RNCamera } from "react-native-camera"
import { Text, StyleSheet, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Platform, FlatList } from "react-native"
import { Image } from "react-native-animatable"
import { useNavigation } from '@react-navigation/native'

// Import constant and functions
import * as CryptoJS from 'react-native-crypto-js';
import { RFValue, CheckCameraPermission, http, reducer, errorMessage, getHeaders, loader, Colors, GlobalStyles } from "../../utils/constants"

// import redux store and configuration
import store from "../../store/index"
import { BlurView } from "@react-native-community/blur"

// import assets
import ExampleImage from "../../static/example-order.png"

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
    const scanerCamera = useRef(null)

    // Estado que almacena el valor de la orden
    const [checkAmount, setCheckAmount] = useState("")

    const [typeManual, setManual] = useState(false)

    /**
     * Funcion que realiza el pago si la orden es escrita
     * @param {*} orderId 
     */
    const submit = async _ => {
        try {
            loader(true)

            // Verificamos si hay un numero de orden para hacer el pago
            if (checkAmount.trim().length === 0) {
                throw String("Ingresa el numero de orden para continuar el pago")
            }

            navigate("Payment", { data: { order: checkAmount }, scan: false })

            if (typeManual) {
                setManual(false)
            }

            const { functions } = store.getState()

            //reset tab default
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
            errorMessage(String("QR de pago incorrecto"))

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

        butonManual: {
            marginTop: RFValue(35),
            alignSelf: "center",
            borderBottomWidth: 1,
            borderBottomColor: Colors.colorYellow,
        },

        imageExample: {
            borderRadius: RFValue(255),
            marginVertical: RFValue(25),
            position: "absolute",
            top: 25,
            left: 25,
            alignSelf: "center",
            height: RFValue(128),
            width: RFValue(128),
        }
    })

    /**Constante que almacena los props del componente Modal */
    const propsModalComponent = {
        onBackButtonPress: _ => setManual(false),
        onBackdropPress: _ => setManual(false),
        isVisible: typeManual,
        backdropOpacity: Platform.OS === "ios" ? 0 : 0.8,
        style: {
            padding: 0,
            margin: 0
        },
        animationIn: "fadeIn",
        animationOut: "fadeOut"
    }

    return (
        <>
            <View style={styles.constainerQR}>
                <QRCodeScanner
                    vibrate={true}
                    onRead={onReadCodeQR}
                    ref={scanerCamera}
                    reactivate={true}
                    reactivateTimeout={3000}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                />
            </View>


            <View>
                <TouchableOpacity onPress={_ => setManual(true)} style={styles.butonManual}>
                    <Text style={GlobalStyles.textButtonPrimaryLine}>Ingresar Orden Manualmente</Text>
                </TouchableOpacity>
            </View>

            <Modal {...propsModalComponent}>
                <>
                    <BlurView
                        style={StyleSheet.absoluteFill}
                        blurType="dark"
                    />

                    <Image animation="pulse" easing="ease-out" iterationCount="infinite" source={ExampleImage} style={styles.imageExample} />

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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

                                    <TouchableOpacity style={styles.buttonPay} onPress={submit}>
                                        <Text>PAGAR</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={_ => setManual(false)} style={styles.butonManual}>
                                    <Text style={GlobalStyles.textButtonPrimaryLine}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </>
            </Modal>

        </>

    )
}

const initialState = {
    wallets: [],
    indexTabActive: 0,
}

const Main = () => {
    const [stateView, setStateView] = useState(TYPE_VIEW.WALLET)

    const [state, dispatch] = useReducer(reducer, initialState)

    const { globalStorage } = store.getState()



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

            const dataStorage = {
                ...globalStorage,
                wallets: data
            }

            store.dispatch({ type: SETSTORAGE, payload: dataStorage })
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    const feePercentage = async () => {
        try {
            const { data: fee } = await http.get('/fees-percentage')

            const dataStore = {
                ...globalStorage,
                fee: {}
            }

            if (Object.values(fee).length > 0) {
                dataStore.fee = fee
            }

            store.dispatch({ type: SETSTORAGE, payload: dataStore })
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    useEffect(() => {

        configurateComponent()

        feePercentage()

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
            {
                stateView === TYPE_VIEW.WALLET &&
                <FlatList data={state.wallets} keyExtractor={(_, i) => i} renderItem={({ item }) => <ItemWallet data={item} />} />
            }

            {
                stateView === TYPE_VIEW.PAY &&
                <PayComponent />
            }

        </Container>
    )
}

export default Main