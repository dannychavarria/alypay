import React, { useState, useEffect, useReducer } from "react"
import { FlatList } from "react-native"

// Import Components
import Container from "../../components/Container/Container"
import ItemComerce from "../../components/ItemComerce/ItemComerce"
import Switch from "../../components/Switch/Switch"
import ExcutiveListCommerce from "../../components/ExcutiveListCommerce/ExcutiveListCommerce"
import {
    http,
    getHeaders,
    errorMessage,
    loader,
    reducer,
} from "../../utils/constants"

// Import redux
import store from "../../store/index"
import { SETFUNCTION, SETSTORAGE } from "../../store/actionsTypes"

/**
 * Constante que almacena el tipo de vista seleccionada del switch
 * Types: `wallet` or `pay`
 */
const TYPE_VIEW = {
    COMMERCE: "wallet",
    EXCUTIVE_LIST: "pay",
}

/**
 * Constante que almacena los datos a mostrar en el switch
 */
const switchItems = [
    {
        text: "Comercios",
        state: TYPE_VIEW.COMMERCE,
    },
    {
        text: "Ejecutivo",
        state: TYPE_VIEW.EXCUTIVE_LIST,
    },
]

const initialState = {
    wallets: [],
    indexTabActive: 0,
}

const ListComerce = ({ route }) => {
    const [data, setData] = useState({})
    const { globalStorage } = store.getState()
    // Params passed from router
    const { params } = route

    console.log("Params", params)

    const [stateView, setStateView] = useState(TYPE_VIEW.WALLET)

    const [state, dispatch] = useReducer(reducer, initialState)

    const configureComponent = async () => {
        try {
            loader(true)
            const { data } = await http.get("/wallets/commerces", getHeaders())

            if (data.error) {
                throw String(data.message)
            }
            setData(data)

            const dataStorage = {
                ...globalStorage,
                wallets: data,
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
            type: SETFUNCTION,
            payload: {
                reloadWallets: configureComponent,
            },
        })
    }, [])

    return (
        <Container showLogo onRefreshEnd={configureComponent}>
            <Switch
                onSwitch={setStateView}
                items={switchItems}
                indexActive={state.indexTabActive}
            />
            {stateView === TYPE_VIEW.COMMERCE && (
                <FlatList
                    data={data}
                    keyExtractor={(_, i) => i}
                    renderItem={item => <ItemComerce data={item} />}
                />
            )}

            {stateView === TYPE_VIEW.EXCUTIVE_LIST && (
                <>
                    <ExcutiveListCommerce />
                </>
            )}
        </Container>
    )
}

export default ListComerce
