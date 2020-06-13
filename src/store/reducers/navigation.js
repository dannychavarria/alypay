import { DELETENAVIGATION, SETNAVIGATION } from "../actionsTypes"

const INITIAL_STATE = {}

export const navigation = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETNAVIGATION: {
            return {
                ...state,
                ...action.payload
            }
        }
        case DELETENAVIGATION: {
            return INITIAL_STATE
        }

        default: {
            return state
        }
    }
}