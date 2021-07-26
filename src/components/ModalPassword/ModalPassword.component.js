import React, { useEffect, useState } from "react"

import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    KeyboardAvoidingView,
} from "react-native"

// Import Styles and Hooks
import useStyle from "../../hooks/useStyles.hook"
import ModalPasswordStyle from "../../Styles/Components/ModalPasswordStyle/ModalPassword.style"

// Import Components
import Modal from "react-native-modal"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import PasswordInput from "../passwordInput/PasswordInput.component"

// Import Constants
import { GlobalStyles } from "../../utils/constants"

// Impor Store
import store from "../../store/index"

const ModalPassword = ({
    password,
    setPassword,
    showModal,
    setShowModal,
    fn,
    indexWallet,
}) => {
    const { global } = store.getState()

    // console.log("Index", indexWallet)

    const [active, setActive] = useState(true)

    const styles = useStyle(ModalPasswordStyle)

    const changeText = _ => {
        if (global.wallets !== undefined) {
            setActive(true)
        } else {
            global.wallets[indexWallet === -1 ? 0 : indexWallet].id_state === 1 ?
                setActive(false) :
                setActive(true)
        }

    }


    useEffect(_ => {
        changeText()
    }, [])

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
                            {active ?
                            'Usted esta apunto de deshablitar una billetera. Al hacerlo, no podra usar sus fondos en dicha billetera para realizar transacciones. Si esta deacuerdo, presione el boton "Continuar"':
                                `Usted esta apunto de habilitar una billetera. Si esta deacuerdo, presione el boton "Continuar"`}
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
                            onPress={_ => {
                                setShowModal(false)
                                fn()
                            }}>
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
