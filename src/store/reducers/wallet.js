import { SETWALLET } from "../actionsTypes"

const INITIAL_STATE = {}

export const wallet = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETWALLET: {
            return {
                ...state,
                ...action.payload
            }
        }
        
        default: {
            return state
        }
    }
}