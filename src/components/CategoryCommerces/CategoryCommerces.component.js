import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native'

import store from '../../store/index'
import { errorMessage, getHeaders, http } from '../../utils/constants'

import useStyles from '../../hooks/useStyles.hook'
import CategoryCommercesStyle from '../../Styles/Components/CategoryCommercesStyle/CategoryCommerces.style'

const CategoryCommerces = () => {

    const { navigation } = store.getState()

    const [ categoryList, setCategoryList ] = useState([{
        description: 'Todo',
        id: -1
    }])

    const styles = useStyles(CategoryCommercesStyle)

    const goFilterCommreces = item => {
        navigation.navigate('FilterCommerces', { filter: item })
    }

    const categories = async _ => {
        try {
            const { data: response } = await http.get('/ecommerce/company/commerce-filter-list',
                getHeaders())
            if (response.response === 'success') {
                setCategoryList([...categoryList, ...response.commerce_filters])
            } else {
                throw String('Las Categorias no pudieron ser cargadas')
            }
        } catch (error) {
            errorMessage(error.toString())
        }
    }

    useEffect(_ => {
        categories()
    }, [])

    return (
        <View style={styles.container}>

            <FlatList
                keyExtractor={item => `${item.id}`}
                data={categoryList}
                style={styles.flatListContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.items}
                        onPress={_ => { goFilterCommreces(item.description) }}
                    >
                        <Text style={styles.text}
                            numberOfLines={1}
                        >
                            {`${item.description}`}
                        </Text>
                    </TouchableOpacity>
                )}
                horizontal
            />

        </View>
    )
}

export default CategoryCommerces