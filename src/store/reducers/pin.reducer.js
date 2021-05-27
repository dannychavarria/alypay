import { PINAUTH, CLOSEAUTH, SHOWPIN, SETAFUNCTION } from "../actionsTypes"
import { http, getHeaders } from "../../utils/constants"


const INITIAL_STATE = {
    show: false,
    fn: () => {}
}

/**
 * { type, fn }
*/

export const pin = (state = INITIAL_STATE, action) => {
    switch (action.type) {      
        case SHOWPIN: {
            return { ...state, show: action.payload }
        }  

        case PINAUTH: {
            return state
        }

        case CLOSEAUTH: {
            return INITIAL_STATE
        }

        case SETAFUNCTION: {
            return {
                ...state,
                fn: action.payload
            }
        }

        default: {
            return state
        }
    }
}