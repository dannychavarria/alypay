import React, { useState } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    Switch
} from 'react-native'

const MiniCardWallet = () => {
    const [isActive, setActive] = useState(true)
    return (
        <View style={{
            width: '100%',
            backgroundColor: 'black',
            height: 45,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
            paddingHorizontal: 10
        }}>

            <View style={{
                height: '100%',
                width: '40%',
                flexDirection: 'row',
                alignItems: 'center',
            }}>

                <Image source={undefined} style={{
                    height: 45,
                    width: 45,
                    resizeMode: 'contain',
                    borderRadius: 50,
                    marginRight: 10,
                }} />

                <Text style={{
                    flex: 1,
                    color: 'yellow',
                    fontSize: 20,
                }}
                    numberOfLines={1}
                >Moneda</Text>

            </View>

            <View style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 16
                }}
                    numberOfLines={1}
                >1000$</Text>
            </View>

            <View style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isActive ? "#f5dd4b" : "red"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={_ => setActive(!isActive)}
                    value={isActive}
                />
            </View>

        </View>
    )
}

export default MiniCardWallet