import React, { useState, useEffect } from "react"

// Import components
import Icon from "react-native-vector-icons/Entypo"
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons"
import { BlurView } from "@react-native-community/blur"
import { StyleSheet, View, Text, TouchableOpacity, Keyboard } from "react-native"

// Import functions and constanst
import { RFValue, Colors } from "../../utils/constants"

const sizeIcon = RFValue(32)

const Navbar = () => {
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        // Ocultamos el menu cuando el teclado se active
        const eventShowKeyboard = Keyboard.addListener("keyboardDidShow", () => setHidden(true))

        // Mostramos el menu cuando el teclado se oculte
        const eventHideKeyboard =Keyboard.addListener("keyboardDidHide", () => setHidden(false))


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
                        <TouchableOpacity style={styles.button}>
                            <Icon name="home" size={sizeIcon} color={Colors.colorYellow} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Icon name="user" size={sizeIcon} color={Colors.colorYellow} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Icon2 name="qrcode-scan" size={sizeIcon} color={Colors.colorYellow} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Icon name="menu" size={sizeIcon} color={Colors.colorYellow} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
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
    }
})

export default Navbar