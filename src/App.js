import React, { useReducer, useEffect } from "react"

// Import Components
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import FlashMessage from "react-native-flash-message"

// Import functions and utils constanst
import { getStorage, reducer } from "./utils/constants"

// Import redux types and store
import store from "./store/index"
import { SETSTORAGE, DELETESTORAGE } from "./store/actionsTypes"

// Import views
import Login from "./views/Login/Login"
import Main from "./views/Main/Main"
import Wallet from "./views/Wallet/Wallet"
import Splash from "./components/Splash/Splash"
import { StatusBar } from "react-native"

// Import components
import Navbar from "./components/Navbar/Navbar"
import Loader from "./components/Loader/Loader"

const Stack = createStackNavigator()

const initialState = {
    loged: false,
    splash: true,
    loader: false,
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const ConfigurateComponent = async () => {
        const payload = await getStorage()


        // Comprueba si hay datos retornados en el payload
        if (Object.keys(payload).length > 0) {
            // Creamos el dispatch para el storage de redux
            await store.dispatch({
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
        await store.subscribe(async _ => {
            const { global } = store.getState()

            if (Object.keys(global).length > 0) {
                // Le decimos que el usuario esta logueado
                dispatch({ type: "loged", payload: true })

            } else {
                dispatch({ type: "loged", payload: false })
            }
        })

        await setTimeout(() => dispatch({ type: "splash", payload: false }), 1000)
    }

    useEffect(() => {
        console.disableYellowBox = true

        ConfigurateComponent()
    }, [])

    return (
        <>
            <StatusBar hidden={true} />

            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main" headerMode={null}>
                    {
                        state.loged
                            ? <Stack.Screen name="Main" component={Main} />
                            : <Stack.Screen name="Main" component={Login} />
                    }

                    <Stack.Screen name="Wallet" component={Wallet} />


                </Stack.Navigator>
            </NavigationContainer>

            {
                state.loged &&
                <Navbar />
            }

            <Splash isVisible={state.splash} />

            <FlashMessage position="top" />
        </>
    )
}
export default App