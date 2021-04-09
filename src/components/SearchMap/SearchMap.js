import React, { useState, useMemo } from "react"
import { View, TextInput, Text, FlatList, TouchableOpacity } from "react-native"

import useStyles from "../../hooks/useStyles.hook"
import { SearchMapStyle } from "../../Styles/Components/index"

const SearchMap = ({ data, setNewLongitude, setNewLatitude}) => {
    const [value, setValue] = useState('')
    const classes = useStyles(SearchMapStyle)
    //Funcion de filtro para el buscador 
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

    //Seteo de la nueva longitud y latitud a la que se dirigira
    const positionCommerce = (longitude, latitude) => {
        setNewLongitude(longitude)
        setNewLatitude(latitude)
        setValue('')//Para que se quite el flatlist al momento de tocar algun elemento de este
    }

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
