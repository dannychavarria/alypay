import React, { useEffect, useState } from "react"

// import React navigation functions and constants
import ROUTES from "../../utils/routes.config"
import { useNavigation } from "@react-navigation/native"

// Import Components
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native"

// import constants and function
import {
    Colors,
    RFValue,
    urlAlyCoin,
    WithDecimals,
} from "../../utils/constants"
import Floor from "lodash/floor"

/**
 * Componente que representa la billetera del usuario
 */
const ItemWallet = ({ data = {}, disabled = false }) => {
    const { navigate } = useNavigation()
    // console.log("DataWallet", data)

    const [infoData, setInfoData] = useState([])

    const urlImage =
        data._id !== null
            ? `https://s2.coinmarketcap.com/static/img/coins/128x128/${
                  data._id
              }.png`
            : urlAlyCoin

    /**
     * Funcion que verifica si tiene es dueño de compañia
     */
    const isTherter = () => {
        navigate(ROUTES.WALLET, data)
        // } else {
        //     navigate(ROUTES.LIST, data)
        // }
    }

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={isTherter}
            style={styles.container}>
            <Image style={styles.image} source={{ uri: urlImage }} />

            <View style={styles.subContainerInfo}>
                <View style={styles.row}>
                    <Text style={styles.superValue}>{data.name}</Text>

                    <View style={styles.lastCol}>
                        <Text style={styles.key}>Balance</Text>
                        <Text style={styles.value}>
                            {Floor(data.amount, 8)} {data.symbol}
                        </Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.key}>Precio del mercado</Text>
                        <Text style={styles.value}>
                            $ {WithDecimals(Floor(data.price, 2))}
                        </Text>
                    </View>

                    <View style={styles.lastCol}>
                        <Text style={styles.key}>Balance USD</Text>
                        <Text style={styles.value}>
                            ${" "}
                            {WithDecimals(
                                (data.price * data.amount).toFixed(2),
                            )}
                        </Text>
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
        marginHorizontal: RFValue(10),
        flexDirection: "row",
        elevation: 25,
    },

    image: {
        resizeMode: "contain",
        marginRight: RFValue(10),
        borderRadius: RFValue(64),
        overflow: "hidden",
        height: RFValue(64),
        width: RFValue(64),
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

    lastCol: {
        alignItems: "flex-end",
    },

    key: {
        color: "#CCC",
        fontSize: RFValue(12),
    },

    superValue: {
        color: Colors.colorYellow,
        // textTransform: "uppercase",
        fontSize: RFValue(18),
    },

    value: {
        color: Colors.colorYellow,
        fontSize: RFValue(16),
    },
})

export default ItemWallet
