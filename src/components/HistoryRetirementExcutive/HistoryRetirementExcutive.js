import React, { useEffect, useState } from "react"
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native"

// Imoport Components
import moment from "moment"

// Import Styles
import { HistoryExcutiveStyles } from "../../Styles/Components/index"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"

//Import Services
import HistoryRetirement from "../../Services/HistoryRetirementExcutive"

// Import Constanst
import { errorMessage, loader } from "../../utils/constants"

// Import Assets
import logo from "../../static/alypay.png"

import { useNavigation } from "@react-navigation/native"

const HistoryRetirementExcutive = () => {
    const classes = useStyles(HistoryExcutiveStyles)
    const [info, setInfo] = useState([])
    const { navigate } = useNavigation()

    const configurateComponent = async () => {
        try {
            loader(true)
            const response = await HistoryRetirement()

            setInfo(response)
        } catch (error) {
            errorMessage(error)
        } finally {
            loader(false)
        }
    }

    const onDetails = (value) => {
        navigate("Description", { hash: value })
    }

    useEffect(() => {
        configurateComponent()
    }, [])

    return (
        <View style={classes.main}>
            <Image source={logo} style={classes.logo} />

            <View style={classes.containerTitle}>
                <Text style={classes.title}>Historial de retiros</Text>
            </View>

            <View style={classes.card}>
                <View style={classes.headerTable}>
                    <Text style={classes.textHeaderTable}>#</Text>
                    <Text style={classes.textHeaderTable}>Hash</Text>
                    <Text style={classes.textHeaderTable}>Fecha</Text>
                    <Text style={classes.textHeaderTable}>Monto</Text>
                </View>

                <FlatList
                    data={info}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => onDetails(item.hash)}
                        >
                            <View style={classes.bodyRowTable}>
                                <Text style={classes.textRowTable}>
                                    {item.id_transaction}
                                </Text>
                                <Text style={classes.textRowTable}>
                                    {item.hash}
                                </Text>
                                <Text style={classes.textRowTable}>
                                    {moment(item.date_create).format(
                                        "MMM. D, YYYY",
                                    )}
                                </Text>
                                <Text style={classes.textRowTable}>
                                    {item.amount_usd} {item.coin_fee}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

export default HistoryRetirementExcutive
