import React from "react"
import { View, Text } from "react-native"

// Import Components
import Container from "../../components/Container/Container"
import ItemWallet from "../../components/ItemWallet/ItemWallet"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"

// Import Styles
import { BuyCryptoStyles } from "../../Styles/Views/index"

const BuyCrypto = () => {
    const classes = useStyles(BuyCryptoStyles)

    return (
        <Container onRefreshEnd>
            <View style={classes.containerWallet}>
                <ItemWallet />
            </View>
        </Container>
    )
}

export default BuyCrypto
