import React, { useReducer, useEffect } from "react"

// Import Components
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar, StyleSheet, Text } from "react-native"
import FlashMessage from "react-native-flash-message"
import Loader from "./components/Loader/Loader"
import Modal from "react-native-modal"
import Lottie from "lottie-react-native"

// Import functions and utils constanst
import { getStorage, reducer, RFValue, Colors } from "./utils/constants"
import ROUTES from "./utils/routes.config"
import NetInfo from "@react-native-community/netinfo"

// Import redux types and store
import store from "./store/index"
import { SETSTORAGE, DELETESTORAGE } from "./store/actionsTypes"

// Import views
import Login from "./views/Login/Login"
import Main from "./views/Main/Index"
import Splash from "./components/Splash/Splash"
import Register from "./views/Register/Register"
import Payment from "./components/Payment/Payment"
import Search from "./components/Search/Search"

// import assets and animation
import notConectionAnimation from "./animations/no-internet-connection.json"
import ButtonSupport from "./components/ButtonSupport/ButtonSupport.component"


const Stack = createStackNavigator()

const initialState = {
    loged: false,
    splash: true,
    loader: false,

    internet: true,
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const ConfigurateComponent = async () => {
        const payload = await getStorage()


        // disabled all yellow messagge
        console.disableYellowBox = true


        // Comprueba si hay datos retornados en el payload
        if (Object.keys(payload).length > 0) {
            // Creamos el dispatch para el storage de redux
            await store.dispatch({
                type: SETSTORAGE,
                payload,
            })

            // Le decimos que el usuario esta logueado
            dispatch({ type: "loged", payload: true })
        } else {
            dispatch({ type: "loged", payload: false })

            // Destruimos el sorage
            await store.dispatch({ type: DELETESTORAGE })
        }

        setTimeout(() => dispatch({ type: "splash", payload: false }), 1000)
    }

    useEffect(() => {
        // console.disableYellowBox = true

        // configure component
        ConfigurateComponent()

        // subscribe changes in store
        // Esperamos algun cambio en el store de redux
        store.subscribe(async _ => {
            const { global, loader } = store.getState()

            if (Object.keys(global).length > 0) {
                // Le decimos que el usuario esta logueado
                dispatch({ type: "loged", payload: true })

            } else {
                dispatch({ type: "loged", payload: false })
            }

            // set root loader component
            dispatch({ type: "loader", payload: loader })
        })


        // agregamos un escuchador de evento cuando cambie el estado del interne
        NetInfo.addEventListener(({ isConnected: payload }) => dispatch({ type: "internet", payload }))
    }, [])

    return (
        <>
            <StatusBar hidden={true} />

            <NavigationContainer>
                <Stack.Navigator initialRouteName={ROUTES.MAIN} headerMode={null}>
                    {
                        state.loged &&
                        <>
                            <Stack.Screen name={ROUTES.MAIN} component={Main} />
                            <Stack.Screen name={ROUTES.PAYMENT} component={Payment} />
                            <Stack.Screen name={ROUTES.SEARCH} component={Search} />
                        </>
                    }

                    {
                        !state.loged &&
                        <>
                            <Stack.Screen name={ROUTES.MAIN} component={Login} />
                            <Stack.Screen name={ROUTES.REGISTER} component={Register} />
                        </>
                    }
                </Stack.Navigator>
            </NavigationContainer>


            <Modal backdropOpacity={0.95} isVisible={!state.internet}>
                <Text style={styles.textInternet}>no estas conectado a internet</Text>

                <Lottie source={notConectionAnimation} resizeMode="cover" style={styles.conectionAnimation} loop autoPlay />
            </Modal>


            {
                !state.loged &&
                <ButtonSupport />
            }

            <Loader isVisible={state.loader} />

            <Splash isVisible={state.splash} />

            <FlashMessage position="top" />
        </>
    )
}

const styles = StyleSheet.create({
    conectionAnimation: {
        alignSelf: "center",
        width: RFValue(256),
    },

    textInternet: {
        alignSelf: "center",
        fontWeight: "bold",
        color: Colors.colorRed,
        textTransform: "uppercase",
    },
})

export default App
