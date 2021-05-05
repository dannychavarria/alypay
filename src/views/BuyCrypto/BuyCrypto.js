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
import { urlAlyCoin } from "../../utils/constants"
import { Picker } from "@react-native-picker/picker"

// Import from Lodash
import Floor from "lodash/floor"

// Import store from redux
import store from "../../store/index"

const BuyCrypto = ({ route }) => {
    const classes = useStyles(BuyCryptoStyles)

    const { data, wallet } = route.params

    // ???
    const [coin, setCoin] = useState([])
    const [hash, setHash] = useState("")

    const {
        infoCoin,
        ConfigureComponent,
        onChangeAmountFee,
        totalAmountUSD,
        priceCoin,
        PriceMoment,
        submintInformation,
        amounOrigin,
    } = useBuyCrypto()

    // ???
    const urlImage =
        infoCoin[coin + 1]?.id !== null
            ? `https://s2.coinmarketcap.com/static/img/coins/128x128/${
                  infoCoin[coin + 1]?.id
              }.png`
            : urlAlyCoin

    const sendInfo = () => {
        const amount = parseFloat(amounOrigin)

        const dataSend = {
            id_wallet_from: 0,
            id_wallet_to: data.id,
            name_coin: data.name,
            amount_from: amount,
            amount_to: totalAmountUSD,
            amount_usd: totalAmountUSD,
            hash: hash,
        }
        submintInformation(dataSend)
        setHash("")

        onChangeAmountFee("", 0)
    }

    useEffect(() => {
        ConfigureComponent()
    }, [])

    useEffect(() => {
        PriceMoment(coin + 1)
    }, [coin])

    return (
        <Container showLogo>
            <View style={classes.containerWallet}>
                <View style={classes.containerInput}>
                    <Text style={classes.textTitle}>Comprar AlyCoin</Text>

                    <View style={classes.containerWalletTouchable}>
                        <Text style={classes.textTitleInputWaller}>
                            Tocar para copiar
                        </Text>
                        <TouchableOpacity
                            onPress={() => CopyClipboard(data.wallet)}
                            style={classes.textTouchable}>
                            <Text style={classes.textTitleInput}>
                                {data.wallet}
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
                                    {Array.isArray(infoCoin) &&
                                        infoCoin
                                            .slice(1, 5)
                                            .map((item, index) => (
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
                                        onChangeAmountFee(value, priceCoin)
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
                            $ {Floor(priceCoin, 8) || 0}
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
                        placeholder="Hash de la billetera"
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
