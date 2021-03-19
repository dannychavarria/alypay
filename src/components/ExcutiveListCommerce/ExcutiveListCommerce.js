import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'

// Import Constanst
import { errorMessage, loader, GlobalStyles } from '../../utils/constants'
import Floor from "lodash/floor"

// Import Components
import Container from '../Container/Container'
import Modal from 'react-native-modal'

// Import Styles
import { ListExcuteStyle } from '../../Styles/Components/index'

// Import Hooks
import useStyles from '../../hooks/useStyles.hook'

// Import Services
import { ListCommerceService } from '../../Services/index'

// Import Assets
import Commerce from '../../static/ecommerce-avatar.png'


const ExcutiveListCommerce = () => {
    const classes = useStyles(ListExcuteStyle)
    const [info, setInfo] = useState({})
    const [percentage, setPerecentage] = useState('')
    const [show, setShow] = useState(false)

    /**
     * Hacemos las peticion al server para optener la 
     * lista de los comercios referidos
     */
    const configureComponent = async () => {
        try {
            loader(true)
            const response = await ListCommerceService.get()
            setInfo(response.companies)
            setPerecentage(response.percentage)
        } catch (error) {
            errorMessage(error)
        } finally {
            loader(false)
        }
    }

    // Renderizamos las tarjetas de los comercios asociados
    const itemCommerce = ({ item }) => {

        const result = Floor(percentage * item.amount, 2)

        return (
            <TouchableOpacity style={classes.container}>
                <Image source={Commerce} style={classes.image} />

                <View style={classes.subContainerInfo}>
                    <View style={classes.cardInfo}>
                        <View style={classes.headerTableTitle}>
                            <Text style={classes.titleCard}>{item.company}</Text>
                        </View>

                        <View style={classes.row}>
                            <View style={classes.headerTable}>
                                <Text style={classes.titleCard}>Comisión</Text>
                                <Text style={classes.subTitle}>{percentage}%</Text>
                            </View>

                            <View style={classes.headerTable}>
                                <Text style={classes.titleCard}>Ganacias</Text>
                                <Text style={classes.subTitle}>{result} USDT</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    useEffect(() => {
        configureComponent()
    }, [])

    return (
        <Container showLogo >
            <View style={classes.containerTitle}>
                <Text style={classes.title}>Listado de comercios</Text>
            </View>
            <FlatList
                data={info}
                keyExtractor={(_, i) => i}
                renderItem={itemCommerce}
            />

            <View style={classes.containerButton}>
                <TouchableOpacity onPress={() => setShow(true)}  style={GlobalStyles.buttonPrimaryLine}>
                    <Text style={GlobalStyles.textButtonPrimaryLine}>Retirar</Text>
                </TouchableOpacity>
            </View>

            <Modal isVisible={show} onBackdropPress={() =>setShow(false)}>
                <View style={classes.containerModal}>

                </View>
            </Modal>
        </Container>
    )
}

export default ExcutiveListCommerce