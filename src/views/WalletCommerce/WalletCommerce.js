import React, { useState, useEffect, useReducer } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'

// Import navigation functions
import { useNavigation } from "@react-navigation/native"

// Import Constanst
import { Colors, RFValue, GlobalStyles, http, getHeaders, CopyClipboard, errorMessage, successMessage, reducer, getFeePercentage, loader } from '../../utils/constants'

// Import Components
import Container from '../../components/Container/Container'
import Switch from '../../components/Switch/Switch'
import ItemComerce from '../../components/ItemComerce/ItemComerce'
import Loader from '../../components/Loader/Loader'
import Search from '../../components/SearchCommerce/SearchCommerce'
import HistoryElement from '../../components/HistoryElement/HisotreElement'

// Import Other Components
import { View as ViewAnimation } from 'react-native-animatable'
import QRCodeScanner from "react-native-qrcode-scanner"
import Modal from "react-native-modal"
import Lottie from "lottie-react-native"
import QRCode from "react-native-qrcode-svg"
import _ from "lodash"
import { RNCamera } from "react-native-camera"

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

    return (
        <ViewAnimation animation="fadeIn" style={styles.receivedViewContainer}>
            <View style={styles.qrContainer}>
                <QRCode
                    size={RFValue(256)}
                    backgroundColor="transparent"
                    value={wallet} />
            </View>

            <ViewAnimation style={styles.toUpBalanceContainer}>
                <TouchableOpacity onPress={_ => CopyClipboard(wallet)}>
                    <Text style={[styles.textButtonToUpBalance, {textDecorationLine: 'underline'}]}>Copiar direccion</Text>
                </TouchableOpacity>
            </ViewAnimation>
        </ViewAnimation>
    )
}

const initialStateSendComponent = {
    amountFraction: "",
    amountUSD: "",
    walletAdress: "",
    fee: '0',

    dataWallet: null,
    walletAccepted: false,
}

const SendComponent = ({ data = {}, onCompleteTransaction = () => { }, }) => {
    const { global, functions } = store.getState()


    const [state, dispatch] = useReducer(reducer, initialStateSendComponent)
    const navigation = useNavigation()

    const [loader, setLoader] = useState(false)

    const [showScanner, setShowScanner] = useState(false)

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: RFValue(10),
            padding: 10,
            width: "100%",
        },
        containerTitle: {
            flexDirection: "row",
            justifyContent: "center"
        },
        legendTitle: {
            color: Colors.colorYellow,
            fontSize: RFValue(24),
            textTransform: 'uppercase',
            marginBottom: 10
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
            color: Colors.colorYellow,
            fontSize: RFValue(14)
        },

        rowInput: {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center"
        },

        buttonScan: {
            backgroundColor: Colors.colorYellow,
            borderRadius: RFValue(5),
            padding: RFValue(5),
            marginLeft: RFValue(10),
            zIndex: 1000,
        },

        lottieQRAnimation: {
            height: RFValue(40),
            width: RFValue(40),
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
            /* justifyContent: "space-evenly", */
            flexDirection: "row",
            marginHorizontal: RFValue(10),
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
        logo: {
            width: RFValue(300),
            height: RFValue(100),
            marginBottom: RFValue(40),
        },
    })

    const submit = async () => {
        try {

            if (state.amountFraction.trim().length === 0) {
                throw String("Ingrese un monto")
            }

            setLoader(true)

            const dataSent = {
                amount: parseFloat(state.amountFraction),
                wallet: state.walletAdress,
                id: data.id
            }

            const { data: response } = await http.post('ecommerce/transaction', dataSent, getHeaders())

            if (response.error) {
                errorMessage(response.message)
            }

            if (response.response === 'success') {
                successMessage("Tu transaccion se ha completado")

                // Limpiamos el usuario remitente
                dispatch({ type: "dataWallet", payload: "" })
                dispatch({ type: "amountFraction", payload: "" })

                // limpiamos la direccion de wallet
                dispatch({ type: "walletAdress", payload: "" })
                dispatch({ type: "walletAccepted", payload: false })

                // limpiamos el fee
                dispatch({ type: 'fee', payload: '0' })

                functions?.reloadWallets()
                onCompleteTransaction()

                navigation.pop()

            } else {
                throw String("Tu transacción no se ha compeltado, contacte a soporte")
            }
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            setLoader(false)
        }
    }

    const onComprobateWallet = async () => {
        try {

            if (state.walletAdress.length < 90) {
                throw String("Dirección de billetera incorrecta")
            }

            // get data wallet
            const { data } = await http.get(`/wallets/verify/${state.walletAdress}`, getHeaders())

            if (data.error) {
                throw String("Billetera no encontrada, intente nuevamente")
            }

            dispatch({ type: "dataWallet", payload: data })

            dispatch({ type: "walletAccepted", payload: true })

        } catch (error) {
            errorMessage(error.toString())

            // wallert is not accepted
            dispatch({ type: "walletAccepted", payload: false })

            // clear data if is necesary
            dispatch({ type: "dataWallet", payload: null })
        }
    }

    const onRetirement = () => {
        navigation.navigate("RetirementCommerce", data)
    }

    const onReadCodeQR = ({ data }) => {
        toggleScan()

        dispatch({ type: 'walletAdress', payload: data })
    }

    const onChangeAmount = (str) => {
        dispatch({ type: 'amountFraction', payload: str })

        const { fee } = getFeePercentage(str, 1, global.fee)
        dispatch({ type: 'fee', payload: fee * str })
    }

    const toggleScan = () => setShowScanner(!showScanner)

    return (
        <>
            <Loader isVisible={loader} />
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text style={styles.legendTitle}>Enviar fondos</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.legend}>Dirección de billetera</Text>

                        <View style={styles.rowInput}>
                            <TextInput
                                style={[GlobalStyles.textInput, { flex: 1 }]}
                                value={state.walletAdress}
                                returnKeyType="done"
                                onChangeText={payload => dispatch({ type: "walletAdress", payload })}
                            />

                            <TouchableOpacity onPress={toggleScan} style={styles.buttonScan}>
                                <Lottie source={scanQRAnimation} style={styles.lottieQRAnimation} autoPlay loop />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.legend}>Mondo (USD)</Text>

                        <View style={styles.rowInput}>
                            <TextInput
                                style={[GlobalStyles.textInput, { flex: 1 }]}
                                value={state.amountFraction}
                                onChangeText={onChangeAmount}
                                keyboardType="numeric"
                                returnKeyType="done"
                            />

                        </View>
                    </View>
                    <View style={[styles.col, { justifyContent: 'center' }]}>
                        <View style={styles.rowInput}>
                            <Text style={styles.legend}>Fee</Text>
                        </View>
                        <View style={styles.rowInput}>
                            <Text style={{ color: '#FFF', fontSize: RFValue(24) }}>{_.floor(state.fee, 2)} USD</Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: RFValue(5) }} />

                {
                    (state.walletAccepted && state.dataWallet !== null) &&
                    <ViewAnimation animation="fadeIn" style={styles.cardInfo}>
                        <View style={styles.subCard}>
                            <Image style={styles.avatar} source={defaultAvatar} />

                            <View>
                                <Text style={styles.usernameCard}>@{state.dataWallet.username}</Text>
                                <Text style={styles.textFromCard}>{state.dataWallet.city}</Text>
                            </View>
                        </View>


                        <Lottie source={profileVerifedAnimation} style={styles.lottieVerifed} autoPlay />
                    </ViewAnimation>
                }

                {
                    !state.walletAccepted &&
                    <View style={styles.retirementContainer}>
                        <TouchableOpacity onPress={onRetirement}>
                            <Text style={styles.retirementText}>Retirar fondos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onComprobateWallet} style={[GlobalStyles.buttonPrimary, { flex: 1, marginLeft: 25 }]}>
                            <Text style={GlobalStyles.textButton}>siguiente</Text>
                        </TouchableOpacity>
                    </View>
                }

                {
                    state.walletAccepted &&
                    <TouchableOpacity onPress={submit} style={GlobalStyles.buttonPrimary}>
                        <Text style={GlobalStyles.textButton}>Enviar</Text>
                    </TouchableOpacity>
                }

                <Modal backdropOpacity={0.9} animationIn='fadeIn' onBackButtonPress={toggleScan} onBackdropPress={toggleScan} animationOut='fadeOut' isVisible={showScanner} >
                    <View style={styles.constainerQR}>
                        <QRCodeScanner
                            onRead={onReadCodeQR}
                            flashMode={RNCamera.Constants.FlashMode.auto}
                        />
                    </View>
                </Modal>
            </View>
        </>
    )
}

const History = ({ data = [] }) => {
    const { navigate } = useNavigation()
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: RFValue(10),
        },
    })
    return (
        <ViewAnimation style={styles.container} animation="fadeIn">
            <Search />
            {
                (data.length === 0)
                    ? <>
                        <Lottie source={emptyAnimation} style={styles.lottieQRAnimation} autoPlay loop={false} />

                        <Text style={styles.text}>Sin registros</Text>
                    </>
                    :
                    <FlatList
                        keyExtractor={(_, key) => (key = key.toString())}
                        data={data}
                        renderItem={({ item, index }) => <HistoryElement navigate={navigate} item={item} index={index} />}
                    />
            }
        </ViewAnimation>
    )
}

/**Estado general de componente `Wallet` */
const intialState = {
    history: [],
    wallet: "",
    information: null,

    loader: true,
}

const WalletCommerce = ({ route }) => {
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

            loader(true)

            const { data } = await http.get(`/wallets/details/${params.item.id}`, getHeaders())

            if (data.error) {
                throw String(data.message)
            }

            store.dispatch({ type: SETWALLET, payload: { ...data, reloadInfo: configurateComponent } })

            // Guardamos la direccion wallet
            dispatch({ type: "wallet", payload: data.wallet })

            // Guardamos ek historial de transacciones
            dispatch({ type: "history", payload: data.history })

            // Guardamos informacion general de la wallet
            dispatch({ type: "information", payload: data.information })

        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    useEffect(() => {
        configurateComponent()
    }, [])

    return (
        <Container showLogo onRefreshEnd={configurateComponent}>

            <View style={styles.containerWallet}>
                <ItemComerce data={params} />
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
    containerWallet: {
        margin: RFValue(10),
    },
})

export default WalletCommerce