import { combineReducers } from "redux"

// imports reducers
import { global } from "./global"
import { navigation } from "./navigation"

const reducers = combineReducers({
    global,
    navigation,
})

export default reducers