import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native"

// Import navigation functions
import { useNavigation } from "@react-navigation/native"

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

const ExcutiveListCommerce = ({ data = {} }) => {
    const classes = useStyles(ListExcuteStyle)
    const { navigate } = useNavigation()

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

    const onRetirementEjecutive = () => {
        navigate("RetirementExcutive", data)
    }

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
                        <Text style={classes.title}>Lista de ganacias</Text>
                    </View>

                    <View style={classes.card}>
                        <View style={classes.headerTable}>
                            <View style={{ width: "35%" }}>
                                <Text style={classes.textHeaderTable}>
                                    Comercio
                                </Text>
                            </View>
                            <Text style={classes.textHeaderTable}>
                                Comisión
                            </Text>
                            <Text style={classes.textHeaderTable}>
                                Ganacias
                            </Text>
                        </View>
                        <FlatList
                            data={info}
                            keyExtractor={(_, key) => key.toString()}
                            renderItem={({ item }) => (
                                <View style={classes.bodyRowTable}>
                                    <View style={{ width: "30%" }}>
                                        <Text
                                            style={classes.textRowTableCompany}>
                                            {item.company}
                                        </Text>
                                    </View>
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
                    <View style={classes.rowButtons}>
                        <TouchableOpacity
                            style={[GlobalStyles.textButton, { flex: 1 }]}>
                            <Text style={classes.retirementText}>
                                Historial
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onRetirementEjecutive}
                            style={[
                                GlobalStyles.buttonPrimaryLine,
                                { flex: 1, marginLeft: 25 },
                            ]}>
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
