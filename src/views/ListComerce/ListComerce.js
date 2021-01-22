import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'

// Import Components
import Container from '../../components/Container/Container'
import ItemComerce from '../../components/ItemComerce/ItemComerce'
import { http, getHeaders, errorMessage } from '../../utils/constants'

const ListComerce = () => {
    const [data, setData] = useState({})


    const configureComponent = async () => {
        try {

            const { data } = await http.get('/wallets/commerces', getHeaders())

            if (data.error) {
                throw String(data.message)
            }

            setData(data)

        } catch (error) {
            errorMessage(error.toSting())
        }
    }

    useEffect(() => {
        configureComponent()
    }, [])

    return (
        <Container showLogo onRefreshEnd={configureComponent}>
            <FlatList
                data={data}
                keyExtractor={(_, i) => i}
                renderItem={(item) => <ItemComerce data={item} />}
            />
        </Container>
    )
}

export default ListComerce