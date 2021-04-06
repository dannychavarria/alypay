import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native"

// Import Constanst
import { errorMessage, loader, GlobalStyles } from "../../utils/constants"
import Floor from "lodash/floor"

// Import Components
import Container from "../Container/Container"
import Lottie from "lottie-react-native"
import Loader from "../Loader/Loader"

// Import Styles
import { ListExcuteStyle } from "../../Styles/Components/index"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"

// Import Services
import { ListCommerceService } from "../../Services/index"

// Import Assetss
import Commerce from "../../static/ecommerce-avatar.png"
import empty from "../../animations/empty.json"

const ExcutiveListCommerce = ({ navigation }) => {
    const classes = useStyles(ListExcuteStyle)

    // Estado que guarda la informacion de los comercios afiliados al ejecutivo
    const [info, setInfo] = useState({})

    // Estado que guarda el poncentaje de ganacia de los comercios afiliados al ejecutivo
    const [percentage, setPerecentage] = useState("")
    const [loader, setLoader] = useState(false)

    /**
     * Hacemos las peticion al server para optener la
     * lista de los comercios referidos
     */
    const configureComponent = async () => {
        try {
            setLoader(true)

            const response = await ListCommerceService.get()

            setInfo(response.companies)
            setPerecentage(response.percentage)
        } catch (error) {
            errorMessage(error)
        } finally {
            setLoader(false)
        }
    }

    /*  // Renderizamos las tarjetas de los comercios asociados
    const itemCommerce = ({ item }) => {
        const result = Floor(percentage * item.amount, 2)

        return (
            <View style={classes.container}>
                <Image source={Commerce} style={classes.image} />

                <View style={classes.subContainerInfo}>
                    <View style={classes.cardInfo}>
                        <View style={classes.headerTableTitle}>
                            <Text style={classes.titleCard}>
                                {item.company}
                            </Text>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.headerTable}>
                                <Text style={classes.titleCard}>Comisión</Text>
                                <Text style={classes.subTitle}>
                                    {percentage}%
                                </Text>
                            </View>

                            <View style={classes.headerTable}>
                                <Text style={classes.titleCard}>Ganacias</Text>
                                <Text style={classes.subTitle}>
                                    {result} USDT
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
 */
    const foundData = Object.keys(info).length > 0 && !loader

    useEffect(() => {
        configureComponent()
    }, [])

    return (
        <View style={classes.main}>
            <Loader isVisible={loader} />
            {foundData && (
                <>
                    <View style={classes.containerTitle}>
                        <Text style={classes.title}>Listado de comercios</Text>
                    </View>

                    <View style={classes.card}>
                        <View style={classes.headerTable}>
                            <Text style={classes.textHeaderTable}>
                                Comercio
                            </Text>
                            <Text style={classes.textHeaderTable}>
                                Comisión
                            </Text>
                            <Text style={classes.textHeaderTable}>
                                Ganacias(Tether)
                            </Text>
                        </View>
                        <FlatList
                            data={info}
                            keyExtractor={(_, key) => key.toString()}
                            renderItem={({ item }) => (
                                <View style={classes.bodyRowTable}>
                                    <Text style={classes.textRowTableCompany}>
                                        {item.company}
                                    </Text>
                                    <Text style={classes.textRowTable}>
                                        {percentage}
                                    </Text>
                                    <Text style={classes.textRowTable}>
                                        {Floor(percentage * item.amount, 2)}{" "}
                                        USDT
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                    <View style={classes.containerButton}>
                        <TouchableOpacity
                            style={GlobalStyles.buttonPrimaryLine}>
                            <Text style={GlobalStyles.textButtonPrimaryLine}>
                                Retirar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {!foundData && (
                <>
                    <View style={classes.containerError}>
                        <Lottie
                            source={empty}
                            style={classes.empty}
                            loop={false}
                            autoPlay
                        />
                        <Text style={classes.title}>
                            Sin comisiones para mostrar
                        </Text>
                    </View>
                </>
            )}
        </View>
    )
}

export default ExcutiveListCommerce
