import { SETLOADER } from "../actionsTypes"

const INITIAL_STATE = false

export const loader = (state = INITIAL_STATE, action) => {
    if (action.type === SETLOADER) {
        return action.payload
    } else {
        return state
    }
}