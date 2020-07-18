import React, { useState, useReducer, useEffect } from "react"

// Import navigation functions
import { useNavigation } from "@react-navigation/native"

// Import components
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import StoreElement from "../../components/StoreElement/StoreElement"
import Switch from "../../components/Switch/Switch"

// Import other components
import QRCodeScanner from "react-native-qrcode-scanner"
import Modal from "react-native-modal"
import Lottie from "lottie-react-native"
import QRCode from "react-native-qrcode-svg"

// Import Others components from React-Native
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Vibration } from "react-native"
import { View as ViewAnimate, Text as TextAnimate } from "react-native-animatable"
import { RNCamera } from "react-native-camera"


// Import constanst and others things
import { Colors, RFValue, GlobalStyles, CopyClipboard, reducer, htttp, errorMessage, getHeaders, loader, successMessage } from "../../utils/constants"
import TouchID from "react-native-touch-id"

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
    const { navigate } = useNavigation()

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
        }
    })

    const toRecharge = () => {
        navigate("Recharge", { wallet })
    }

    return (<ViewAnimate animation="fadeIn" style={styles.receivedViewContainer}>
        <View style={styles.qrContainer}>
            <QRCode
                size={RFValue(256)}
                backgroundColor="transparent"
                value={wallet} />
        </View>

        <ViewAnimate style={styles.toUpBalanceContainer}>
            <TouchableOpacity onPress={_ => CopyClipboard(wallet)}>
                <Text style={styles.textButtonToUpBalance}>Copiar direccion</Text>
            </TouchableOpacity>

            <View style={styles.line} />

            <TouchableOpacity onPress={toRecharge}>
                <Text style={styles.textButtonToUpBalance}>Recargar billetera</Text>
            </TouchableOpacity>
        </ViewAnimate>
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
}

/**Componente que renderiza los datos necesarios para ejecutar una transaccion a otra wallet */
const SendComponent = ({ data = {}, onCompleteTrasanction = () => { } }) => {
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
        }
    })

    /**Metodo que se ejecuta para enviar los fondos */
    const submit = async () => {
        try {
            if (state.amountUSD.trim().length === 0) {
                throw "Ingrese un monto"
            }

            // Authentication id
            await TouchID.authenticate("Para continuar", {
                title: "Transferencia Alypay",
                passcodeFallback: true,
                cancelText: "CANCELAR"
            })

            // Ejecutamos una vibracion minima del dispositivo
            await Vibration.vibrate(100)

            // variables que se enviaran a una peticion
            const vars = {
                amount_usd: state.amountUSD,
                amount: state.amountFraction,
                id_wallet: data.id,
                wallet: state.walletAdress,
                symbol: data.symbol,
            }

            loader(true)

            const { data: response } = await htttp.post("/wallets/transaction", vars, getHeaders())

            if (response.error) {
                throw response.message
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
                throw "Tu transaccion no se ha completado, contacte a soporte"
            }

            onCompleteTrasanction()
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    /**Metodo paa consultar los datos de la wallet */
    const onComprobateWallet = async () => {
        try {
            // Loader on mode
            loader(true)

            if (state.errorMessage.length > 0) {
                throw state.errorMessage
            }

            if (state.walletAdress.length < 90) {
                throw "Direccion de billetera incorrecta"
            }

            // get data wallet
            const { data: payload } = await htttp.get(`/wallets/verify/${state.walletAdress}`, getHeaders())

            // buscamos un error
            if (payload.error) {
                throw "Billetera no encontrada, intente nuevamente"
            }


            // Verificamos que si la billetera es la misma
            if (payload.id === data.id) {
                throw "Billetera incorrecta"
            }

            // verificamos si ambas billetera son del mismo tipo
            if (payload.symbol !== data.symbol) {
                throw `Esta billetera no es de ${data.description}`
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

    /**Metodo que se ejeucta cuando el suuario escibe el monto en fracciones */
    const onChangeFractions = (payload = "") => {
        dispatch({ type: "amountFraction", payload })

        const newAmount = data.price * parseFloat(payload)

        if (parseFloat(payload) > data.amount) {
            dispatch({ type: "errorMessage", payload: "No tienes suficientes fondos" })
        } else {
            dispatch({ type: "errorMessage", payload: "" })
        }

        dispatch({ type: "amountUSD", payload: isNaN(newAmount) ? "" : newAmount.toString() })
    }

    /**Metodo que se ejecuta cuando el usuario escribe el monot */
    const onChangeAmount = (payload = "") => {
        dispatch({ type: "amountUSD", payload })

        const newFractions = (parseFloat(payload) / data.price).toFixed(8)

        if (newFractions > data.amount) {
            dispatch({ type: "errorMessage", payload: "No tienes suficientes fondos" })
        } else {
            dispatch({ type: "errorMessage", payload: "" })
        }

        dispatch({ type: "amountFraction", payload: isNaN(newFractions) ? "" : newFractions.toString() })
    }

    const onReadCodeQR = ({ data }) => {
        toggleScan()

        dispatch({ type: "walletAdress", payload: data })
    }

    const toggleScan = () => dispatch({ type: "showScaner", payload: !state.showScaner })

    return (
        <ViewAnimate style={styles.container} animation="fadeIn">
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.legend}>Dirección wallet</Text>

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

                <View style={styles.col}>
                    <Text style={styles.legend}>Monto (USD)</Text>

                    <TextInput
                        value={state.amountUSD}
                        onChangeText={onChangeAmount}
                        keyboardType="number-pad"
                        style={GlobalStyles.textInput} />
                </View>
            </View>

            <View style={{ height: RFValue(5) }} />

            {
                (state.errorMessage !== "") &&
                <TextAnimate animation="fadeIn" style={styles.erroMessage}>{state.errorMessage}</TextAnimate>
            }

            <View style={{ height: RFValue(10) }} />

            {
                (state.walletAccepted && state.dataWallet !== null) &&
                <ViewAnimate animation="fadeIn" style={styles.cardInfo}>
                    <View style={styles.subCard}>
                        <Image style={styles.avatar} source={defaultAvatar} />

                        <View>
                            <Text style={styles.usernameCard}>@{state.dataWallet.username}</Text>
                            <Text style={styles.textFromCard}>{state.dataWallet.city}</Text>
                        </View>
                    </View>


                    <Lottie source={profileVerifedAnimation} style={styles.lottieVerifed} autoPlay />
                </ViewAnimate>
            }

            {
                !state.walletAccepted &&
                <TouchableOpacity onPress={onComprobateWallet} style={GlobalStyles.buttonPrimary}>
                    <Text style={GlobalStyles.textButton}>siguiente</Text>
                </TouchableOpacity>
            }

            {
                state.walletAccepted &&
                <TouchableOpacity onPress={submit} style={GlobalStyles.buttonPrimary}>
                    <Text style={GlobalStyles.textButton}>Enviar</Text>
                </TouchableOpacity>
            }

            <Modal backdropOpacity={0.9} animationIn="fadeIn" onBackButtonPress={toggleScan} onBackdropPress={toggleScan} animationOut="fadeOut" isVisible={state.showScaner}>
                <View style={styles.constainerQR}>
                    <QRCodeScanner
                        sty
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
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: RFValue(25),
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
        }
    })

    return (
        <ViewAnimate style={styles.container} animation="fadeIn">
            {
                data.map(StoreElement)
            }


            {
                (data.length === 0) &&
                <>
                    <Lottie source={emptyAnimation} style={styles.lottieQRAnimation} autoPlay loop={false} />

                    <Text style={styles.text}>Sin registros</Text>
                </>
            }
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
    /**
     * Funcion que se encarga de configurar todo el componente
     */
    const configurateComponent = async () => {
        try {
            // Loader on mode
            loader(true)

            const { data } = await htttp.get(`/wallets/details/${params.id}`, getHeaders())

            if (data.error) {
                throw data.message
            }

            store.dispatch({ type: SETWALLET, payload: { ...data, reloadInfo: configurateComponent } })

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

            <View style={styles.conatinerWallet}>
                <ItemWallet data={state.information === null ? params : state.information} disabled />
            </View>

            <Switch onSwitch={setStateView} items={switchItems} />

            {
                (state.information !== null) &&
                <>
                    {
                        // Verificamos si esta en la pantalla de Recibir
                        stateView === switchItems[0].state &&
                        <ReceiveComponent wallet={state.wallet} />
                    }

                    {
                        stateView === switchItems[1].state &&
                        <SendComponent data={state.information} onCompleteTrasanction={configurateComponent} />
                    }

                    {
                        stateView === switchItems[2].state &&
                        <History data={state.history} />
                    }
                </>
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    conatinerWallet: {
        margin: RFValue(10),
    },
})

export default Wallet