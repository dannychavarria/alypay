import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"


// import constants
import { Colors } from "../../utils/constants"

/**
 * @author msobalvarro
 * @summary componente que muestra caracteres en vez de simbolos
 * @param {String} `value` Props donde pasaremos el pin o password
 * @param {Number} `length` Props donde indicamos el largo del pin o password
 */
const EntryPassword = ({ value = "", length = 6 }) => {
    const [points] = useState(length ? length : 4)

    return (
        <View style={styles.container}>
            {
                new Array(points).fill(false).map((__, i) => <View style={styles.point}>
                    {(value.length - 1) >= i && <Text style={styles.pointActive} children="*" />}
                </View>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginVertical: 10,
        justifyContent: "center",
    },

    point: {
        justifyContent: "flex-end",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: Colors.colorYellow,
        marginHorizontal: 2.5,
        padding: 5,
        flex: 1,
    },

    pointActive: {
        fontSize: 32,
        color: Colors.colorYellow
    }
})

export default EntryPassword