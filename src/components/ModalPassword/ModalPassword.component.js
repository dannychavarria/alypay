import React, { useEffect, useState } from "react"

import {
    View,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
} from "react-native"

// Import Styles and Hooks
import useStyle from "../../hooks/useStyles.hook"
import ModalPasswordStyle from "../../Styles/Components/ModalPasswordStyle/ModalPassword.style"

// Import Components
import Modal from "react-native-modal"
import PasswordInput from "../passwordInput/PasswordInput.component"

// Import Constants
import { errorMessage, GlobalStyles } from "../../utils/constants"

// Impor Store
// import store from "../../store/index"

const ModalPassword = ({
    password,
    setPassword,
    showModal,
    setShowModal,
    fn,
    indexWallet,
}) => {
    // const { global } = store.getState()

    // console.log("Index", indexWallet)

    // const [active, setActive] = useState(true)

    const styles = useStyle(ModalPasswordStyle)

    const changeWallet = _ => {
        try {
            if (password.trim().length === 0) {
                throw String(
                    "La contraseña es requerida para realizar esta accion",
                )
            } else {
                setPassword("")
                setShowModal(false)
                fn()
            }
        } catch (error) {
            errorMessage(error)
        }
    }

    // const changeText = _ => {
    //     if (global.wallets !== undefined) {
    //         setActive(true)
    //     } else {
    //         global.wallets[indexWallet === -1 ? 0 : indexWallet].id_state === 1 ?
    //             setActive(false) :
    //             setActive(true)
    //     }

    // }

    // useEffect(_ => {
    //     changeText()
    // }, [])

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
            }}
            behavior="height">
            <Modal
                isVisible={showModal}
                onBackButtonPress={_ => setShowModal(false)}
                onBackdropPress={_ => setShowModal(false)}>
                <View style={styles.contain}>
                    <View style={styles.rowForm}>
                        <Text style={styles.title}>¡Atención!</Text>

                        <Text style={styles.subtitle}>
                            Usted esta apunto de habilitar o deshabilitar una
                            billetera. Al deshabilitar, no podra usar sus fondos
                            en dicha billetera para realizar transacciones. Si
                            esta deacuerdo, presione el boton "Continuar"
                        </Text>
                    </View>
                    <PasswordInput
                        value={password}
                        onChangeText={setPassword}
                    />

                    <View style={styles.rowFormsButtons}>
                        <TouchableOpacity
                            style={GlobalStyles.buttonPrimaryCancel}
                            onPress={_ => {
                                setShowModal(false)
                            }}>
                            <Text style={GlobalStyles.textButtonCancel}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={GlobalStyles.buttonPrimary}
                            onPress={changeWallet}>
                            <Text style={GlobalStyles.textButton}>
                                Continuar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )
}

export default ModalPassword
