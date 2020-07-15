import React, { useState, useReducer, useEffect } from "react"

// Import components
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import StoreElement from "../../components/StoreElement/StoreElement"
import Switch from "../../components/Switch/Switch"

// Import other components
import Lottie from "lottie-react-native"
import QRCode from "react-native-qrcode-svg"
import Loader from "../../components/Loader/Loader"

// Import Others components from React-Native
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native"
import { View as ViewAnimate, Text as TextAnimate } from "react-native-animatable"


// Import constanst and others things
import { Colors, RFValue, GlobalStyles, CopyClipboard, reducer, htttp, errorMessage, getHeaders, loader } from "../../utils/constants"
import TouchID from "react-native-touch-id"

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
    const styles = StyleSheet.create({
        qrContainer: {
            backgroundColor: Colors.colorYellow,
            borderRadius: RFValue(5),
            padding: RFValue(12),
            marginBottom: RFValue(10),
        },

        buttonWallet: {
            ...GlobalStyles.buttonPrimaryLine,
            marginHorizontal: RFValue(25),
            overflow: "hidden",
        },

        textButton: {
            ...GlobalStyles.textButtonPrimaryLine,
            fontSize: RFValue(12),
            textAlign: "center",
        },

        receivedViewContainer: {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        },
    })


    return (
        <ViewAnimate animation="fadeIn" style={styles.receivedViewContainer}>
            <View style={styles.qrContainer}>
                <QRCode
                    size={RFValue(256)}
                    backgroundColor="transparent"
                    value={wallet} />
            </View>

            <TouchableOpacity style={styles.buttonWallet} onPress={_ => CopyClipboard(wallet)}>
                <Text selectable style={styles.textButton}>{wallet.substr(0, 50)}...</Text>
            </TouchableOpacity>
        </ViewAnimate>
    )
}

/**Constante que almacena los estado de `SendComponent` */
const initialStateSendComponent = {
    amountFraction: "",
    amountUSD: "",
    walletAdress: "",

    errorMessage: "",
    isSupported: false,

    dataWallet: null,
    loader: false,
    walletAccepted: false,
}

/**Componente que renderiza los datos necesarios para ejecutar una transaccion a otra wallet */
const SendComponent = ({ data = {} }) => {
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
    })

    /**Metodo que se ejecuta para enviar los fondos */
    const submit = () => {
        try {

        } catch (error) {
            errorMessage(erro.toString())
        }
    }

    /**Metodo paa consultar los datos de la wallet */
    const onComprobateWallet = async () => {
        try {
            // Loader on mode
            dispatch({ type: "loader", payload: true })

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

            console.log(payload)

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
            dispatch({ type: "loader", payload: false })
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

    useEffect(() => {
        try {
            // Comprobamos si el touch id es soportado
            TouchID.isSupported({ unifiedErrors: true })
                .then(payload => {
                    dispatch({ type: "isSupported", payload })
                })
                .catch(reason => {
                    throw reason
                })
        } catch (error) {
            errorMessage(error)
        }
    }, [])

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

                        <TouchableOpacity style={styles.buttonScan}>
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

            <Loader isVisible={state.loader} />
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
            // dispatch({ type: "loader", payload: true })
            loader(true)

            const { data } = await htttp.get(`/wallets/details/${params.id}`, getHeaders())

            if (data.error) {
                throw data.message
            }

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
            // dispatch({ type: "loader", payload: false })        
            loader(false)
        }
    }

    useEffect(() => {
        configurateComponent()
    }, [])

    return (
        <Container onRefreshEnd={configurateComponent}>

            <View style={styles.conatinerWallet}>
                <ItemWallet data={route.params} disabled />
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
                        <SendComponent data={state.information} />
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