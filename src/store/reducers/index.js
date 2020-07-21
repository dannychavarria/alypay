import { combineReducers } from "redux"

// imports reducers
import { global } from "./global"
import { wallet } from "./wallet"
import { navigation } from "./navigation"
import { permissions } from "./permissions"
import { loader } from "./loader"

const reducers = combineReducers({
    global,
    wallet,
    permissions,
    loader,
    navigation
})

export default reducers