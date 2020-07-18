import React from "react"

// import React navigation functions
import { useNavigation } from "@react-navigation/native"

// Import Components
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native"
import { Colors, RFValue, urlAlyCoin, WithDecimals } from "../../utils/constants"

// import store
import store from "../../store/index"

/**
 * Componente que representa la billetera del usuario
 */
const ItemWallet = ({ data = {}, disabled = false }) => {
    const { navigate } = useNavigation()

    const urlImage = data._id !== null
        ? `https://s2.coinmarketcap.com/static/img/coins/128x128/${data._id}.png`
        : urlAlyCoin

    /**
 * Metodo que nos mueve de pantalla a wallet details
 * 
 * @param {Object} data 
 */
    const onNavigate = () => {
        navigate("Wallet", data)        
    }

    return (
        <TouchableOpacity disabled={disabled} onPress={onNavigate} style={styles.container}>
            <Image style={styles.image} source={{ uri: urlImage }} />

            <View style={styles.subContainerInfo}>
                <View style={styles.row}>
                    <Text style={styles.superValue}>
                        {data.name}
                    </Text>

                    <View style={styles.lastCol}>
                        <Text style={styles.key}>Balance</Text>
                        <Text style={styles.value}>{data.amount} {data.symbol}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.key}>Precio del mercado</Text>
                        <Text style={styles.value}>$ {data.price?.toFixed(2)}</Text>
                    </View>

                    <View style={styles.lastCol}>
                        <Text style={styles.key}>Balance USD</Text>
                        <Text style={styles.value}>$ {WithDecimals((data.price * data.amount).toFixed(2))}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: Colors.colorBlack,
        borderRadius: RFValue(5),
        padding: RFValue(10),
        marginVertical: RFValue(5),
        flexDirection: "row",
        elevation: 25,
    },

    image: {
        resizeMode: "contain",
        marginRight: RFValue(10),
        height: RFValue(64),
        width: RFValue(64),
    },

    subContainerInfo: {
        flex: 1,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: RFValue(2.5),
        width: "100%",
    },

    lastCol: {
        alignItems: "flex-end",
    },

    key: {
        color: "#CCC",
        fontSize: RFValue(12),
    },

    superValue: {
        color: Colors.colorYellow,
        fontSize: RFValue(24),
    },

    value: {
        color: Colors.colorYellow,
        fontSize: RFValue(16),
    },
})

export default ItemWallet