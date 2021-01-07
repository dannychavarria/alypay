import React, { useState, useEffect } from "react"

// Import components
import Icon from "react-native-vector-icons/Ionicons"
import { BlurView } from "@react-native-community/blur"
import { StyleSheet, View, TouchableOpacity, Keyboard, Image, Platform, Alert } from "react-native"
import Search from '../Search/Search'

// Import functions and constanst
import { RFValue, Colors, logOutApp, OpenSupport } from "../../utils/constants"
import { useNavigation, StackActions } from "@react-navigation/native"
import { isIphoneX } from "react-native-iphone-x-helper"

const iconSize = RFValue(32)

const Navbar = () => {
    const [hidden, setHidden] = useState(false)
    const { dispatch, navigate } = useNavigation()

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

    const goToTop = () => {
        try {
            dispatch(StackActions.popToTop())
        } catch (error) {
            console.log(error)
        }
    }

    const logOut = async () => {
        try {
            await logOutApp()
        } catch (error) {
            console.log(error)
        }
    }

    /**
    * Funcion que envia a la vista de Buscaqueda
    */
    const onSearch = () => {
        navigate("Search")
    }

    useEffect(() => {
        // Ocultamos el menu cuando el teclado se active
        const eventShowKeyboard = Keyboard.addListener("keyboardDidShow", () => setHidden(true))

        // Mostramos el menu cuando el teclado se oculte
        const eventHideKeyboard = Keyboard.addListener("keyboardDidHide", () => setHidden(false))

        return () => {
            // Removemos los eventos cuando el componente se desmonte
            eventShowKeyboard.remove()
            eventHideKeyboard.remove()
        }
    }, [])

    if (!hidden) {
        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <BlurView
                        style={styles.absolute}
                        blurType="dark"
                    />

                    <View style={styles.containerButtons}>
                        <TouchableOpacity onPress={goToTop} style={styles.button}>
                            <Icon name="ios-home" size={iconSize} color={Colors.colorYellow} />
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={styles.button}>
                            {/* <Icon name="user" size={iconSize} color={Colors.colorYellow} /> */}
                        {/* <Image source={defaultImage} style={styles.imageProfile} />
                        </TouchableOpacity> * */}

                        <TouchableOpacity onPress={onSearch} style={styles.button}>
                            <Icon name="ios-search" size={iconSize} color={Colors.colorYellow} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={OpenSupport} style={styles.button}>
                            <Icon name="logo-whatsapp" size={iconSize} color={Colors.colorYellow} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleMenu} style={styles.button}>
                            <Icon name="ios-exit" size={iconSize} color={Colors.colorYellow} />
                        </TouchableOpacity>
                    </View>

                    {
                        (Platform.OS === "ios" && isIphoneX()) &&
                        <View style={{ height: 20 }} />
                    }
                </View>
            </View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.colorYellow,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        width: "100%",
        zIndex: 100,
    },

    absolute: {
        ...StyleSheet.absoluteFillObject
    },

    subContainer: {
        position: "relative",
        flex: 1,
    },

    containerButtons: {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },

    button: {
        justifyContent: "center",
        alignSelf: "center",
        flexDirection: "row",
        // backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: RFValue(5),
        flex: 1,
    },

    imageProfile: {
        borderRadius: iconSize * 2,
        resizeMode: "contain",
        width: iconSize,
        height: iconSize,
    },
})

export default Navbar