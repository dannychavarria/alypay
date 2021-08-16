import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput } from 'react-native'

import Container from '../../components/Container/Container'
import { GlobalStyles, RFValue, Colors } from '../../utils/constants'

import Feather from 'react-native-vector-icons/Feather'
import CardCommerce from '../../components/CardCommerce/CardCommerce.component'
import FilterCommercesServices from '../../Services/SerFilterCommerces/FilterCommerces.services'

const FilterCommerces = (props) => {

    const { filter } = props.route.params

    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    useEffect(_ => {
        FilterCommercesServices({ type: 'country' })
    }, [])

    return (
        <Container showLogo>

            <View style={[GlobalStyles.textInput, {
                alignItems: "center",
                flexDirection: "row",
                width: '95%',
                alignSelf: 'center',
                padding: RFValue(5)
            }]}>
                <TextInput
                    style={{
                        borderColor: Colors.colorSecondary + "55",
                        padding: 8,
                        flex: 1,
                        color: 'white',
                    }}
                    placeholder='Nombre del local... Categoria... País...'
                    placeholderTextColor='gray'
                />

                <Feather name='search' color='gray' size={RFValue(20)} />
            </View>

            <View style={{
                marginVertical: RFValue(10),
                height: RFValue(25),
                width: '90%',
                borderBottomWidth: 0.5,
                borderColor: 'yellow',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'center'
            }}>

                <View style={{
                    width: '45%',
                    flexDirection: 'row',
                }}>
                    <Text style={{ color: 'white' }}>Categoria:  </Text>
                    <Text style={{ color: 'yellow', flex: 1 }}
                        numberOfLines={1}
                    >{filter}</Text>

                    <Feather name='chevron-down' color='yellow' size={20} />

                </View>

                <View style={{
                    width: '45%',
                    flexDirection: 'row',
                }}>
                    <Text style={{ color: 'white' }}>Pais:  </Text>
                    <Text style={{ color: 'yellow', flex: 1 }}
                        numberOfLines={1}
                    >Nicaragua</Text>

                    <Feather name='chevron-down' color='yellow' size={20} />

                </View>

            </View>


            {
                array.map((item) => (
                    <CardCommerce key={item} />
                ))
            }

        </Container>
    )
}

export default FilterCommerces