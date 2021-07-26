import React from 'react'
import {
    View,
    FlatList,
    TouchableOpacity,
    Text
} from 'react-native'

const ButtonListHorizontal = _ => {
    return (
        <View style={{
            flexDirection: 'row',
            height: 100,
            width: '90%',
            backgroundColor: 'blue'
        }}>

            <FlatList
                horizontal
                data={[1, 2, 3, 4, 5, 6, 7, 8 ]}
                renderItem={_ => <View style={{
                    width: 200,
                    backgroundColor: 'red',
                    margin: 10
                }}>

                </View>}
            />

        </View>
    )
}

export default ButtonListHorizontal