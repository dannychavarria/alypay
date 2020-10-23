import React, { useState, useEffect, useReducer } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native'

// Import functions
import { RFValue, Colors, GlobalStyles, http, loader, getHeaders, successMessage, errorMessage } from '../../utils/constants'
import { useNavigation } from "@react-navigation/native"

// Import Componets
import Container from '../Container/Container'
import SwitchCoin from '../Switch/SwitchCoin'
import _ from "lodash"

// Import store from redux
import store from "../../store/index"

const initialState = {
    information: null
}

const pagar = ({ route, navigation }) => {
    const { goBack } = useNavigation()
    // const [state, dispatch] = useReducer(reducer, initialState)

    const [currentCoin, setCurrentCoin] = useState({})
    const [crpytoPrices, setCryptoPrices] = useState({ ALY: null, BTC: null, ETH: null, DASH: null, LTC: null })
    const Pay = route.params.data
    const scanned = route.params.scan

    const getAllPrices = async () => {
        try {
            loader(true)

            const { data } = await http.get("/wallets", getHeaders())

            if (data.error) {
                throw String(data.message)
            }
            else {
                setCryptoPrices(data)
            }

        } catch (error) {
            Alert.alert("Ha Ocurrido un error", error.toString())
        } finally {
            loader(false)
        }
    }

    const confirmpPayment = async () => {
        try {
            loader(true)
            const amount = parseFloat(_.floor(Pay.amount / currentCoin.price, 8))
            const _amountUSD = currentCoin.price

            let senData;
            if (scanned) {
                senData =
                {
                    id: Pay.id,
                    from: currentCoin.id,
                    to: Pay.wallet_commerce,
                    amount: amount,
                    exchangeRate: _amountUSD,
                    scan: scanned
                }
            } else {
                senData = {
                    id: Pay.order,
                    from: currentCoin.id,
                    exchangeRate: _amountUSD,
                    scan: scanned
                }
            }

            const { data } = await http.post("/ecommerce/transaction/pay", senData, getHeaders())

            if (data.error) {
                throw String(data.message)
            }

            if (data.response === "success") {
                successMessage("Pago de su Transaccion Exitosa")

                // await crpytoPrices?.reloadInfo()
            }

            navigation.pop()

        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    const cancelPayment = () => {
        return Alert.alert("Estas apunto de cancelar la transaccion", "Realmente quieres ejecutar esta accion", [
            {
                text: "Cancelar",
                onPress: () => { }
            },
            {
                text: "Salir",
                onPress: () => navigation.pop()
            }
        ])

        // return true
    }

    useEffect(() => {
        const handledBack = BackHandler.addEventListener("hardwareBackPress", cancelPayment)

        getAllPrices()

        // store.subscribe(() => {
        //     getAllPrices()
        // })

        return () => handledBack.remove()

    }, [])

    return (
        <Container showLogo>
            <View style={styles.container}>
                <Text style={styles.title}>Transaccion Detectada</Text>
            </View>

            <SwitchCoin
                items={crpytoPrices}
                onSwitch={current => setCurrentCoin(current)} />

            <View style={styles.card}>
                <View style={styles.headerCard}>
                    <Text style={styles.textHeaderCard}>Descripcion de la Transaccion</Text>
                </View>

                <View style={styles.bodyRowTable}>
                    <Text style={styles.textRowTable}>{Pay.description}</Text>
                </View>

                {/* <View style={styles.headerCard}>
                    <Text style={styles.textHeaderCard}>Fee de la transaccion</Text>
                </View>

                <View style={styles.bodyRowTable}>
                    <Text style={styles.textRowTable}>{}</Text>
                </View> */}

                <View style={styles.headerCardTotals}>
                    <Text style={styles.textHeaderCard}>Total ()</Text>
                    <Text style={styles.textHeaderCard}>Total (USD)</Text>
                </View>

                <View style={styles.bodyRowTable}>
                    <Text style={styles.textRowTable}>{Pay.amount}</Text>
                    <Text style={styles.textRowTable}>$ {Pay.amount}</Text>
                </View>

                <View style={styles.headerCardTotals}>
                    <Text style={styles.textHeaderCard}>Tipo de Moneda</Text>
                    <Text style={styles.textHeaderCard}>Total de Moneda</Text>
                </View>

                <View style={styles.bodyRowTable}>
                    <Text style={styles.textRowTable}>{currentCoin.symbol}</Text>
                    <Text style={styles.textRowTable}>{_.floor(Pay.amount / currentCoin.price, 8)}</Text>
                </View>
            </View>

            <View style={styles.containerButtons}>
                <TouchableOpacity onPress={cancelPayment}>
                    <Text style={styles.textBack}>Cancelar transaccion</Text>
                </TouchableOpacity>

                <TouchableOpacity style={GlobalStyles.buttonPrimary}>
                    <Text onPress={confirmpPayment}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: "center",
        padding: 5
    },
    containerButtons: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
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
        fontSize: RFValue(20)
    },
    textHeaderCard: {
        fontSize: RFValue(16),
        color: Colors.colorYellow
    },
    textFooterCard: {
        fontSize: RFValue(16),
        color: Colors.colorYellow
    },
    textRowTable: {
        color: "#FFF",
        fontSize: RFValue(16)
    },
    subtitle: {
        justifyContent: 'center',
        color: Colors.colorMain,
        fontSize: RFValue(14)
    },
    headerCard: {
        borderBottomColor: Colors.colorYellow,
        borderBottomWidth: 2,
        paddingVertical: 10,
        flexDirection: "row",
        //justifyContent: "center",
    },
    footerCard: {
        borderBottomColor: Colors.colorYellow,
        borderBottomWidth: 2,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bodyRowTable: {
        // marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerCardTotals: {
        borderBottomColor: Colors.colorYellow,
        borderBottomWidth: 2,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textBack: {
        color: Colors.colorRed,
        //textTransform: "uppercase",
        fontSize: RFValue(16)
    },
})

export default pagar