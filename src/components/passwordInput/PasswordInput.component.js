import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { GlobalStyles } from '../../utils/constants'

const PasswordInput = ({ value='', onChangeText }) => {

    const [showPassword, setShowPassword] = useState(false)

    const showPasswordInvert = _ => { setShowPassword(!showPassword) }

    return (
        <View style={{
            height: 70,
            width: '100%',
            justifyContent: 'space-between'
        }}>

            <Text style={{
                fontSize: 16,
                color: 'yellow'
                }}>Contraseña</Text>

            <View style={{
                height: '65%',
                width: '100%',
                justifyContent: 'center'
            }}>
                <TextInput
                    style={GlobalStyles.textInput}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder='Constraseña'
                    placeholderTextColor='gray'
                    secureTextEntry={!showPassword}
                />

                <TouchableOpacity style={{
                    position: 'absolute',
                    right: 0,
                    margin: 10,
                    alignItems: "flex-end",
                }}
                    onPress={showPasswordInvert}
                >
                    <MaterialIcons name={
                        showPassword
                            ? "visibility-off"
                            : "visibility"
                    }
                        size={30} color='gray' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PasswordInput