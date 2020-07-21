import React from "react"

// Import Components
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

// Import views
import Main from "./Main"
import Wallet from "../Wallet/Wallet"

// Import components
import Navbar from "../../components/Navbar/Navbar"
import Recharge from "../Recharge/Recharge"

const Stack = createStackNavigator()

const App = () => {
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