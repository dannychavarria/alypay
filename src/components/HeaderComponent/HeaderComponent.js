import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Modal } from 'react-native'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import { Colors, RFValue } from '../../utils/constants'

import useStyles from '../../hooks/useStyles.hook'
import HeaderComponentStyle from "../../Styles/Components/HeaderComponentStyle/HeaderComponentStyle"

import Icon from 'react-native-vector-icons/SimpleLineIcons'

import alypayLogo from "../../static/alypay.png"

const HeaderComponent = () => {

    const [showDropdown, setShowDropdown] = useState(false)

    const classes = useStyles(HeaderComponentStyle)


    return (
        <View style={classes.principalContainer}>

            <Image source={alypayLogo} style={classes.imageStyle} />

            <TouchableOpacity style={{ flexDirection: 'row-reverse', }}
                onPress={() => { setShowDropdown(true) }}
            >
                <Icon name='options-vertical' size={30} color={Colors.colorYellow} />
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
                        onPress={() => {
                            setShowDropdown(false)
                        }}>
                        <Text style={classes.textButtonStyle}>Soporte</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={classes.textButtonStyle}>Cerrar sesión</Text>
                    </TouchableOpacity>

                </View>
            </Modal>

        </View>
    )
}

export default HeaderComponent