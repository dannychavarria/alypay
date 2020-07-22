import React, { useEffect } from "react"

// Import Components
import { createStackNavigator } from "@react-navigation/stack"

// Import views
import Main from "./Main"
import Wallet from "../Wallet/Wallet"

// Import components
import Navbar from "../../components/Navbar/Navbar"
import Recharge from "../Recharge/Recharge"

// Import store from redux
import store from "../../store/index"
import { SETNAVIGATION } from "../../store/actionsTypes"

const Stack = createStackNavigator()

const App = ({ navigation }) => {
    useEffect(() => {
        store.dispatch({ type: SETNAVIGATION, payload: navigation })
    }, [])

    return (
        <>
            <Stack.Navigator initialRouteName="Logged" headerMode={null}>
                <Stack.Screen name="Logged" component={Main} />
                <Stack.Screen name="Recharge" component={Recharge} />
                <Stack.Screen name="Wallet" component={Wallet} />
            </Stack.Navigator>

            <Navbar />
        </>
    )
}
export default App