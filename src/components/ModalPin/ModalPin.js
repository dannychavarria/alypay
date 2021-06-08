import React, { useState } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
} from "react-native"

// import constanst
import { GlobalStyles, errorMessage } from "../../utils/constants"

// import styles
import useStyles from "../../hooks/useStyles.hook"
import ProfileStyle from "../../Styles/Views/ProfileStyle/ProfileStyle"

// import servicios
import ServiceProfile from "../../Services/SerProfile/SerProfile"

const ModalPin = ({ showModal, setShowModal }) => {
    // estados de pin y contraseña
    const [pin, setPin] = useState("")
    const [pinConfirm, setPinConfirm] = useState("")
    const [password, setPassword] = useState("")

    // llamada a los estilos
    const classes = useStyles(ProfileStyle)

    // funcion de cierre del modal
    const closeModal = () => {
        setShowModal(false)
    }

    // funcion de envio de informacion
    const submitInformation = () => {
        try {
            if (pin !== pinConfirm) {
                throw String("Pins no coinciden")
            }

            const DataSent = {
                pin_number: pin,
                password: password,
            }

            ServiceProfile(DataSent)
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    return (
        <View style={classes.modalContainer}>
            <Modal
                animationType="none"
                transparent={true}
                visible={showModal}
                onRequestClose={closeModal}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                    onLongPress={closeModal}>
                    <View style={classes.modalOut} />
                </TouchableWithoutFeedback>

                <View style={classes.modalContainer}>
                    <View style={classes.modalStyle}>
                        <Text style={classes.modalTextTitle}>Ingrese PIN</Text>

                        <Text style={classes.modalTextSubtitle}>
                            Ingrese un PIN válido e 6 dígitos y recuerdelo, no
                            comparta su PIN con nadie. Es la manera más segura
                            de verificar su identidad cuando efectúe usa
                            transacción.
                        </Text>

                        <Text style={classes.modalTextTitleLeft}>PIN</Text>

                        <TextInput
                            style={classes.modalInput}
                            value={pin}
                            onChangeText={setPin}
                            placeholder="000000"
                            placeholderTextColor="gray"
                            keyboardType="number-pad"
                            maxLength={6}
                        />

                        <Text style={classes.modalTextTitleLeft}>
                            Confirmar PIN
                        </Text>

                        <TextInput
                            style={classes.modalInput}
                            value={pinConfirm}
                            onChangeText={setPinConfirm}
                            placeholder="000000"
                            placeholderTextColor="gray"
                            keyboardType="number-pad"
                            maxLength={6}
                        />

                        <Text
                            style={{
                                color: "gray",
                                fontSize: 16,
                            }}>
                            Ingrese su contraseña para verificar el cambio de
                            PIN.
                        </Text>

                        <Text style={classes.modalTextTitleLeft}>
                            Contraseña
                        </Text>

                        <TextInput
                            style={classes.modalInput}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Ingrese su contraseña"
                            placeholderTextColor="gray"
                            secureTextEntry
                        />

                        <TouchableOpacity
                            style={GlobalStyles.buttonPrimary}
                            onPress={submitInformation}>
                            <Text style={GlobalStyles.textButton}>
                                Confirmar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalPin
