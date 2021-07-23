import React, { useState } from "react"

import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    KeyboardAvoidingView,
} from "react-native"
//componetes
import Modal from "react-native-modal"
//estilos
import useStyle from "../../hooks/useStyles.hook"
import ModalPasswordStyle from "../../Styles/Components/ModalPasswordStyle/ModalPassword.style"
//dependencias
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
//store
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

    const [showPassword, setShowPassword] = useState(false)

    const styles = useStyle(ModalPasswordStyle)

    const showPasswordInvert = _ => {
        setShowPassword(!showPassword)
    }

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
                    <Text style={styles.title}>¡Atención!</Text>

                    <Text style={styles.subtitle}>
                        {global?.wallets[(indexWallet === -1 ? 0 : indexWallet)]
                            ?.id_state === 1
                            ? `Usted esta apunto de deshablitar una billetera.
                        Al hacerlo, no podra usar sus fondos en dicha
                        billetera para realizar transacciones. Si esta
                        deacuerdo, presione el boton "Continuar"`
                            : `Usted esta apunto de habilitar una billetera. Si esta deacuerdo, presione el boton "Continuar"`}
                    </Text>

                    <View
                        style={{
                            height: "15%",
                            width: "100%",
                            justifyContent: "center",
                        }}>
                        <TextInput
                            style={styles.inputPassword}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Constraseña"
                            placeholderTextColor="gray"
                            secureTextEntry={!showPassword}
                        />

                        <TouchableOpacity
                            style={styles.showPassword}
                            onPress={showPasswordInvert}>
                            <MaterialIcons
                                name={
                                    showPassword
                                        ? "visibility-off"
                                        : "visibility"
                                }
                                size={30}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={_ => {
                                setShowModal(false)
                            }}>
                            <Text>Cerrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={_ => {
                                setShowModal(false)
                                fn()
                            }}>
                            <Text>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )
}

export default ModalPassword
