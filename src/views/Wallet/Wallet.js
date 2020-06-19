import React from "react"

// Import components
import ItemWallet from "../../components/ItemWallet/ItemWallet"
import Container from "../../components/Container/Container"
import { View, Image, Text, StyleSheet } from "react-native"
import { Colors, RFValue } from "../../utils/constants"


const Wallet = () => {

    return (
        <Container>
            <ItemWallet />
        </Container>
    )
}

export default Wallet