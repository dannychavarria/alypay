import React, { useState, useEffect } from "react"
import { View, TextInput, Text, FlatList, TouchableOpacity } from "react-native"

import useStyles from "../../hooks/useStyles.hook"
import { SearchMapStyle } from "../../Styles/Components/index"

import Icon from "react-native-vector-icons/Feather"

import { GlobalStyles } from "../../utils/constants"

const SearchMap = ({
    data,
    setNewLongitude,
    setNewLatitude,
    click,
    setClick,
    changeTap
}) => {
    const [value, setValue] = useState("")
    const [list, setList] = useState([])
    const classes = useStyles(SearchMapStyle)

    //Funcion de filtro para el buscador
    const filteredList = () => {
        if (value.length > 0) {
            setList(
                data.filter(item => {
                    const { name_commerce } = item
                    return name_commerce
                        .toLowerCase()
                        .includes(value.toLowerCase()) 
                }),
            )
        }
        return ""
    }

    useEffect(() => {
        value != list ? setList([]) : ""
    }, [value])

    //Seteo de la nueva longitud y latitud a la que se dirigira
    const positionCommerce = (longitude, latitude) => {

        //Se busca el comercio que selecciono mediante comparar la latitud y longitud
        let commerce = data.find(item=> item.latitude === latitude && item.longitude === longitude)
        //Se obtiene el indice del comercio en el arreglo principal
        let index = data.indexOf(commerce)

        setNewLongitude(longitude)
        setNewLatitude(latitude)
        setValue("") //Para que se quite el flatlist al momento de tocar algun elemento de este
        setList([])
        setClick(!click)
        //Se envia el index del comercio seleccionado
        changeTap(index)
    }

    return (
        <View style={classes.container}>
            <View style={classes.containerPicker}>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    style={classes.textInput}
                    placeholder="Ingrese nombre del local"
                    placeholderTextColor="#ccc"
                    returnKeyType="search"
                    onSubmitEditing={filteredList}
                />

                <TouchableOpacity onPress={filteredList}>
                    <Icon name="search" color="gray" size={20} />
                </TouchableOpacity>
            </View>

            <FlatList
                keyExtractor={(_, i) => (i = i)}
                data={list}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={classes.cardContainer}
                        onPress={() => {
                            positionCommerce(item.longitude, item.latitude)
                        }}>
                        <Text style={classes.textWhite}>
                            {item.name_commerce}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default SearchMap
