import React from "react"

// Import Functions and constanst
import moment from "moment"
import { Colors, RFValue } from "../../utils/constants"


// Import components
import { View, Text, StyleSheet } from "react-native"

const StoreElement = (item, key) => {
    return (
        <View key={key} style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.name}>{item.name}</Text>

                <View style={styles.detailsContain}>
                    <Text style={styles.id}># {item.id}</Text>
                    <Text style={styles.date}>{moment(item.date).format("DD/MM/YY | HH:mm")}</Text>
                </View>
            </View>

            <Text style={[styles.amount, item.debit ? styles.debitAmount : styles.creditAmount]}>{item.amount} {item.symbol}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderBottomColor: Colors.colorYellow,
        borderBottomWidth: 1,
        backgroundColor: Colors.colorBlack,
        flexDirection: "row",
        padding: RFValue(10),
    },

    subContainer: {
        flex: 1,
        flexDirection: "column",
    },

    name: {
        color: "#FFF",
        fontSize: RFValue(16)
    },

    detailsContain: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
    },

    id: {
        color: "#FFF",
        fontSize: RFValue(12),
        marginRight: RFValue(10),
    },

    date: {
        color: "#CCC",
        fontSize: RFValue(12),
    },

    amount: {
        fontSize: RFValue(16),
        color: "#FFF"
    },

    debitAmount: {
        color: Colors.colorRed,
    },

    creditAmount: {
        color: Colors.colorYellow,
    }
})

export default StoreElement