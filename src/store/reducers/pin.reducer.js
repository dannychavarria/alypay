import { SHOWPIN } from "../actionsTypes"



const INITIAL_STATE = {
    show: false,
}

export const pin = (state = INITIAL_STATE, action) => {
    switch (action.type) {      
        case SHOWPIN: {
            return { ...state, show: action.payload }
        }  

        default: {
            return state
        }
    }
}