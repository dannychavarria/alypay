import React, { useReducer, useEffect } from "react"

// Import components
import Container from "../../components/Container/Container"
import { View as ViewAnimatable } from "react-native-animatable"
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Keyboard,
} from "react-native"

// Imports constants and functions
import {
    reducer,
    GlobalStyles,
    Colors,
    RFValue,
    CopyClipboard,
    errorMessage,
    http,
    getHeaders,
    loader,
    successMessage,
} from "../../utils/constants"
import { useNavigation } from "@react-navigation/native"

// Import store from redux
import store from "../../store/index"

const initialState = {
    hash: "",
    amount: "",
    information: null,
}

const Recharge = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { goBack } = useNavigation()

    // Informacion detallada de la billetera
    const { wallet } = store.getState()

    const { information } = wallet

    let checkHashPattern = /[a-zA-Z0-9]*$/

    // Metodo para enviar la peticion
    const onSubmit = async () => {
        try {
            // Ocultamos el teclado
            await Keyboard.dismiss()

            // Verificamos si hay algun monto
            if (state.amount.trim().length === 0) {
                throw "Ingresa una cantidad"
            }

            // Verificamos si el hash contiene mas de 8 caracteres
            if (state.hash.trim().length < 8) {
                throw "El hash no es correcto"
            }

            // Verificamos que el hash no contenga caracteres especiales
            if (!checkHashPattern.test(state.hash)) {
                throw String("El hash no es correcto")
            }

            // Loader mode on
            loader(true)

            // monto en fracciones de moneda
            const amount = parseFloat(state.amount)

            // Monto a comprar en dolares
            const amount_usd = information.price * amount

            // Construimos el dato formato json para enviarlo al backend
            const sendData = {
                amount,
                name_coin: information.name,
                id_wallet: information.id,
                hash: state.hash,
                amount_usd,
            }

            // Ejecutamos la peticion
            const { data } = await http.post(
                "/wallets/recharge",
                sendData,
                getHeaders(),
            )

            // Verificamos si hay un error
            if (data.error) {
                throw data.message
            }

            // Verificamos si la peticion se ejecuto correctamente
            if (data.response === "success") {
                successMessage(
                    `Se han depositado tus ${amount} ${information.symbol}`,
                )

                // Verificamos la funcion
                await wallet?.reloadInfo()

                // Vamos para atras
                goBack()
            } else {
                // Ejecutamos un error cuando la respuesta del server es desconocida
                throw "No se ha podido ejecutar tu transaccion, contacte a soporte"
            }
        } catch (error) {
            errorMessage(error.toString())
        } finally {
            // loader mode off
            loader(false)
        }
    }

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
                <Text
                    style={[
                        styles.textLegend,
                        { alignSelf: "center", marginBottom: 10 },
                    ]}>
                    Toca para copiar
                </Text>

                <TouchableOpacity
                    onPress={_ => CopyClipboard(information.wallet)}
                    style={GlobalStyles.buttonPrimaryLine}>
                    <Text style={styles.textWallet}>
                        {wallet.information.wallet}
                    </Text>
                </TouchableOpacity>

                <View style={styles.line} />

                <View style={styles.containerTransaction}>
                    <View>
                        <Text style={styles.textLegend}>
                            Cantidad de {information.symbol}
                        </Text>
                        <TextInput
                            value={state.amount}
                            onChangeText={payload =>
                                dispatch({ type: "amount", payload })
                            }
                            keyboardAppearance="dark"
                            keyboardType="numeric"
                            style={GlobalStyles.textInput}
                        />
                    </View>

                    <View style={styles.hashContainer}>
                        <Text style={styles.textLegend}>
                            Hash de transaccion
                        </Text>
                        <TextInput
                            value={state.hash}
                            onChangeText={payload =>
                                dispatch({ type: "hash", payload })
                            }
                            keyboardAppearance="dark"
                            style={GlobalStyles.textInput}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={GlobalStyles.buttonPrimary}
                    onPress={onSubmit}>
                    <Text style={GlobalStyles.textButton}>Confirmar</Text>
                </TouchableOpacity>

                <View style={styles.containerBalance}>
                    <Text style={styles.textLegend}>Saldo actual</Text>
                    <Text style={styles.textBalance}>
                        {information.amount} {information.symbol}
                    </Text>
                </View>
            </ViewAnimatable>
        </Container>
    )
}

const styles = StyleSheet.create({
    containerRoot: {
        padding: RFValue(25),
    },

    containerTransaction: {
        flexDirection: "row",
        marginBottom: RFValue(25),
        width: "100%",
    },

    textWallet: {
        ...GlobalStyles.textButtonPrimaryLine,
        fontSize: RFValue(11),
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
        fontSize: RFValue(32),
    },

    textLegend: {
        color: Colors.colorYellow,
        fontSize: RFValue(12),
    },

    hashContainer: {
        flex: 1,
        marginLeft: RFValue(10),
    },
})

export default Recharge
