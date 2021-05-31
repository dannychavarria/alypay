import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Alert,
    BackHandler,
} from "react-native"

// Import functions
import {
    RFValue,
    Colors,
    GlobalStyles,
    http,
    loader,
    getHeaders,
    successMessage,
    errorMessage,
} from "../../utils/constants"
import { useNavigation } from "@react-navigation/native"

// Import Componets
import Container from "../Container/Container"
import SwitchCoin from "../Switch/SwitchCoin"
import _ from "lodash"
import store from "../../store"

import ModalConfirmPin from "../../components/ModalConfirmPin/ModalConfirmPin"

const Payment = ({ route, navigation }) => {
    const { goBack } = useNavigation()

    // Estado que guarda los valores obtenidos de las monedas
    const [currentCoin, setCurrentCoin] = useState({})

    // Almacena los datos recibidos del api GET /transaction/info acerca del comercio.
    const [commerceData, setCommerceData] = useState({})

    // Estado que guarda la informacion detallada de las monedas
    const [crpytoPrices, setCryptoPrices] = useState({
        ALY: null,
        BTC: null,
        ETH: null,
        DASH: null,
        LTC: null,
    })

    // Informacion detallada del comercio
    const Pay = route.params.data

    // Informacion de la orden de pago si es escaneada/escrita
    const scanned = route.params.scan

    // Obtenemos los precios de las mones
    const getAllPrices = async () => {
        try {
            loader(true)

            // Ejecutamos la peticion
            const { data } = await http.get(
                `/ecommerce/transaction/info/${
                    scanned ? Pay.orderId : Pay.order
                }`,
                getHeaders(),
            )

            if (data.error) {
                throw String(data.message)
            }

            // Almacena los precios de las monedas optenidas de la peticion
            setCryptoPrices(data.wallets)

            // Almacena el detalle de la orden del comercio
            setCommerceData(data.data)
        } catch (error) {
            Alert.alert("Ha Ocurrido un error", error.toString())
            navigation.navigate("Main")
        } finally {
            loader(false)
        }
    }
    // funcion que llama al modal para verificar el pin
    const verifiPIN = async () => {
        store.dispatch({type: 'SHOWPIN', payload: true})
    }

    /**Funcion que envia los datos al servidor backend */
    const confirmPayment = async () => {
        try {
            loader(true)

            // Monto del subtotal del Fee
            const amount = currentCoin.fee.subtotal

            // Monto del subtotal del Fee en dolares
            const _amountUSD = currentCoin.feeUSD.subtotal

            // Construimos el dato formato json para enviarlo al backend
            const senData = {
                id: scanned ? Pay.orderId : Pay.order,
                from: currentCoin.id,
                to: scanned ? Pay.wallet_commerce : commerceData.wallet,
                amount: amount,
                amountUSD: _amountUSD,
            }

            // Realiza la peticion de pago con los datos de la transaccion obtenidos
            const { data } = await http.post(
                "/ecommerce/transaction/pay",
                senData,
                getHeaders(),
            )

            if (data.error) {
                throw String(data.message)
            }

            if (data.response === "success") {
                successMessage("Pago de su Transaccion Exitosa")

                // Funcion que renderiza los precios de las billetera
                const { functions } = store.getState()
                functions?.reloadWallets()

                goBack()
            }
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    // Funcion que cancela la orden generada por el comercio
    const cancelPayment = () => {
        Alert.alert(
            "Estas apunto de cancelar la transaccion",
            "Realmente quieres ejecutar esta accion",
            [
                {
                    text: "Cancelar",
                    onPress: () => {},
                },
                {
                    text: "Salir",
                    onPress: () => {
                        navigation.pop()
                    },
                },
            ],
        )

        return true
    }

    useEffect(() => {
        getAllPrices()

        // Metodo que esta a la escucha cuando le dan atras
        const handledBack = BackHandler.addEventListener(
            "hardwareBackPress",
            cancelPayment,
        )
        return () => handledBack.remove()
    }, [])

    return (
        <Container showLogo>
            <View style={styles.container}>
                <Text style={styles.title}>Transaccion Detectada</Text>
            </View>

            <SwitchCoin
                items={crpytoPrices}
                onSwitch={value => setCurrentCoin(value)}
            />

            <View style={styles.card}>
                <View style={styles.headerCard}>
                    <Text style={styles.textHeaderCard}>
                        Descripcion de la Transaccion
                    </Text>
                    <Text style={styles.textRowTable}>
                        {scanned ? Pay.description : commerceData.description}
                    </Text>
                </View>

                <View style={styles.headerCard}>
                    <View style={styles.bodyRowTable}>
                        <Text style={styles.textHeaderCard}>
                            Sub-Total {currentCoin.symbol}
                        </Text>
                        <Text style={styles.textRowTable}>
                            {currentCoin.fee?.subtotal}
                        </Text>
                    </View>

                    <View style={styles.bodyRowTable}>
                        <Text style={styles.textHeaderCard}>
                            Fee {currentCoin.symbol}
                        </Text>
                        <Text style={styles.textRowTable}>
                            {currentCoin.fee?.fee}
                        </Text>
                    </View>

                    <View style={styles.bodyRowTable}>
                        <Text style={styles.textFooterCard}>
                            Total {currentCoin.symbol}
                        </Text>
                        <Text style={styles.textRowTable}>
                            {currentCoin.fee?.total}
                        </Text>
                    </View>
                </View>

                <View style={styles.footerCard}>
                    <View style={styles.bodyRowTable}>
                        <Text style={styles.textFooterCard}>Total (USD)</Text>
                        <Text style={styles.textRowTable}>
                            {currentCoin.feeUSD?.total}{" "}
                            {currentCoin.feeUSD?.symbol}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.containerButtons}>
                <TouchableOpacity onPress={cancelPayment}>
                    <Text style={styles.textBack}>Cancelar transaccion</Text>
                </TouchableOpacity>

                <TouchableOpacity style={GlobalStyles.buttonPrimary}>
                    <Text
                        onPress={verifiPIN}
                        style={{ textTransform: "uppercase" }}>
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </View>
            <ModalConfirmPin fn={confirmPayment}/>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
    },
    containerButtons: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    card: {
        backgroundColor: Colors.colorBlack,
        borderRadius: 10,
        marginHorizontal: RFValue(10),
        padding: RFValue(10),
        marginTop: RFValue(10),
        marginBottom: RFValue(10),
    },
    title: {
        color: Colors.colorYellow,
        fontSize: RFValue(20),
    },
    textHeaderCard: {
        fontSize: RFValue(16),
        color: Colors.colorYellow,
    },
    textFooterCard: {
        fontWeight: "bold",
        fontSize: RFValue(16),
        color: Colors.colorYellow,
    },
    textRowTable: {
        color: "#FFF",
        fontSize: RFValue(16),
    },
    subtitle: {
        justifyContent: "center",
        color: Colors.colorMain,
        fontSize: RFValue(14),
    },
    headerCard: {
        borderBottomColor: Colors.colorYellow,
        borderBottomWidth: 2,
        paddingVertical: 10,
        // flexDirection: "row",
        // justifyContent: "space-between"
    },
    footerCard: {
        paddingVertical: 10,
    },
    bodyRowTable: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerCardTotals: {
        borderBottomColor: Colors.colorYellow,
        borderBottomWidth: 2,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textBack: {
        color: Colors.colorRed,
        //textTransform: "uppercase",
        fontSize: RFValue(16),
    },
})

export default Payment
