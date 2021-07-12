import React from 'react'
import { 
    View,
    Image,
 } from 'react-native'

const FotoPerfil = (props) => {

    const { imgPerfil } = props

    return (
        <View style={{
            height: '85%',
            alignItems: "center",
            backgroundColor: 'black',
            borderRadius: 10,
            borderWidth: 1.5,
            borderColor: 'yellow',
            borderStyle: "dashed",
            padding: 15
        }}>
            <Image source={imgPerfil} style={{
                height: '100%',
                width: '100%',
                resizeMode: 'contain'
            }}/>
        </View>
    )
}

export default FotoPerfil