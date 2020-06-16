import React from "react"

import { GlobalStyles, RFValue } from "../../utils/constants"

// Import Components
import { SafeAreaView, Image, StyleSheet } from "react-native"

// Import Assets
import alypayLogo from "../../static/alypay.png"

const Container = ({ children, showLogo = false }) => {
    return (
        <SafeAreaView style={GlobalStyles.superContainer}>
            {
                showLogo !== false &&
                <Image style={styles.logo} source={alypayLogo} />
            }

            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: "center",
        resizeMode: "contain",
        height: RFValue(128),
        width: "80%",
    }
})

export default Container