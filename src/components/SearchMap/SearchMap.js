import React, { useState, useEffect } from "react"
import { View, TextInput, Text, FlatList, TouchableOpacity } from "react-native"

import useStyles from "../../hooks/useStyles.hook"
import { SearchMapStyle } from "../../Styles/Components/index"

import Icon from 'react-native-vector-icons/Feather'

import { GlobalStyles } from "../../utils/constants"

const SearchMap = ({ data, setNewLongitude, setNewLatitude }) => {
    const [value, setValue] = useState('')
    const [list, setList] = useState([])
    const classes = useStyles(SearchMapStyle)

    //Funcion de filtro para el buscador 
    const filteredList = () => {
        if (value.length > 0) {
            setList(
                data.filter(item => {
                    const { name_commerce } = item
                    return name_commerce.toLowerCase()
                        .includes(value.toLowerCase())
                })
            )
        }
        return ''
    }

    useEffect(() => {
        value === '' ? setList([]) : ''
    }, [value])


    //Seteo de la nueva longitud y latitud a la que se dirigira
    const positionCommerce = (longitude, latitude) => {
        setNewLongitude(longitude)
        setNewLatitude(latitude)
        setValue('')//Para que se quite el flatlist al momento de tocar algun elemento de este
        setList([])
    }

    console.log(data)

    return (
        <View style={classes.container}>

            <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, classes.textInput]}>

                <TextInput
                    value={value}
                    onChangeText={setValue}
                    style={classes.textInputCol}
                    placeholder="Ingrese nombre del local"
                    placeholderTextColor="#ccc"
                />

                <TouchableOpacity
                    onPress={filteredList}>
                    <Icon name='search' color='gray' size={20} />
                </TouchableOpacity>

            </View>

            <FlatList
                keyExtractor={(_, i) => i = i}
                data={list}
                renderItem={({ item }) => (
                    <TouchableOpacity style={classes.cardContainer}
                        onPress={() => { positionCommerce(item.longitude, item.latitude) }}>
                        <Text>{item.name_commerce}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default SearchMap
