import React, { useState, useCallback, useEffect } from "react"

// Import Components
import { StyleSheet, TouchableOpacity, Text, View } from "react-native"

// Import Constanst
import { Colors, RFValue } from "../../utils/constants"

// import redux store
import store from "../../store/index"
import { SETFUNCTION } from "../../store/actionsTypes"

/**
 * Componente de switch wallet/sell
 *
 * @param {Function} onChange
 * @param {Array} items
 * @param {Number} indexActive
 */
const Switch = ({ onSwitch = () => {}, items = [], indexActive = 0 }) => {
    console.log("Items", onSwitch, items)
    const [state, setState] = useState(items[0].state)

    // Esperamos que el estado cambie para saber cuando el usuario cambia de estado
    const changeState = useCallback(() => onSwitch(state), [state])

    /**Constante que define el ancho de cada item */
    const itemWidth = 100 / items.length

    // Esperamos que se actualice el estado para ejecutar el callback
    useEffect(() => {
        changeState()

        const { functions } = store.getState()

        store.dispatch({
            type: SETFUNCTION,
            payload: {
                ...functions,
                resetTab: () => setState(items[0].state),
            },
        })
    }, [state])

    useEffect(() => {
        console.log("change indexActive")
        setState(items[indexActive].state)
    }, [indexActive])

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            borderColor: Colors.colorYellow,
            borderWidth: 1,
            borderRadius: RFValue(50),
            padding: RFValue(2),
            margin: RFValue(20),
            flexDirection: "row",
            justifyContent: "space-between",
        },

        buttons: {
            alignItems: "center",
            padding: RFValue(10),
            borderRadius: RFValue(50),
            width: `${itemWidth}%`,
        },

        buttonActive: {
            backgroundColor: Colors.colorYellow,
        },

        textButton: {
            fontSize: RFValue(itemWidth / 3),
            textTransform: "uppercase",
        },

        textButtonActive: {
            color: Colors.colorMain,
        },

        buttonDisactive: {
            backgroundColor: "transparent",
        },

        textButtonDisactive: {
            color: Colors.colorYellow,
        },
    })

    const ItemComponent = (item, key) => {
        return (
            <TouchableOpacity
                onPress={_ => setState(item.state)}
                key={key}
                style={[
                    state === item.state
                        ? styles.buttonActive
                        : styles.buttonDisactive,
                    styles.buttons,
                ]}>
                <Text
                    style={[
                        state === item.state
                            ? styles.textButtonActive
                            : styles.textButtonDisactive,
                        styles.textButton,
                    ]}>
                    {item.text}
                </Text>
            </TouchableOpacity>
        )
    }

    return <View style={styles.container}>{items.map(ItemComponent)}</View>
}

export default Switch
