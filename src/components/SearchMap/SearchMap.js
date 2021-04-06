import React, { useState, useMemo } from "react"
import { View, TextInput, Text, FlatList, TouchableOpacity } from "react-native"

import useStyles from "../../hooks/useStyles.hook"
import { SearchMapStyle } from "../../Styles/Components/index"

const SearchMap = ({ data, setNewLongitude, setNewLatitude}) => {
    const [value, setValue] = useState('')
    const classes = useStyles(SearchMapStyle)

    const filteredList = useMemo(_ => {
        if (value.length > 0) {
            return data.filter(item => {
                const { name_commerce } = item
                return name_commerce.toLowerCase()
                    .includes(value.toLowerCase())
            })
        }
        return ''
    }, [value, data])


    const positionCommerce = (longitude, latitude) => {
        setNewLongitude(longitude)
        setNewLatitude(latitude)
    }

    // useEffect(() => {
    //     if (setValue.length > 0) {
    //         name_commerce.filter(item => {
    //             const { name_commerce } = item
    //             name_commerce.toLowerCase()
    //                 .includes(() => setValue.toLowerCase())
    //         })
    //     }
    //     return data
    // }, [setValue])

    return (
        <View style={classes.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                style={classes.textInput}
                placeholder="Ingrese nombre del local"
                placeholderTextColor="#ccc"
            />
            
            <FlatList
                data={filteredList.slice(0, 5)}
                renderItem={({ item }) => (
                    <TouchableOpacity style={classes.cardContainer}
                        onPress={()=>{positionCommerce(item.longitude, item.latitude)}}>
                        <Text>{item.name_commerce}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default SearchMap
