import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Modal } from 'react-native'
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native'

import { Colors, RFValue, OpenSupport, logOutApp } from '../../utils/constants'

import useStyles from '../../hooks/useStyles.hook'
import HeaderComponentStyle from "../../Styles/Components/HeaderComponentStyle/HeaderComponentStyle"

import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons"

import alypayLogo from "../../static/alypay.png"

const HeaderComponent = () => {

    const [showDropdown, setShowDropdown] = useState(false)

    const classes = useStyles(HeaderComponentStyle)

    // funcion de pregunta de cierre de sesion
    const toggleMenu = () => {
        Alert.alert("Cerrar sesion", "Estas apunto de cerrar sesion en AlyPay", [
            {
                text: "Cancelar",
                onPress: () => { },
            },
            {
                text: "Cerrar Sesion",
                onPress: logOut
            }
        ])
    }

    // cierre de sesion
    const logOut = async () => {
        try {
            await logOutApp()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View style={classes.principalContainer}>

            <Image source={alypayLogo} style={classes.imageStyle} />

            <TouchableOpacity style={{ flexDirection: 'row-reverse', }}
                onPress={() => { setShowDropdown(true) }}
            >
                <SimpleIcons name='options-vertical' size={30} color={Colors.colorYellow} />
            </TouchableOpacity>

            <Modal
                visible={showDropdown}
                onRequestClose={() => { setShowDropdown(false) }}
                transparent={true}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        setShowDropdown(false)
                    }}
                    onLongPress={() => {
                        setShowDropdown(false)
                    }}
                >
                    <View style={classes.modalOut} />
                </TouchableWithoutFeedback>

                <View style={classes.modalStyle}>

                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={OpenSupport}>
                        <FontAwesome name="whatsapp" size={23} color={Colors.colorYellow} />
                        <Text style={classes.textButtonStyle}>Soporte</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center'}}
                        onPress={toggleMenu}
                    >
                        <MaterialIcons name="logout" size={20} color={Colors.colorYellow} />
                        <Text style={classes.textButtonStyle}>Cerrar sesión</Text>
                    </TouchableOpacity>

                </View>
            </Modal>

        </View>
    )
}

export default HeaderComponent