import { combineReducers } from "redux"

// imports reducers
import { global } from "./global"
import { wallet } from "./wallet"
import { navigation } from "./navigation"
import { permissions } from "./permissions"
import { loader } from "./loader"
import { functions } from "./functions.reducer"
import { pin } from "./pin.reducer"

const reducers = combineReducers({
    global,
    wallet,
    permissions,
    loader,
    navigation,
    functions,
    pin
})

export default reducers