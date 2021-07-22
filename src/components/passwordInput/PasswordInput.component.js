import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
                color: 'white'
                }}>Contraseña</Text>

            <View style={{
                height: '65%',
                width: '100%',
                justifyContent: 'center'
            }}>
                <TextInput
                    style={{
                        position: 'absolute',
                        left: 0,
                        height: 40,
                        width: '100%',
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingVertical: 0,
                        paddingHorizontal: 10,
                        color: 'white'
                    }}
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