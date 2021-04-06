import React, { useEffect } from "react"

// Import Components
import { createStackNavigator } from "@react-navigation/stack"

// Import views
import Main from "./Main"
import Wallet from "../Wallet/Wallet"
import WalletCommerce from '../WalletCommerce/WalletCommerce'
import Recharge from "../Recharge/Recharge"
import Retirement from "../Retirement/Retirement"
import RetirementCommerce from '../RetirementCommerce/RetirementCommerce'

// Import components
import Navbar from "../../components/Navbar/Navbar"
import Maps from '../../components/MapsCommerce/MapsCommerce'

// Import store from redux
import store from "../../store/index"
import { SETNAVIGATION } from "../../store/actionsTypes"
import ROUTES from "../../utils/routes.config"

const Stack = createStackNavigator()

const App = ({ navigation }) => {
    useEffect(() => {
        store.dispatch({ type: SETNAVIGATION, payload: navigation })
    }, [])

    return (
        <>
            <Stack.Navigator initialRouteName={ROUTES.LOGGEDMAIN} headerMode={null}>
                <Stack.Screen name={ROUTES.LOGGEDMAIN} component={Main} />
                <Stack.Screen name={ROUTES.RECHARGE} component={Recharge} />
                <Stack.Screen name={ROUTES.WALLET} component={Wallet} />
                <Stack.Screen name={ROUTES.WALLETCOMMERCE} component={WalletCommerce} />
                <Stack.Screen name={ROUTES.RETIREMENT} component={Retirement} />
                <Stack.Screen name={ROUTES.RETIREMENTCOMMERCE} component={RetirementCommerce} />
            </Stack.Navigator>

            <Navbar />
        </>
    )
}
export default App