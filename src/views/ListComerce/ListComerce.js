import React, { useState, useEffect, useReducer } from "react"
import { FlatList, View, Text, Image } from "react-native"

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

// Import Styles
import { ListCommerceStyles } from "../../Styles/Views/index"

// Import Hooks
import useStyles from "../../hooks/useStyles.hook"

// Import Assets
import logo from "../../static/alypay.png"
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
    const classes = useStyles(ListCommerceStyles)

    const [data, setData] = useState([])
    const { globalStorage } = store.getState()

    // Params passed from router
    const { params } = route

    const [stateView, setStateView] = useState(TYPE_VIEW.COMMERCE)

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

    console.log(params.wallet_type)

    return (
        <View style={classes.main}>
            <Image source={logo} style={classes.logo} />

<<<<<<< Updated upstream
            {params.id !== -1
                ?
                <ExcutiveListCommerce data={params} />
                :
                (params.id === -1 && params.wallet_type === 2)
                    ?
                    <>
                        <View style={classes.containerTitle}>
                            <Text style={classes.title}>Listado de comercios</Text>
                        </View>
                        <View style={classes.contenList}>
                            <FlatList
                                data={data}
                                keyExtractor={(_, i) => i}
                                renderItem={item => <ItemComerce data={item} />}
                            />
                        </View>
                    </>
                    :
                    (params.id === -1 && params.wallet_type === 3)
                        ?
                        <>
                            <Switch
                                onSwitch={setStateView}
                                items={switchItems}
                                indexActive={state.indexTabActive}
                            />
                            {stateView === TYPE_VIEW.COMMERCE && (
                                <>
                                    <View style={classes.containerTitle}>
                                        <Text style={classes.title}>Listado de comercios</Text>
                                    </View>
                                    <View style={classes.contenList}>
                                        <FlatList
                                            data={data}
                                            keyExtractor={(_, i) => i}
                                            renderItem={item => <ItemComerce data={item} />}
                                        />
                                    </View>
                                </>
                            )}

                            {stateView === TYPE_VIEW.EXCUTIVE_LIST && (
                                <>
                                    <ExcutiveListCommerce data={params} />
                                </>
                            )}
                        </>
                        : ''
            }

=======
            <Switch
                onSwitch={setStateView}
                items={switchItems}
                indexActive={state.indexTabActive}
            />
            {stateView === TYPE_VIEW.COMMERCE && (
                <>
                    <View style={classes.containerTitle}>
                        <Text style={classes.title}>Listado de comercios</Text>
                    </View>
                    <View style={classes.contenList}>
                        <FlatList
                            data={data}
                            keyExtractor={(_, i) => i}
                            renderItem={item => <ItemComerce data={item} />}
                        />
                    </View>
                </>
            )}

            {stateView === TYPE_VIEW.EXCUTIVE_LIST && (
                <>
                    <ExcutiveListCommerce data={params} />
                </>
            )}
>>>>>>> Stashed changes
        </View>
    )
}

{/* <>
    <View style={classes.containerTitle}>
        <Text style={classes.title}>Listado de comercios</Text>
    </View>
    <View style={classes.contenList}>
        <FlatList
            data={data}
            keyExtractor={(_, i) => i}
            renderItem={item => <ItemComerce data={item} />}
        />
    </View>
</>
}{<Switch
    onSwitch={setStateView}
    items={switchItems}
    indexActive={state.indexTabActive}
/>
{stateView === TYPE_VIEW.COMMERCE && (
<>
    <View style={classes.containerTitle}>
        <Text style={classes.title}>Listado de comercios</Text>
    </View>
    <View style={classes.contenList}>
        <FlatList
            data={data}
            keyExtractor={(_, i) => i}
            renderItem={item => <ItemComerce data={item} />}
        />
    </View>
</> 
)}

{stateView === TYPE_VIEW.EXCUTIVE_LIST && (
<>
    <ExcutiveListCommerce data={params} />
</>
)}} */}

export default ListComerce
