import React, { useState, useEffect } from "react"
import { View, Text, Image } from "react-native"
import CheckBox from "react-native-check-box"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"

// Import Components
import Container from "../../components/Container/Container"
import Floor from "lodash/floor"
// Import Hooks
import useStyles from "../../hooks/useStyles.hook"
import useBuyCrypto from "../../hooks/BuyCrypto/useBuyCrypto"

// Import Styles
import { BuyCryptoStyles } from "../../Styles/Views/index"
import { Colors, RFValue } from "../../utils/constants"

//import constants
import { urlAlyCoin } from "../../utils/constants"
import { Picker } from "@react-native-picker/picker"

const BuyCrypto = ({ route }) => {
    const { data, wallet } = route.params

    const { infoCoin, ConfigureComponent, } = useBuyCrypto()
    const [coin, setCoin] = useState([])

    console.log('Coin', infoCoin)

    const urlImage =
        data._id !== null
            ? `https://s2.coinmarketcap.com/static/img/coins/128x128/
            ${data._id
            }.png`
            : urlAlyCoin

    useEffect(() => {
        ConfigureComponent()
    }, [])

    /*  useEffect(() => {
    PriceMoment(coin)
    }, [coin])
  */

    const classes = useStyles(BuyCryptoStyles)

    return (
        <Container showLogo>
            <View style={classes.containerWallet}>
                <View style={classes.containerInput}>
                    <Text style={classes.textTitle}>{"Comprar AlyCoin"}</Text>

                    <View style={classes.containerWalletTouchable}>
                        <Text style={classes.textTitleInputWaller}>{"Tocar para copiar"}</Text>
                        <TouchableOpacity
                            style={classes.textTouchable}
                        >
                            <Text style={classes.textTitleInput} numberOfLines={1}>{wallet}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={classes.containerInputHorizontal}>

                        <Image source={{ uri: urlImage }} style={classes.imageStyle} />

                        <View style={classes.containerInputVertical}>
                            <View style={classes.containerInputItem}>
                                <Text style={classes.textTitleInput}>{"Toca para seleccionar"}</Text>
                                <Picker
                                    style={classes.inputStyle}
                                    selectedValue={coin}
                                    itemStyle={{
                                        height: RFValue(35),
                                        backgroundColor: "transparent",
                                    }}
                                    onValueChange={value => setCoin(value)}>
                                    {Array.isArray(infoCoin) &&
                                        infoCoin.slice(1,5).map((item, index) => (<Picker.Item
                                            enabled={true}
                                            key={index}
                                            label={item.symbol}
                                            value={index}
                                            color={Colors.colorMain}
                                        />)
                                        )}
                                </Picker>
                            </View>
                            <View style={classes.containerInputItem}>
                                <Text style={classes.textTitleInput}>{"Monto (Cripto)"}</Text>
                                <TextInput
                                    style={classes.inputStyle}
                                    placeholder={'0.00'}
                                    placeholderTextColor={'gray'}
                                    keyboardType={'number-pad'}
                                />
                            </View>
                        </View>
                    </View>

                </View>

                <View style={classes.containerInputHorizontal}>
                    <View>
                        <Text style={classes.textTitleInput}>Precio del mercado</Text>
                        <Text style={classes.textWhite}>{Floor(infoCoin[coin + 1]?.quote.USD.price, 8)}</Text>
                    </View>
                    <View>
                        <Text style={classes.textTitleInput}>Conversión (USD)</Text>
                        <Text style={classes.textWhite}></Text>
                    </View>
                </View>

                <View style={classes.containerHash}>
                    <Text style={classes.textTitleInput}>{'Ingrese hash de transacción'}</Text>
                    <TextInput
                        placeholder={'Hash de la billetera'}
                        placeholderTextColor={'gray'}
                        style={classes.inputStyle}
                        onChangeText={()=>{

                        }}
                    />
                </View>

                <TouchableOpacity
                    style={classes.buttonBuy}
                >
                    <Text style={classes.textBuy} >COMPRAR</Text>
                </TouchableOpacity>

            </View>

        </Container>
    )
}

export default BuyCrypto
