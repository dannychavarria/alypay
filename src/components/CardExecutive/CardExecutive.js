import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

// Import Constanst
import { Colors, RFValue } from '../../utils/constants'

const CardExecutive = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.subContainer} >
                <View style={styles.row}>
                    <Text style={styles.legend}>Ganacia de ejecutivo</Text>
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
        marginHorizontal: RFValue(10),
        flexDirection: "row",
        elevation: 25,
    },
    subContainerInfo: {
        flex: 1,
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: RFValue(2.5),
        width: "100%",
    },
    legend: {
        fontSize: RFValue(20  ),
        color: Colors.colorYellow
    }
})

export default CardExecutive