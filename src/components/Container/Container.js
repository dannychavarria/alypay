import React from "react"

import { GlobalStyles, RFValue } from "../../utils/constants"

// Import Components
import Navbar from "../Navbar/Navbar"
import { SafeAreaView, Image, StyleSheet, ScrollView, Dimensions, View } from "react-native"

// Import Assets
import alypayLogo from "../../static/alypay.png"

const Container = ({ children, showLogo = false, hiddenNavbar = false }) => {
    return (
        <SafeAreaView style={GlobalStyles.superContainer}>
            <ScrollView style={styles.scroll}>

                {
                    showLogo !== false &&
                    <Image style={styles.logo} source={alypayLogo} />
                }

                {children}

                <View style={{ height: RFValue(60) }} />
            </ScrollView>

            {
                hiddenNavbar === false &&
                <>
                    <Navbar />
                </>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        position: "relative",
        // height: Dimensions.get("window").height
    },
    logo: {
        alignSelf: "center",
        resizeMode: "contain",
        height: RFValue(128),
        width: "80%",
    }
})

export default Container