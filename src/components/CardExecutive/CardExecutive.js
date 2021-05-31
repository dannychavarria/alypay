import React, { useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

// Import navigation functions
import { useNavigation } from "@react-navigation/native"

// Import Constanst
import { Colors, RFValue } from "../../utils/constants"

// Import Assets
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const CardExecutive = (data) => {
    const { navigate } = useNavigation()

    const onListCommerce = () => {
        navigate("Profile", data)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onListCommerce}>
            <View style={styles.subContainerInfo}>
                <View style={styles.row}>
                    <Text style={styles.legend}>Ganacia de ejecutivo</Text>
                    <Icon
                        name="arrow-right"
                        size={20}
                        color={Colors.colorYellow}
                    />
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
        fontSize: RFValue(20),
        color: Colors.colorYellow,
    },
})

export default CardExecutive
