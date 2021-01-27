import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'

// Import Components
import Container from '../../components/Container/Container'
import ItemComerce from '../../components/ItemComerce/ItemComerce'
import { http, getHeaders, errorMessage, loader } from '../../utils/constants'

// Import redux
import store from '../../store/index'
import { SETFUNCTION, SETSTORAGE } from "../../store/actionsTypes"

const ListComerce = () => {
    const [data, setData] = useState({})
    const { globalStorage } = store.getState()

    const configureComponent = async () => {
        try {

            loader(true)
            const { data } = await http.get('/wallets/commerces', getHeaders())

            if (data.error) {
                throw String(data.message)
            }
            setData(data)

            const dataStorage = {
                ...globalStorage,
                wallets: data
            }

            store.dispatch({ type: SETSTORAGE, payload: dataStorage })

        } catch (error) {
            errorMessage(error.toSting())
        } finally {
            loader(false)
        }
    }

    useEffect(() => {
        configureComponent()

        store.dispatch({
            type: SETFUNCTION, payload: {
                reloadWallets: configureComponent,
            }
        })
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