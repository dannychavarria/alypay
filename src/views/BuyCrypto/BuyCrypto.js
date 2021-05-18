import React, { useState, useEffect } from "react"
import { View, Text, Image } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"

// Import Components
import Container from "../../components/Container/Container"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"
import useBuyCrypto from "../../hooks/BuyCrypto/useBuyCrypto"

// Import Styles
import { BuyCryptoStyles } from "../../Styles/Views/index"
import {
    Colors,
    RFValue,
    GlobalStyles,
    CopyClipboard,
} from "../../utils/constants"

//import constants

import { Picker } from "@react-native-picker/picker"

// Import from Lodash
import Floor from "lodash/floor"

// Import store from redux
import store from "../../store/index"

const BuyCrypto = ({ route }) => {
    // Estilos
    const classes = useStyles(BuyCryptoStyles)
    const { data } = route.params

    // Index de la moneda seleccionada
    const [coin, setCoin] = useState()
    // Estado del hash de transaccion
    const [hash, setHash] = useState("")

    const {
        infoCoin,
        ConfigureComponent,
        onChangeAmountAly,
        totalAmountUSD,
        priceCoin,
        PriceMoment,
        submintInformation,
        amounOrigin,
    } = useBuyCrypto()

    // Imagen de la moneda
    const urlImage = `https://s2.coinmarketcap.com/static/img/coins/128x128/${
        infoCoin[coin]?.id
    }.png`

    // funcion de envio de datos
    const sendInfo = () => {
        const amount = parseFloat(amounOrigin)
        const idCoinSelected = infoCoin[coin].id
        const symCoinSelected = infoCoin[coin].symbol
        const nameCoinSelected = infoCoin[coin].name

        // datos a enviar
        const dataSend = {
            name_coin: nameCoinSelected,
            id_wallet_to: data.id,
            amount_from: amount,
            amount_to: totalAmountUSD,
            amount_usd: totalAmountUSD,
            hash: hash,
            id_coin_from: idCoinSelected,
            symbol_from: symCoinSelected,
        }
        submintInformation(dataSend)

        // vaciar los inputs
        setHash("")
        onChangeAmountAly("", 0)
    }

    useEffect(() => {
        ConfigureComponent()

        onChangeAmountAly(amounOrigin, priceCoin)
    }, [])

    useEffect(() => {
        PriceMoment(coin)
    }, [coin, priceCoin])

    useEffect(() => {
        onChangeAmountAly(amounOrigin, priceCoin)
    }, [priceCoin])

    return (
        <Container showLogo onRefreshEnd={ConfigureComponent}>
            <View style={classes.containerWallet}>
                <View style={classes.containerInput}>
                    <Text style={classes.textTitle}>Comprar AlyCoin</Text>

                    <View style={classes.containerWalletTouchable}>
                        <Text style={classes.textTitleInputWaller}>
                            Tocar para copiar
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                CopyClipboard(infoCoin[coin]?.wallet)
                            }
                            style={classes.textTouchable}>
                            <Text
                                style={classes.textTitleInput}
                                numberOfLines={1}>
                                {infoCoin[coin]?.wallet}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={classes.containerInputHorizontal}>
                        <Image
                            source={{ uri: urlImage }}
                            style={classes.imageStyle}
                        />

                        <View style={classes.containerInputVertical}>
                            <View style={classes.containerInputItem}>
                                <Text style={classes.textTitleInput}>
                                    Toca para seleccionar
                                </Text>
                                <Picker
                                    style={classes.inputStyle}
                                    selectedValue={coin}
                                    itemStyle={{
                                        height: RFValue(35),
                                        backgroundColor: "transparent",
                                    }}
                                    onValueChange={value => setCoin(value)}>
                                    {infoCoin.map((item, index) => (
                                        <Picker.Item
                                            enabled={true}
                                            key={index}
                                            label={item.symbol}
                                            value={index}
                                            color={Colors.colorMain}
                                        />
                                    ))}
                                </Picker>
                            </View>
                            <View style={classes.containerInputItem}>
                                <Text style={classes.textTitleInput}>
                                    Monto (Cripto)
                                </Text>
                                <TextInput
                                    value={amounOrigin}
                                    onChangeText={value =>
                                        onChangeAmountAly(value, priceCoin)
                                    }
                                    style={classes.inputStyle}
                                    placeholder="0.00"
                                    placeholderTextColor="#CCC"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={classes.containerInputHorizontal}>
                    <View>
                        <Text style={classes.textTitleInput}>
                            Precio del mercado
                        </Text>
                        <Text style={classes.textWhite}>
                            $ {Floor(priceCoin, 8)}
                        </Text>
                    </View>
                    <View>
                        <Text style={classes.textTitleInput}>
                            Conversión (ALY)
                        </Text>
                        <Text style={classes.textWhite}>
                            {Floor(totalAmountUSD, 2) || 0} ALY
                        </Text>
                    </View>
                </View>

                <View style={classes.containerHash}>
                    <Text style={classes.textTitleInput}>
                        Ingrese hash de transacción
                    </Text>
                    <TextInput
                        value={hash}
                        placeholder="Hash de transacción"
                        placeholderTextColor="#CCC"
                        style={classes.inputStyle}
                        onChangeText={setHash}
                    />
                </View>

                <TouchableOpacity
                    style={GlobalStyles.buttonPrimary}
                    onPress={sendInfo}>
                    <Text style={classes.textBuy}>COMPRAR</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default BuyCrypto
