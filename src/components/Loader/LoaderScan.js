import React from "react"

// Import Components
import Modal from "react-native-modal"
import Lottie from "lottie-react-native"

// Import assets and animations
import waiting from "../../animations/waiting-pay.json"
import { RFValue } from "../../utils/constants"

/**
 * Componente que se muestra cuando hay un proceso
 */
const LoaderScan = ({ isVisible = false, size = 128 }) => {
    return (
        <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
            <Lottie style={{ height: RFValue(size), width: RFValue(size), alignSelf: "center" }} source={waiting} loop autoPlay />
        </Modal>
    )
}

export default LoaderScan