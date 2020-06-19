import React from "react"

// Import components
import Switch from "../../components/Switch/Switch"
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import Container from "../../components/Container/Container"

// Import Others components from React-Native
import { View, Image, Text, StyleSheet, ScrollView } from "react-native"

// Import constanst and others things
import { Colors, RFValue } from "../../utils/constants"

const switchItems = [
    {
        text: "Recibir",
        state: "receive"
    },

    {
        text: "Enviar",
        state: "send"
    },

    {
        text: "Historial",
        state: "history"
    },
]


const Wallet = () => {
    

    return (
        <Container>
            <Switch items={switchItems} />


            <View style={styles.conatinerWallet}>
                <ItemWallet />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    conatinerWallet: {
        margin: RFValue(10),
    }
})

export default Wallet