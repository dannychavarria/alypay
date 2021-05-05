import React, { useState, useReducer, useEffect } from "react"

// Import navigation functions
import { useNavigation } from "@react-navigation/native"

// Import components
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import StoreElement from "../../components/StoreElement/StoreElement"
import Switch from "../../components/Switch/Switch"
import Search from "../../components/Search/Search"

// Import other components
import QRCodeScanner from "react-native-qrcode-scanner"
import Modal from "react-native-modal"
import Lottie from "lottie-react-native"
import QRCode from "react-native-qrcode-svg"

// Import Others components from React-Native
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Vibration,
    Keyboard,
    FlatList,
} from "react-native"
import {
    View as ViewAnimate,
    Text as TextAnimate,
} from "react-native-animatable"
import { RNCamera } from "react-native-camera"

// Import constanst and others things
import {
    Colors,
    RFValue,
    GlobalStyles,
    CopyClipboard,
    reducer,
    http,
    errorMessage,
    getHeaders,
    loader,
    successMessage,
    CheckTouchIDPermission,
    configTouchIDAuth,
    getFeePercentage,
} from "../../utils/constants"
import _ from "lodash"

// store and actionTypes from redux
import store from "../../store/index"
import { SETWALLET } from "../../store/actionsTypes"

// Import Assets
import scanQRAnimation from "../../animations/scan-qr.json"
import emptyAnimation from "../../animations/empty.json"
import profileVerifedAnimation from "../../animations/profile-verifed.json"
import defaultAvatar from "../../static/profile-default.png"

const switchItems = [
    {
        text: "Recibir",
        state: "RECEIVE",
    },

    {
        text: "Enviar",
        state: "SEND",
    },

    {
        text: "Historial",
        state: "HISTORY",
    },
]

/**
 * Componente que renderiza un qr con la direccion wallet
 */
const ReceiveComponent = ({ wallet = "", data = {}, isAly = false }) => {
    const { navigate } = useNavigation()
    console.log(data)

    const styles = StyleSheet.create({
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

        toUpBalanceContainer: {
            marginTop: RFValue(25),
            flex: 1,
            flexDirection: "row",
        },

        line: {
            marginHorizontal: RFValue(10),
            borderRightColor: Colors.colorYellow,
            borderRightWidth: 1,
        },

        textButtonToUpBalance: {
            fontSize: RFValue(16),
            color: Colors.colorYellow,
            textTransform: "uppercase",
        },

        textButtonBuy: {
            fontSize: RFValue(16),
            color: Colors.colorYellow,
            textTransform: "uppercase",
        },
    })

    const toRecharge = () => {
        navigate("Recharge", { wallet })
    }

    const toBuyCrypto = () => {
        navigate("Buy", { data: data, wallet: wallet })
    }

    return (
        <ViewAnimate animation="fadeIn" style={styles.receivedViewContainer}>
            <View style={styles.qrContainer}>
                <QRCode
                    size={RFValue(256)}
                    backgroundColor="transparent"
                    value={wallet}
                />
            </View>

            <ViewAnimate style={styles.toUpBalanceContainer}>
                <TouchableOpacity onPress={_ => CopyClipboard(wallet)}>
                    <Text
                        style={[
                            styles.textButtonToUpBalance,
                            { textDecorationLine: "underline" },
                        ]}>
                        Copiar direccion
                    </Text>
                </TouchableOpacity>

                <View style={styles.line} />

                <TouchableOpacity onPress={toRecharge}>
                    <Text style={styles.textButtonToUpBalance}>
                        Recargar billetera
                    </Text>
                </TouchableOpacity>
            </ViewAnimate>

            { isAly &&
                <TouchableOpacity
                    onPress={toBuyCrypto}
                    style={[
                        styles.toUpBalanceContainer,
                        GlobalStyles.buttonPrimaryLine,
                        {
                            flex: 1,
                            height: RFValue(30),
                            width: RFValue(200),
                            alignItems: "center",
                        },
                    ]}>
                    <Text style={styles.textButtonToUpBalance}>Comprar AlyCoin</Text>
                </TouchableOpacity>
            }
        </ViewAnimate>
    )
}

/**Constante que almacena los estado de `SendComponent` */
const initialStateSendComponent = {
    amountFraction: "",
    amountUSD: "",
    walletAdress: "",

    errorMessage: "",

    dataWallet: null,
    walletAccepted: false,

    showScaner: false,

    fee: {
        comission: 0,
        symbol: "ALY",
    },
}

/** Componente que renderiza los datos necesarios para ejecutar una transaccion a otra wallet */
const SendComponent = ({ data: data = {}, onCompleteTrasanction = () => { } }) => {
    const [state, dispatch] = useReducer(reducer, initialStateSendComponent)

    const { global, functions } = store.getState()

    const { navigate } = useNavigation()

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
            marginVertical: RFValue(10),
        },

        legend: {
            color: Colors.colorYellow,
        },

        rowInput: {
            alignItems: "center",
            flexDirection: "row",
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
        },

        erroMessage: {
            alignSelf: "center",
            textAlign: "center",
            color: Colors.colorRed,
            fontSize: RFValue(12),
        },
        cardInfo: {
            alignItems: "center",
            backgroundColor: Colors.colorBlack,
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
        constainerQR: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: RFValue(5),
            height: RFValue(320),
            overflow: "hidden",
        },

        retirementContainer: {
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
            marginHorizontal: RFValue(10),
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
        },
    })

    /** Metodo que se ejecuta para enviar los fondos */
    const submit = async () => {
        try {
            Keyboard.dismiss()

            if (state.amountUSD.trim().length === 0) {
                throw "Ingrese un monto"
            }

            // Ejecutamos una vibracion minima del dispositivo
            Vibration.vibrate(100)

            // variables que se enviaran a una peticion
            const vars = {
                amount_usd: state.amountUSD,
                amount: state.amountFraction,
                id_wallet: data.id,
                wallet: state.walletAdress,
                symbol: data.symbol,
            }

            // verificamos si el dispositvo tiene touch id
            const auth = await CheckTouchIDPermission()

            if (!auth) {
                throw String("Autenticación incorrecta")
            }

            loader(true)

            const { data: response } = await http.post(
                "/wallets/transaction",
                vars,
                getHeaders(),
            )

            if (response.error) {
                throw String(response.message)
            }

            // verificamos si todo
            if (response.response === "success") {
                successMessage("Tu transaccion se ha completado")

                // limpiamos el monto en usd
                dispatch({ type: "amountUSD", payload: "" })

                // limpiamos las fracciones de las moneda
                dispatch({ type: "amountFraction", payload: "" })

                // Limpiamos el usuario remitente
                dispatch({ type: "dataWallet", payload: "" })

                // limpiamos la direccion de wallet
                dispatch({ type: "walletAdress", payload: "" })
                dispatch({ type: "walletAccepted", payload: false })
            } else {
                throw String(
                    "Tu transaccion no se ha completado, contacte a soporte",
                )
            }

            // actualizamos la wallets
            functions?.reloadWallets()

            onCompleteTrasanction()
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    /** Metodo paa consultar los datos de la wallet */
    const onComprobateWallet = async () => {
        try {
            // Loader on mode

            if (state.errorMessage.length > 0) {
                throw state.errorMessage
            }

            if (state.walletAdress.length < 90) {
                throw String("Direccion de billetera incorrecta")
            }

            loader(true)

            // get data wallet
            const { data: payload } = await http.get(
                `/wallets/verify/${state.walletAdress}`,
                getHeaders(),
            )

            // buscamos un error
            if (payload.error) {
                throw String("Billetera no encontrada, intente nuevamente")
            }

            // Verificamos que si la billetera es la misma
            if (payload.id === data.id) {
                throw String("Billetera incorrecta")
            }

            // verificamos si ambas billetera son del mismo tipo
            if (payload.symbol !== data.symbol) {
                throw String(`Esta billetera no es de ${data.description}`)
            }

            dispatch({ type: "dataWallet", payload })

            // wallet is accepted
            dispatch({ type: "walletAccepted", payload: true })
        } catch (error) {
            errorMessage(error.toString())

            // Wallet is not accepted
            dispatch({ type: "walletAccepted", payload: false })

            // clear data if is necesary
            dispatch({ type: "dataWallet", payload: null })
        } finally {
            loader(false)
        }
    }

    /** Metodo que se ejeucta cuando el suuario escibe el monto en fracciones */
    const onChangeFractions = (payload = "") => {
        dispatch({ type: "amountFraction", payload })

        const newAmount = data.price * parseFloat(payload)

        if (parseFloat(payload) > data.amount) {
            dispatch({
                type: "errorMessage",
                payload: "No tienes suficientes fondos",
            })
        } else {
            dispatch({ type: "errorMessage", payload: "" })
        }

        dispatch({
            type: "amountUSD",
            payload: isNaN(newAmount) ? "" : newAmount.toString(),
        })
    }

    /** Metodo que se ejecuta cuando el usuario escribe el monot */
    const onChangeAmount = (payload = "") => {
        dispatch({ type: "amountUSD", payload })

        const newFractions = (parseFloat(payload) / data.price).toFixed(8)

        if (newFractions > data.amount) {
            dispatch({
                type: "errorMessage",
                payload: "No tienes suficientes fondos",
            })
        } else {
            dispatch({ type: "errorMessage", payload: "" })
        }

        dispatch({
            type: "amountFraction",
            payload: isNaN(newFractions) ? "" : newFractions.toString(),
        })
    }

    /** Metodo que envia a la pantalla de retiros  */
    const onRetirement = () => {
        navigate("Retirement", data)
    }

    /** Metodo que se ejecuta cuando el lector QR lee el codigo */
    const onReadCodeQR = ({ data }) => {
        toggleScan()

        dispatch({ type: "walletAdress", payload: data })
    }

    /** Metodo que se ejcuta para activar/desactivar el scaner QR */
    const toggleScan = () =>
        dispatch({ type: "showScaner", payload: !state.showScaner })

    useEffect(() => {
        const dataAly = global.wallets.find(item => {
            if (item.symbol === "ALY") {
                return item
            }
        })

        const { fee, fee_aly } = getFeePercentage(
            state.amountUSD,
            1,
            global.fee,
        )

        const amountFee = state.amountUSD * fee

        const amountFeeAly = state.amountUSD * fee_aly

        if (dataAly.amount >= amountFeeAly) {
            dispatch({
                type: "fee",
                payload: { amount: amountFeeAly, symbol: "ALY" },
            })
        } else {
            dispatch({
                type: "fee",
                payload: {
                    amount: amountFee / data.price,
                    symbol: data.symbol,
                },
            })
        }
    }, [state.amountUSD])

    return (
        <ViewAnimate style={styles.container} animation="fadeIn">
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.legend}>Dirección de billetera</Text>

                    <View style={styles.rowInput}>
                        <TextInput
                            value={state.walletAdress}
                            onChangeText={payload =>
                                dispatch({ type: "walletAdress", payload })
                            }
                            style={[GlobalStyles.textInput, { flex: 1 }]}
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
                <View style={styles.col}>
                    <Text style={styles.legend}>Monto ({data.symbol})</Text>

                    <TextInput
                        value={state.amountFraction}
                        onChangeText={onChangeFractions}
                        keyboardType="numeric"
                        returnKeyType="done"
                        style={GlobalStyles.textInput}
                    />
                </View>

                <View style={styles.col}>
                    <Text style={styles.legend}>Monto (USD)</Text>

                    <TextInput
                        value={state.amountUSD}
                        onChangeText={onChangeAmount}
                        keyboardType="numeric"
                        returnKeyType="done"
                        style={GlobalStyles.textInput}
                    />
                </View>
            </View>

            <View style={{ height: RFValue(5) }} />

            {state.errorMessage !== "" && (
                <TextAnimate animation="fadeIn" style={styles.erroMessage}>
                    {state.errorMessage}
                </TextAnimate>
            )}

            <View style={{ height: RFValue(10) }} />

            {state.amountUSD.trim() !== "" &&
                state.amountFraction.trim() !== "" && (
                    <View style={styles.containerFee}>
                        <View style={styles.headerFee}>
                            <Text style={styles.textHeaderFee}>Sub-Total</Text>
                            <Text style={styles.textHeaderFee}>Comisión</Text>
                            <Text style={styles.textHeaderFee}>Total</Text>
                        </View>

                        <View style={styles.bodyFee}>
                            <Text style={styles.textBodyFee}>
                                {state.amountFraction} {data.symbol}
                            </Text>
                            <Text style={styles.textBodyFee}>
                                {_.floor(state.fee.amount, 8)}{" "}
                                {state.fee.symbol}
                            </Text>
                            {state.fee.symbol !== data.symbol ? (
                                <Text style={styles.textBodyFee}>
                                    {state.amountFraction} {data.symbol}
                                </Text>
                            ) : (
                                <Text style={styles.textBodyFee}>
                                    {_.floor(
                                        parseFloat(state.amountFraction) +
                                        parseFloat(state.fee.amount),
                                        8,
                                    )}{" "}
                                    {state.fee.symbol}
                                </Text>
                            )}
                        </View>
                    </View>
                )}

            {state.walletAccepted && state.dataWallet !== null && (
                <>
                    <ViewAnimate animation="fadeIn" style={styles.cardInfo}>
                        <View style={styles.subCard}>
                            <Image
                                style={styles.avatar}
                                source={defaultAvatar}
                            />

                            <View>
                                <Text style={styles.usernameCard}>
                                    @{state.dataWallet.username}
                                </Text>
                                <Text style={styles.textFromCard}>
                                    {state.dataWallet.city}
                                </Text>
                            </View>
                        </View>

                        <Lottie
                            source={profileVerifedAnimation}
                            style={styles.lottieVerifed}
                            autoPlay
                        />
                    </ViewAnimate>
                </>
            )}

            {!state.walletAccepted && (
                <View style={styles.retirementContainer}>
                    <TouchableOpacity onPress={onRetirement}>
                        <Text style={styles.retirementText}>
                            Retirar fondos
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onComprobateWallet}
                        style={[
                            GlobalStyles.buttonPrimary,
                            { flex: 1, marginLeft: 25 },
                        ]}>
                        <Text style={GlobalStyles.textButton}>siguiente</Text>
                    </TouchableOpacity>
                </View>
            )}

            {state.walletAccepted && (
                <TouchableOpacity
                    onPress={submit}
                    style={GlobalStyles.buttonPrimary}>
                    <Text style={GlobalStyles.textButton}>Enviar</Text>
                </TouchableOpacity>
            )}

            <Modal
                backdropOpacity={0.9}
                animationIn="fadeIn"
                onBackButtonPress={toggleScan}
                onBackdropPress={toggleScan}
                animationOut="fadeOut"
                isVisible={state.showScaner}>
                <View style={styles.constainerQR}>
                    <QRCodeScanner
                        onRead={onReadCodeQR}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                    />
                </View>
            </Modal>
        </ViewAnimate>
    )
}

/**Componente que renderiza el historial de transacciones */
const History = ({ data = [] }) => {
    const { navigate } = useNavigation()

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: RFValue(10),
        },
        lottieQRAnimation: {
            alignSelf: "center",
            height: RFValue(256),
            width: RFValue(256),
        },
        text: {
            color: "#CCCCCCAA",
            fontSize: RFValue(24),
            textAlign: "center",
            textTransform: "uppercase",
        },
    })

    return (
        <ViewAnimate style={styles.container} animation="fadeIn">
            <Search />
            {data.length === 0 ? (
                <>
                    <Lottie
                        source={emptyAnimation}
                        style={styles.lottieQRAnimation}
                        autoPlay
                        loop={false}
                    />
                    <Text style={styles.text}>Sin registros</Text>
                </>
            ) : (
                <FlatList
                    keyExtractor={(_, key) => (key = key.toString())}
                    data={data}
                    renderItem={({ item, index }) => (
                        <StoreElement
                            navigate={navigate}
                            item={item}
                            index={index}
                        />
                    )}
                />
            )}
            {/*  {
                data.map(StoreElement)
            }


            {
                (data.length === 0) &&
                <>
                    <Lottie source={emptyAnimation} style={styles.lottieQRAnimation} autoPlay loop={false} />

                    <Text style={styles.text}>Sin registros</Text>
                </>
            } */}
        </ViewAnimate>
    )
}

/**Estado general de componente `Wallet` */
const intialState = {
    history: [],
    wallet: "",
    information: null,

    loader: true,
}

const Wallet = ({ route }) => {
    const [state, dispatch] = useReducer(reducer, intialState)

    // state view
    const [stateView, setStateView] = useState(switchItems[0].state)

    // Params passed from router
    const { params } = route

    const isAly = params.id == 51

    /**
     * Funcion que se encarga de configurar todo el componente
     */
    const configurateComponent = async () => {
        try {
            // Loader on mode
            loader(true)

            const { data } = await http.get(
                `/wallets/details/${params.id}`,
                getHeaders(),
            )

            if (data.error) {
                throw data.message
            }

            store.dispatch({
                type: SETWALLET,
                payload: { ...data, reloadInfo: configurateComponent },
            })

            // Guardamos la direccion wallet
            dispatch({ type: "wallet", payload: data.wallet })

            // Guardamos ek historial de transacciones
            dispatch({ type: "history", payload: data.history })

            // Guardamos informacion general de la wallet
            dispatch({ type: "information", payload: data.information })

            // Loader off mode
        } catch (error) {
            errorMessage(error.toString())

            // seteamos a null cuando hay un error
            dispatch({ type: "information", payload: null })
        } finally {
            loader(false)
        }
    }

    useEffect(() => {
        configurateComponent()
    }, [])

    return (
        <Container onRefreshEnd={configurateComponent}>
            <View style={styles.containerWallet}>
                <ItemWallet
                    data={
                        state.information === null ? params : state.information
                    }
                    disabled
                />
            </View>

            <Switch onSwitch={setStateView} items={switchItems} />

            {state.information !== null && (
                <>
                    {// Verificamos si esta en la pantalla de Recibir
                        stateView === switchItems[0].state && (
                            <ReceiveComponent
                                wallet={state.wallet}
                                data={state.information}
                                isAly={isAly}
                            />
                        )}

                    {stateView === switchItems[1].state && (
                        <SendComponent
                            data={state.information}
                            onCompleteTrasanction={configurateComponent}
                        />
                    )}

                    {stateView === switchItems[2].state && (
                        <History data={state.history} />
                    )}
                </>
            )}
        </Container>
    )
}

const styles = StyleSheet.create({
    containerWallet: {
        margin: RFValue(10),
    },
})

export default Wallet
