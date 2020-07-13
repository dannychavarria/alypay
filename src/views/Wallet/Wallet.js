import React, { useState, useReducer, useEffect } from "react"

// Import components
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import StoreElement from "../../components/StoreElement/StoreElement"
import Switch from "../../components/Switch/Switch"

// Import other components
import Lottie from "lottie-react-native"
import QRCode from "react-native-qrcode-svg"

// Import Others components from React-Native
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import { View as ViewAnimate } from "react-native-animatable"


// Import constanst and others things
import { Colors, RFValue, GlobalStyles, CopyClipboard, reducer, htttp, errorMessage, getHeaders } from "../../utils/constants"

// Import Assets
import logo from "../../static/alypay.png"
import scanQRAnimation from "../../animations/scan-qr.json"
import emptyAnimation from "../../animations/empty.json"
import Loader from "../../components/Loader/Loader"

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
}

/**Componente que renderiza los datos necesarios para ejecutar una transaccion a otra wallet */
const SendComponent = () => {
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
        }
    })

    return (
        <ViewAnimate style={styles.container} animation="fadeIn">
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.legend}>Dirección wallet</Text>

                    <View style={styles.rowInput}>
                        <TextInput
                            value={state.amountFraction}
                            onChangeText={payload => dispatch({ type: "amountFraction", payload })}
                            style={[GlobalStyles.textInput, { flex: 1 }]} />

                        <TouchableOpacity style={styles.buttonScan}>
                            <Lottie source={scanQRAnimation} style={styles.lottieQRAnimation} autoPlay loop />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.legend}>Monto (Fracciones)</Text>

                    <TextInput
                        value={state.amountFraction}
                        onChangeText={payload => dispatch({ type: "amountFraction", payload })}
                        style={GlobalStyles.textInput} />
                </View>

                <View style={styles.col}>
                    <Text style={styles.legend}>Monto (USD)</Text>

                    <TextInput
                        value={state.amountUSD}
                        onChangeText={payload => dispatch({ type: "amountUSD", payload })}
                        style={GlobalStyles.textInput} />
                </View>
            </View>


            <View style={{ height: RFValue(10) }} />


            <TouchableOpacity style={GlobalStyles.buttonPrimary}>
                <Text style={GlobalStyles.textButton}>Enviar</Text>
            </TouchableOpacity>
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
    information: {},

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
            dispatch({ type: "loader", payload: true })

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
            dispatch({ type: "loader", payload: false })
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    useEffect(() => {
        configurateComponent()
    }, [])

    return (
        <Container>

            <View style={styles.conatinerWallet}>
                <ItemWallet data={route.params} disabled />
            </View>

            <Switch onSwitch={setStateView} items={switchItems} />

            {
                !state.loader &&
                <>
                    {
                        // Verificamos si esta en la pantalla de Recibir
                        stateView === switchItems[0].state &&
                        <ReceiveComponent wallet={state.wallet} />
                    }

                    {
                        stateView === switchItems[1].state &&
                        <SendComponent />
                    }

                    {
                        stateView === switchItems[2].state &&
                        <History data={state.history} />
                    }
                </>
            }

            <Loader isVisible={state.loader} />
        </Container>
    )
}

const styles = StyleSheet.create({
    conatinerWallet: {
        margin: RFValue(10),
    },
})

export default Wallet