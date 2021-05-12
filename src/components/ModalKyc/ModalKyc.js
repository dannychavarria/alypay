import React, { useState } from "react"
import { View, Text } from "react-native"

// Import Components
import Modal from "react-native-modal"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"

// Import Styles
import { ModalKycStyles } from "../../Styles/Components/index"

const ModalKyc = ({ navigation }) => {
    const classes = useStyles(ModalKycStyles)

    const [showModal, setShowModal] = useState(true)

    const onKyc = () => {
        navigation.navigate("Kyc")
    }

    const goBack = () => {}

    return (
        <Modal isVisible={showModal}>
            <View>
                <Text>Hola</Text>
            </View>
        </Modal>
    )
}

export default ModalKyc
