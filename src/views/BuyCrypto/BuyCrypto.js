import React, { useState } from "react"
import { View, Text } from "react-native"
import CheckBox from "react-native-check-box"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"

// Import Components
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"

// Import Styles
import { BuyCryptoStyles } from "../../Styles/Views/index"
import { Colors, RFValue } from "../../utils/constants"

const BuyCrypto = ({ route }) => {
    const { data, wallet } = route.params

    const [check, setCheck] = useState(false)

    console.log(wallet)

    const classes = useStyles(BuyCryptoStyles)

    return (
        <Container onRefreshEnd>
            <View style={classes.containerWallet}>
                <ItemWallet data={data} />
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
                        <View>
                            <Text style={classes.textTitleInput}>{"Monto (Cripto)"}</Text>
                            <TextInput
                                style={classes.inputStyle}
                                placeholder={'0.00'}
                                placeholderTextColor={'gray'}
                                keyboardType={'number-pad'}
                            />
                        </View>
                        <View>
                            <Text style={classes.textTitleInput}>{"Monto AlyCoin"}</Text>
                            <TextInput
                                style={classes.inputStyle}
                                placeholder={'0.00'}
                                placeholderTextColor={'gray'}
                                keyboardType={'number-pad'}
                            />
                        </View>
                    </View>

                </View>

                <View style={classes.containerCheckbox}>
                    <CheckBox
                        checkBoxColor={Colors.colorYellow}
                        isChecked={check}
                        onClick={() => { setCheck(!check) }}
                    />
                    <Text style={classes.textTitleCheckbox}>{"Transacción externa"}</Text>
                </View>

                {check
                    ?
                    <View style={classes.containerHash}>
                        <Text style={classes.textTitleInput}>{'Ingrese hash de transacción'}</Text>
                        <TextInput
                            placeholder={'Hash de la billetera'}
                            placeholderTextColor={'gray'}
                            style={classes.inputHashStyle}
                        />
                    </View>
                    :
                    <View style={classes.containerHash} />
                }



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
