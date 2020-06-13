import React from 'react'
import { View, Text } from 'react-native'

// Import Components
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Import views
import Login from './views/Login/Login'
import Main from './views/Main/Main'

const Stack = createStackNavigator()

const App = () => {
  return (
    <>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" headerMode={null} screenOptions={{}}>
          
        <Stack.Screen name="StartComponent" component={Login} />
        <Stack.Screen name="Main" component={Main} />
          

        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
export default App
