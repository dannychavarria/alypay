import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

// Import constanst
import { Colors, RFValue, readFile } from '../../utils/constants'

// Import Components
import _ from 'lodash'

// import React navigation functions and constants
import ROUTES from "../../utils/routes.config"
import { useNavigation } from "@react-navigation/native"

// Impprt assets
import avatar from '../../static/ecommerce-avatar.png'
import tether from '../../static/tether.png'

const ItemComerce = ({ data = {} }) => {
    const [source, setSource] = useState(null)
    const { navigate } = useNavigation()

    // Funcion que permite extraer la imagen para visualizarla
    const read = async () => {
        const blog = data?.item.profile_picture

        // verificamos si hay foto
        if (blog) {
            const file = await readFile(blog)
            setSource(file)
        }
    }

    const onInformacion = () => {
        navigate(ROUTES.WALLETCOMMERCE, data)
    }

    useEffect(() => {
        read()
    }, [])

    return (
        <TouchableOpacity style={styles.container} onPress={onInformacion}>
            <Image style={styles.logo} source={source === null ? avatar : { uri: source }} />

            <View style={styles.cardInformation}>
                <View style={styles.headerTableTitle}>
                    <Text style={styles.textHeaderTableTitle}>{data.item?.commerce_name}</Text>
                    <Image source={tether} style={styles.icon} />
                </View>

                <View style={styles.lineTitle} />

                <View style={styles.dataDetailsInfoContainer}>
                    <View style={styles.headerTable}>
                        <Text style={[styles.textHeaderTable, { alignSelf: "flex-start" }]}>Dirección</Text>
                        <Text style={styles.textRowTable}>{data.item?.physical_address}</Text>
                    </View>
                    <View style={styles.bodyRowTable}>
                        <Text style={styles.textHeaderTable}>Balance</Text>
                        <Text style={styles.textRowTable}>{_.floor(data.item?.amount, 2)}<Text style={{ fontSize: RFValue(9) }}>{data.item?.symbol}</Text></Text>
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

    cardInformation: {
        flexDirection: 'column',
        justifyContent: "center",
        flex: 1,
    },
    headerTableTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
    },
    headerTable: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: "50%",
    },
    textHeaderTableTitle: {
        fontSize: RFValue(14),
        color: Colors.colorYellow

    },
    textHeaderTable: {
        textAlign: 'right',
        fontSize: RFValue(13),
        color: Colors.colorYellow
    },
    bodyRowTable: {
        flexDirection: "column",
        justifyContent: 'flex-end',
    },
    textRowTable: {
        color: "#FFF",
        fontSize: RFValue(13),
    },
    lineTitle: {
        borderBottomColor: Colors.colorYellow,
        borderBottomWidth: 1,
        marginVertical: RFValue(10),
        width: "100%",
    },
    dataDetailsInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        width: RFValue(30),
        height: RFValue(30)
    },
    logo: {
        borderRadius: 10,
        height: RFValue(80),
        resizeMode: "cover",
        overflow: "hidden",
        marginRight: RFValue(10),
        width: RFValue(80),
    },
})

export default ItemComerce