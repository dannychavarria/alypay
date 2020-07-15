import React, { useState, useEffect, useRef } from "react"

// Import components
import * as Animatable from "react-native-animatable"
import Icon from "react-native-vector-icons/Entypo"
import { BlurView } from "@react-native-community/blur"
import { Animated, StyleSheet, View, TouchableOpacity, Keyboard, Easing } from "react-native"

// Import functions and constanst
import { RFValue, Colors, logOutApp } from "../../utils/constants"

// Import store from redux
import store from "../../store/index"

const TouchableAnimationOpacity = Animatable.createAnimatableComponent(TouchableOpacity)

const sizeIcon = RFValue(32)

const Navbar = () => {
    const { navigation } = store.getState()
    const [hidden, setHidden] = useState(false)
    const buttonRefAnimation = useRef(null)

    const toggleMenu = () => {
        logOut()
    }

    const goToTop = () => {
        // console.log(buttonRefAnimation)
        // buttonRefAnimation.current.fadeOutLeftBig()
        try {
            navigation.popToTop()
        } catch (error) {
            console.log(error)
        }
    }

    const logOut = async () => {
        try {
            await logOutApp()

            navigation.popToTop()
        } catch (error) {
            console.log(error)
        }
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
                        {/* <TouchableAnimationOpacity ref={buttonRefAnimation} onPress={navigation.goBack} style={styles.button}>
                            <Icon name="arrow-bold-left" size={sizeIcon} color={Colors.colorYellow} />
                        </TouchableAnimationOpacity> */}

                        <TouchableOpacity onPress={goToTop} style={styles.button}>
                            <Icon name="home" size={sizeIcon} color={Colors.colorYellow} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Icon name="user" size={sizeIcon} color={Colors.colorYellow} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleMenu} style={styles.button}>
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
    }
})

export default Navbar