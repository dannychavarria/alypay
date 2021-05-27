import React, { useState, useCallback, useEffect } from "react"

// Import Components
import { StyleSheet, TouchableOpacity, Text, View } from "react-native"

// Import Constanst
import { Colors, RFValue } from "../../utils/constants"

/**
 * Componente de switch wallet/sell
 *
 * @param {Function} onChange
 * @param {Array} items
 * @param {Number} indexActive
 */
const SwitchCoin = ({ onSwitch = () => {}, items = {} }) => {
    const [coins, setCoins] = useState([])
    const [state, setState] = useState({})
    const [indexActive, setIndexActive] = useState(0)

    // Esperamos que el estado cambie para saber cuando el usuario cambia de estado
    const changeState = useCallback(() => onSwitch(state), [state])

    /**Constante que define el ancho de cada item */
    const [itemWidth, setItemWidth] = useState(0)

    useEffect(() => {
        if (items.ALY !== null) {
            let _coins = Object.entries(items)
                .map(item => item[1])
                .filter(item => item.symbol !== "USDT")
            setCoins(_coins)
            setState(_coins[0])
            setItemWidth(100 / _coins.length)
        }
    }, [items])

    // Esperamos que se actualice el estado para ejecutar el callback
    useEffect(() => changeState(), [state])

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
            fontSize: RFValue(itemWidth / 2),
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
                disabled={!item.credit}
                onPress={_ => {
                    setIndexActive(key)
                    setState(item)
                }}
                key={key}
                style={[
                    indexActive === key
                        ? styles.buttonActive
                        : styles.buttonDisactive,
                    styles.buttons,
                ]}>
                <Text
                    style={[
                        indexActive === key
                            ? styles.textButtonActive
                            : styles.textButtonDisactive,
                        styles.textButton,
                        {
                            opacity: item.credit ? 1 : 0.3,
                        },
                    ]}>
                    {item.symbol}
                </Text>
            </TouchableOpacity>
        )
    }

    return <View style={styles.container}>{coins.map(ItemComponent)}</View>
}

export default SwitchCoin
