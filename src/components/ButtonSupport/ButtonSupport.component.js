import React, { useEffect, useState } from "react"

// import components
import { TouchableOpacity, StyleSheet, Keyboard } from "react-native"
import Lottie from "lottie-react-native"

// import constants and functions
import { RFValue, OpenSupport } from "../../utils/constants"

// import assets 
import whatsAnimation from "../../animations/whatsapp.json"

const ButtonSupport = () => {
    const [hidden, setHidden] = useState(false)

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

    return (
        <>
            {
                !hidden &&
                <TouchableOpacity onPress={OpenSupport} style={styles.button}>
                    <Lottie source={whatsAnimation} style={styles.animation} autoPlay loop={false} />
                </TouchableOpacity>
            }
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: "0%",
        right: "0%",
    },

    animation: {
        width: RFValue(128)
    }
})

export default ButtonSupport