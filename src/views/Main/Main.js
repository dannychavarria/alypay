import React, { useState, useCallback, useEffect } from "react"

// Import componentes
import Loader from "../../components/Loader/Loader"
import Container from "../../components/Container/Container"
import { Text, StyleSheet, TouchableOpacity, View } from "react-native"

// Import store from redux
import Store from "../../store/index"
import { Colors, RFValue } from "../../utils/constants"

// Import Assets

/**
 * Componente de switch wallet/sell
 * 
 * @param {Function} onChange 
 */
const Swich = ({ onSwitch = () => { } }) => {
    const [state, setState] = useState("wallet")

    // Esperamos que el estado cambie para saber cuando el usuario cambia de estado
    const changeState = useCallback(() => onSwitch(state), [state])

    useEffect(() => changeState(), [state])

    const stylesSwitcher = StyleSheet.create({
        container: {
            alignItems: "center",
            borderColor: Colors.colorYellow,
            borderWidth: 1,
            borderRadius: RFValue(50),
            padding: RFValue(2),
            margin: RFValue(20),
            flexDirection: "row",
            justifyContent: "space-between",
        },

        buttons: {
            alignItems: "center",
            padding: RFValue(10),
            borderRadius: RFValue(50),
            width: "50%"
        },

        buttonActive: {
            backgroundColor: Colors.colorYellow,
        },

        textButton: {
            fontSize: RFValue(24),
        },

        textButtonActive: {
            color: Colors.colorMain,
        },

        buttonDisactive: {
            backgroundColor: "transparent",
        },

        textButtonDisactive: {
            color: Colors.colorYellow,
        },
    })

    return (
        <View style={stylesSwitcher.container}>
            <TouchableOpacity onPress={_ => setState("wallet")} style={[state === "wallet" ? stylesSwitcher.buttonActive : stylesSwitcher.buttonDisactive, stylesSwitcher.buttons]}>
                <Text style={[state === "wallet" ? stylesSwitcher.textButtonActive : stylesSwitcher.textButtonDisactive, stylesSwitcher.textButton]}>
                    Wallets
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={_ => setState("pay")} style={[state === "pay" ? stylesSwitcher.buttonActive : stylesSwitcher.buttonDisactive, stylesSwitcher.buttons]}>
                <Text style={[state === "pay" ? stylesSwitcher.textButtonActive : stylesSwitcher.textButtonDisactive, stylesSwitcher.textButton]}>
                    Pagar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const Main = () => {
    const store = Store.getState()

    console.log(store)

    return (
        <Container showLogo>
            <Swich />
        </Container>
    )
}

export default Main