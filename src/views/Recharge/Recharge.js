import React, { useReducer, useEffect } from "react"

// Import components
import Container from "../../components/Container/Container"
import { View as ViewAnimatable } from "react-native-animatable"
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native"

// Imports constants and functions
import { reducer, GlobalStyles, Colors, RFValue, CopyClipboard } from "../../utils/constants"

// Import store from redux
import store from "../../store/index"

const initialState = {
    walletAddress: "",
    amount: "",
    information: null
}

const Recharge = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Informacion detallada de la billetera
    const { wallet } = store.getState()

    const information = (state.information !== null) ? state.information : wallet.information

    useEffect(() => {
        // Actualizar informacion de la billetera
        dispatch({ type: "information", payload: information })


        // Suscribimos a cualquier cambio
        store.subscribe(() => {
            // Informacion actualizad detallada de la billetera
            const { wallet } = store.getState()

            // Actualizar informacion de la billetera
            dispatch({ type: "information", payload: wallet })
        })
    }, [])

    return (
        <Container showLogo>
            <ViewAnimatable style={styles.containerRoot}>
                <Text style={[styles.textLegend, { alignSelf: "center", marginBottom: 10 }]}>Toca para copiar</Text>

                <TouchableOpacity onPress={_ => CopyClipboard(information.wallet)} style={GlobalStyles.buttonPrimaryLine}>
                    <Text style={styles.textWallet}>{information.wallet}</Text>
                </TouchableOpacity>

                <View style={styles.line} />

                <View style={styles.containerTransaction}>
                    <View>
                        <Text style={styles.textLegend}>Cantidad de {information.symbol}</Text>
                        <TextInput
                            value={state.amount}
                            onChangeText={payload => dispatch({ type: "amount", payload })}
                            style={GlobalStyles.textInput} />
                    </View>

                    <View style={styles.hashContainer}>
                        <Text style={styles.textLegend}>Hash de transaccion</Text>
                        <TextInput
                            value={state.walletAddress}
                            onChangeText={payload => dispatch({ type: "walletAddress", payload })}
                            style={GlobalStyles.textInput} />
                    </View>
                </View>

                <TouchableOpacity style={GlobalStyles.buttonPrimary}>
                    <Text style={GlobalStyles.textButton}>Confirmar</Text>
                </TouchableOpacity>

                <View style={styles.containerBalance}>
                    <Text style={styles.textLegend}>Saldo actual</Text>
                    <Text style={styles.textBalance}>{information.amount} {information.symbol}</Text>
                </View>
            </ViewAnimatable>
        </Container>
    )
}

const styles = StyleSheet.create({
    containerRoot: {
        padding: RFValue(25)
    },

    containerTransaction: {
        flexDirection: "row",
        marginBottom: RFValue(25),
        width: "100%"
    },

    textWallet: {
        ...GlobalStyles.textButtonPrimaryLine,
        fontSize: RFValue(12)
    },

    line: {
        borderTopColor: "#2d2d2d",
        borderTopWidth: 1,
        marginVertical: RFValue(25),
    },

    containerBalance: {
        alignItems: "center",
        flex: 1,
        paddingVertical: RFValue(50),
        justifyContent: "center",
    },

    textBalance: {
        color: Colors.colorYellow,
        fontSize: RFValue(32)
    },

    textLegend: {
        color: Colors.colorYellow,
        fontSize: RFValue(12)
    },

    hashContainer: {
        flex: 1,
        marginLeft: RFValue(10)
    }
})

export default Recharge