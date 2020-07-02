import React from "react"

// Import components
import Modal from "react-native-modal"
import { Image } from "react-native-animatable"
import { RFValue } from "../../utils/constants"
import { StyleSheet } from "react-native"

// Import Assets
import logo from "../../static/alypay.png"

const Splash = ({ isVisible = true }) => (
    <Modal hideModalContentWhileAnimating={true} backdropOpacity={1} isVisible={isVisible} animationOut="fadeOut">
        <Image source={logo} style={styles.logo} animation="fadeIn" />
    </Modal>
)


const styles = StyleSheet.create({
    logo: {
        alignSelf: "center",
        resizeMode: "contain",
        height: RFValue(128),
        width: RFValue(256),
    }
})

export default Splash