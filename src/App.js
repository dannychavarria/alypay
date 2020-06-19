import React from 'react'
import { View, Text } from 'react-native'

// Import Components
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import FlashMessage from "react-native-flash-message"

// Import views
import Login from './views/Login/Login'
import Main from './views/Main/Main'
import Wallet from './views/Wallet/Wallet'

const Stack = createStackNavigator()

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" headerMode={null} screenOptions={{}}>

          <Stack.Screen name="StartComponent" component={Login} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Wallet" component={Wallet} />


        </Stack.Navigator>
      </NavigationContainer>

      <FlashMessage position="top" />
    </>
  )
}
export default App