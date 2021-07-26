import React, { useState } from "react"
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"

import { GlobalStyles, RFValue, Colors } from "../../utils/constants"

const PasswordInput = ({ value = "", onChangeText }) => {
    const [showPassword, setShowPassword] = useState(false)

    const showPasswordInvert = _ => {
        setShowPassword(!showPassword)
    }

    return (
        <View style={styles.rowForm}>
            <Text style={styles.legend}>Contraseña</Text>

            <View style={[styles.textInputWithImage, GlobalStyles.textInput, { elevation: 0 }]}>
                <TextInput
                    style={styles.textInputCol}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder="Constraseña"
                    placeholderTextColor="#CCC"
                    secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                    style={styles.touchableCol}
                    onPress={showPasswordInvert}>
                    <MaterialIcons
                        name={showPassword ? "visibility-off" : "visibility"}
                        size={20}
                        color={Colors.colorYellow}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rowForm: {
        height: RFValue(60),
        width: "100%",
        marginVertical: RFValue(10),
        flexDirection: "column",
    },

    textInputWithImage: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textInputCol: {
        flex: 0.9,
        // paddingLeft: 5,
        padding: 0,
        color: "white",
    },
    touchableCol: {
        flex: 0.1,
        alignItems: "flex-end",
    },
    legend: {
        color: Colors.colorYellow,
        fontSize: RFValue(16),
        marginBottom: RFValue(2.5),
    },
})

export default PasswordInput
