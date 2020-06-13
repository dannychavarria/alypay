import React from "react"

// Import componentes
import { Text } from "react-native"

// Import store from redux
import Store from "../../store/index"

const Main = () => {
    const store = Store.getState()

    console.log(store)

    return (
        <Text>Inicio</Text>
    )
}

export default Main