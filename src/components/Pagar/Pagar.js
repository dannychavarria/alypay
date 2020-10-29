import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native'

// Import functions
import { RFValue, Colors, GlobalStyles, http, loader, getHeaders, successMessage, errorMessage } from '../../utils/constants'

// Import Componets
import Container from '../Container/Container'
import SwitchCoin from '../Switch/SwitchCoin'
import _ from "lodash"
import store from '../../store'

const Payment = ({ route, navigation }) => {
    //
    const [currentCoin, setCurrentCoin] = useState({})
    
    //
    const [commerceData, setCommerceData] = useState({})
    
    //
    const [crpytoPrices, setCryptoPrices] = useState({ ALY: null, BTC: null, ETH: null, DASH: null, LTC: null })
    
    // 
    const Pay = route.params.data
    
    //
    const scanned = route.params.scan

    // ?????
    const getAllPrices = async () => {
        try {
            loader(true)

            const { data } = await http.get(`/ecommerce/transaction/info/${scanned ? Pay.orderId : Pay.order}`, getHeaders());
            if (data.error) {
                throw String(data.message)
            }

            //
            setCryptoPrices(data.wallets)
            
            // ???????
            setCommerceData(data.data)

        } catch (error) {
            Alert.alert("Ha Ocurrido un error", error.toString())
            navigation.navigate('Main')
        } finally {
            loader(false)
        }
    }

    // 
    const confirmPayment = async () => {
        try {
            loader(true)

            //
            const amount = currentCoin.fee.subtotal

            // 
            const _amountUSD = currentCoin.feeUSD.subtotal

            //
            const senData = {
                id: scanned ? Pay.orderId : Pay.order,
                from: currentCoin.id,
                to: scanned ? Pay.wallet_commerce : commerceData.wallet,
                amount: amount,
                amountUSD: _amountUSD,
            }

            // Peticion que hace????
            const { data } = await http.post("/ecommerce/transaction/pay", senData, getHeaders())

            if (data.error) {
                throw String(data.message)
            }

            if (data.response === "success") {
                // await AsyncStorage.setItem('transactionStatus', 'true')
                successMessage("Pago de su Transaccion Exitosa")


                //
                navigation.popToTop()
            }

            // navigation.pop()
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            loader(false)
        }
    }

    //?????
    const cancelPayment = () => {
        return Alert.alert("Estas apunto de cancelar la transaccion", "Realmente quieres ejecutar esta accion", [
            {
                text: "Cancelar",
                onPress: () => { }
            },
            {
                text: "Salir",
                onPress: () => {
                    const { functions } = store.getState()

                    functions?.reloadWallets()

                    navigation.pop()
                }
            }
        ])

        // return true
    }

    useEffect(() => {

        /// ????
        const handledBack = BackHandler.addEventListener("hardwareBackPress", cancelPayment)

        getAllPrices()

        return () => handledBack.remove()

    }, [])

    return (
        <Container showLogo>
            <View style={styles.container}>
                <Text style={styles.title}>Transaccion Detectada</Text>
            </View>

            <SwitchCoin
                items={crpytoPrices}
                onSwitch={value => setCurrentCoin(value)} />

            <View style={styles.card}>
                <View style={styles.headerCard}>
                    <Text style={styles.textHeaderCard}>Descripcion de la Transaccion</Text>
                </View>

                <View style={styles.bodyRowTable}>
                    <Text style={styles.textRowTable}>{scanned ? Pay.description : commerceData.description}</Text>
                </View>

                <View style={styles.headerCard}>
                    <Text style={styles.textHeaderCard}>Sub-Total {currentCoin.symbol}</Text>
                    <Text style={styles.textHeaderCard}>Fee {currentCoin.symbol}</Text>
                </View>

                <View style={styles.bodyRowTable}>
                    <Text style={styles.textRowTable}>{currentCoin.fee?.subtotal}</Text>
                    <Text style={styles.textRowTable}>{currentCoin.fee?.fee}</Text>
                </View>

                <View style={styles.headerCard}>
                    <Text style={styles.textHeaderCard}>Total {currentCoin.symbol}</Text>
                    <Text style={styles.textHeaderCard}>Symbolo del Fee</Text>
                </View>

                <View style={styles.bodyRowTable}>
                    <Text style={styles.textRowTable}>{currentCoin.fee?.total}</Text>
                    <Text style={styles.textRowTable}>{currentCoin.fee?.symbol}</Text>
                </View>

                <View style={styles.headerCardTotals}>
                    <Text style={styles.textHeaderCard}>Total ()</Text>
                    <Text style={styles.textHeaderCard}>Total (USD)</Text>
                </View>

                <View style={styles.bodyRowTable}>
                    <Text style={styles.textRowTable}>{scanned ? Pay.amount : commerceData.amount}</Text>
                    <Text style={styles.textRowTable}>$ {scanned ? Pay.amount : commerceData.amount}</Text>
                </View>

                <View style={styles.headerCardTotals}>
                    <Text style={styles.textHeaderCard}>Tipo de Moneda</Text>
                    <Text style={styles.textHeaderCard}>Total de Moneda</Text>
                </View>

                <View style={styles.bodyRowTable}>
                    <Text style={styles.textRowTable}>{currentCoin.symbol}</Text>
                    <Text style={styles.textRowTable}>{currentCoin.feeUSD?.total} {currentCoin.feeUSD?.symbol}</Text>
                </View>
            </View>

            <View style={styles.containerButtons}>
                <TouchableOpacity onPress={cancelPayment}>
                    <Text style={styles.textBack}>Cancelar transaccion</Text>
                </TouchableOpacity>

                <TouchableOpacity style={GlobalStyles.buttonPrimary}>
                    <Text onPress={confirmPayment}>Confirmar</Text>
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
        justifyContent: "space-between"
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

export default Payment