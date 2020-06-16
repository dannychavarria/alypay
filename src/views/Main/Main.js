import React, { useState, useCallback, useEffect } from "react"

// Import componentes
import Loader from "../../components/Loader/Loader"
import Container from "../../components/Container/Container"
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native"

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

const ItemWallet = () => {
    const urlImage = "https://s2.coinmarketcap.com/static/img/coins/128x128/1.png"

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            backgroundColor: Colors.colorBlack,
            borderRadius: RFValue(5),
            padding: RFValue(10),
            flexDirection: "row",
        },

        image: {
            resizeMode: "contain",
            marginRight: RFValue(10),
            height: RFValue(64),
            width: RFValue(64),
        },

        subContainerInfo: {
            flex: 1,
        },

        row: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: RFValue(2.5),
            width: "100%",
        },

        lastCol: {
            alignItems: "flex-end",
        },

        key: {
            color: "#CCC",
            fontSize: RFValue(12),
        },

        superValue: {
            color: Colors.colorYellow,
            fontSize: RFValue(24),
        },

        value: {
            color: Colors.colorYellow,
            fontSize: RFValue(16),
        },
    })

    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} source={{ uri: urlImage }} />

            <View style={styles.subContainerInfo}>
                <View style={styles.row}>
                    <Text style={styles.superValue}>
                        Bitcoin
                    </Text>

                    <View style={styles.lastCol}>
                        <Text style={styles.key}>Balance</Text>
                        <Text style={styles.value}>0.0002 BTC</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.key}>Precio del mercado</Text>
                        <Text style={styles.value}>$ 9,580.54</Text>
                    </View>

                    <View style={styles.lastCol}>
                        <Text style={styles.key}>Balance USD</Text>
                        <Text style={styles.value}>$ 25</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Main = () => {
    const store = Store.getState()

    const styles = StyleSheet.create({
        containerWallets: {
            marginHorizontal: RFValue(10),
        }
    })

    return (
        <Container showLogo>
            <Swich />

            <View style={styles.containerWallets}>
                <ItemWallet />
            </View>

        </Container>
    )
}

export default Main