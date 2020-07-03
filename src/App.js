import React, { useReducer, useEffect } from "react"

// Import Components
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import FlashMessage from "react-native-flash-message"

// Import functions and utils constanst
import { getStorage, reducer, serverAdress } from "./utils/constants"

// Apollo config
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

// Import redux types and store
import store from "./store/index"
import { SETSTORAGE, DELETESTORAGE } from "./store/actionsTypes"

// Import views
import Login from "./views/Login/Login"
import Main from "./views/Main/Main"
import Wallet from "./views/Wallet/Wallet"
import Splash from "./components/Splash/Splash"
import { StatusBar } from "react-native"

const Stack = createStackNavigator()

const initialState = {
    loged: false,
    splash: true
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const ConfigurateComponent = async () => {
        const payload = await getStorage()

        // Comprueba si hay datos retornados en el payload
        if (Object.keys(payload).length > 0) {

            // Creamos el dispatch para el storage de redux
            await reduxStore.dispatch({
                type: SETSTORAGE,
                payload
            })

            // Le decimos que el usuario esta logueado
            dispatch({ type: "loged", payload: true })

        } else {
            dispatch({ type: "loged", payload: false })

            // Destruimos el sorage
            await store.dispatch({ type: DELETESTORAGE })
        }

        // Esperamos algun cambio en el store de redux
        store.subscribe(async _ => {
            const { global } = store.getState()

            await dispatch({ type: "splash", payload: true })

            if (Object.keys(global).length > 0) {
                // Le decimos que el usuario esta logueado
                dispatch({ type: "loged", payload: true })

            } else {
                dispatch({ type: "loged", payload: false })
            }

            setTimeout(() => dispatch({ type: "splash", payload: false }), 1000)
        })


        setTimeout(() => dispatch({ type: "splash", payload: false }), 1000)
    }

    /**endpont playgorund client */
    const Client = new ApolloClient({
        uri: serverAdress.PLAYGROUND,
        cache: new InMemoryCache()
    })

    useEffect(() => {
        console.disableYellowBox = true
        ConfigurateComponent()
    }, [])

    return (
        <>
            <StatusBar hidden={true} />

            <ApolloProvider client={Client}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Main" headerMode={null} screenOptions={{}}>
                        {
                            state.loged
                                ? <Stack.Screen name="Main" component={Main} />
                                : <Stack.Screen name="Main" component={Login} />
                        }

                        <Stack.Screen name="Wallet" component={Wallet} />


                    </Stack.Navigator>
                </NavigationContainer>
            </ApolloProvider>

            <Splash isVisible={state.splash} />

            <FlashMessage position="top" />
        </>
    )
}
export default App