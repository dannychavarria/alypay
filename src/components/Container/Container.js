import React, { useState } from "react"

import { GlobalStyles, RFValue, Colors } from "../../utils/constants"

// Import Components
import { SafeAreaView, Image, StyleSheet, ScrollView, View, RefreshControl } from "react-native"

// Import Assets
import alypayLogo from "../../static/alypay.png"

const Container = ({ children, showLogo = false, scrollViewStyles = {}, onRefreshEnd = null }) => {
    const [refreshing, setRefresh] = useState(false)

    /**Metodo para recargar pantalla */
    const refetching = async () => {
        try {
            setRefresh(true)

            await onRefreshEnd()

            setRefresh(false)
        } catch (error) {

        }
    }

    return (
        <SafeAreaView style={GlobalStyles.superContainer}>
            <ScrollView
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="always"
                refreshControl={onRefreshEnd !== null && <RefreshControl refreshing={refreshing} onRefresh={refetching} />}
                style={[styles.scroll, scrollViewStyles]}>

                {
                    showLogo !== false &&
                    <Image style={styles.logo} source={alypayLogo} />
                }

                {children}

                <View style={{ height: RFValue(60) }} />
            </ScrollView>
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