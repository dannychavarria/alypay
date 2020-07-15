import { combineReducers } from "redux"

// imports reducers
import { global } from "./global"
import { navigation } from "./navigation"
import { permissions } from "./permissions"
import { loader } from "./loader"

const reducers = combineReducers({
    global,
    navigation,
    permissions,
    loader
})

export default reducers