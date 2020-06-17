import { combineReducers } from "redux"

// imports reducers
import { global } from "./global"
import { navigation } from "./navigation"
import { permissions } from "./permissions"

const reducers = combineReducers({
    global,
    navigation,
    permissions,
})

export default reducers