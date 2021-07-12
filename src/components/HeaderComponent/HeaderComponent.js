import React, { useState } from "react"
import { View, Image, Text, TouchableOpacity, Alert } from "react-native"

import { Colors, RFValue, OpenSupport, logOutApp } from "../../utils/constants"

// Import Component
import Modal from "react-native-modal"
import Lottie from "lottie-react-native"

import useStyles from "../../hooks/useStyles.hook"
import HeaderComponentStyle from "../../Styles/Components/HeaderComponentStyle/HeaderComponentStyle"

// Import Assets
import more from "../../static/more.png"

// Import Animation
import whatsapp from "../../animations/whatsapp.json"
import exit from "../../animations/logOut.json"

import SimpleIcons from "react-native-vector-icons/SimpleLineIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons"

import alypayLogo from "../../static/alypay.png"

const HeaderComponent = () => {
    const [showDropdown, setShowDropdown] = useState(false)

    const classes = useStyles(HeaderComponentStyle)

    // funcion de pregunta de cierre de sesion
    const toggleMenu = () => {
        Alert.alert(
            "Cerrar sesion",
            "Estas apunto de cerrar sesion en AlyPay",
            [
                {
                    text: "Cancelar",
                    onPress: () => { },
                },
                {
                    text: "Cerrar Sesion",
                    onPress: logOut,
                },
            ],
        )
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
        <>
            <View style={classes.container}>
                <Image source={alypayLogo} style={classes.logo} />

                <TouchableOpacity
                    style={classes.buttonMore}
                    onPress={_ => setShowDropdown(true)}>
                    <Image source={more} style={classes.imageMore} />
                </TouchableOpacity>
            </View>

            <Modal
                animationOut="fadeOutDown"
                backdropOpacity={0}
                style={{ justifyContent: "flex-start", alignItems: "flex-end" }}
                isVisible={showDropdown}
                onBackButtonPress={_ => setShowDropdown(false)}
                onBackdropPress={_ => setShowDropdown(false)}>
                <View style={classes.containerModal}>
                    <TouchableOpacity
                        style={classes.selectionMenu}
                        onPress={OpenSupport}>
                        <FontAwesome
                            name="whatsapp"
                            size={RFValue(25)}
                            color={Colors.colorYellow}
                        />
                        <Text style={classes.textSelection}>Soporte </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={classes.selectionMenu}
                        onPress={toggleMenu}>
                        <MaterialIcons
                            name="logout"
                            size={RFValue(25)}
                            color={Colors.colorYellow}
                        />
                        <Text style={classes.textSelection}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
        // <View style={classes.principalContainer}>
        //     <Image source={alypayLogo} style={classes.imageStyle} />

        //     <TouchableOpacity
        //         onPress={() => {
        //             setShowDropdown(true)
        //         }}>
        //         <SimpleIcons
        //             name="options-vertical"
        //             size={RFValue(30)}
        //             color={Colors.colorYellow}
        //         />
        //     </TouchableOpacity>

        //     <Modal
        //         visible={showDropdown}
        //         onRequestClose={() => {
        //             setShowDropdown(false)
        //         }}
        //         transparent={true}>
        //         <TouchableWithoutFeedback
        //             onPress={() => {
        //                 setShowDropdown(false)
        //             }}
        //             onLongPress={() => {
        //                 setShowDropdown(false)
        //             }}>
        //             <View style={classes.modalOut} />
        //         </TouchableWithoutFeedback>

        //         <View style={classes.modalStyle}>
        //             <TouchableOpacity
        //                 style={{ flexDirection: "row", alignItems: "center" }}
        //                 onPress={OpenSupport}>
        //                 <FontAwesome
        //                     name="whatsapp"
        //                     size={RFValue(25)}
        //                     color={Colors.colorYellow}
        //                 />
        //                 <Text style={classes.textButtonStyle}>Soporte</Text>
        //             </TouchableOpacity>

        //             <TouchableOpacity
        //                 style={{ flexDirection: "row", alignItems: "center" }}
        //                 onPress={toggleMenu}>
        //                 <MaterialIcons
        //                     name="logout"
        //                     size={RFValue(25)}
        //                     color={Colors.colorYellow}
        //                 />
        //                 <Text style={classes.textButtonStyle}>
        //                     Cerrar sesión
        //                 </Text>
        //             </TouchableOpacity>
        //         </View>
        //     </Modal>
    )
}

export default HeaderComponent
