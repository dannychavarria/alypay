import { DELETESTORAGE, SETSTORAGE } from "../actionsTypes"

const INITIAL_STATE = {}

export const global = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETSTORAGE: {
            return {
                ...state,
                ...action.payload
            }
        }
        case DELETESTORAGE: {
            return INITIAL_STATE
        }

        default: {
            return state
        }
    }
}