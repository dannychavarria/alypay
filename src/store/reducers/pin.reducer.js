import { PINAUTH, CLOSEAUTH, SHOWPIN } from "../actionsTypes"
import { http, getHeaders } from "../../utils/constants"


const INITIAL_STATE = {
    show: false
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
            const { data: response } = await http.get(`/pin/${action.pin}`, getHeaders())            
            
            if (response.error) {
                showMessage({})
            } else {
                // verificamos si existe la funcion para ejecutarla
                action?.fn()
            }

            return { ...state, show: false }
        }
        case CLOSEAUTH: {
            return INITIAL_STATE
        }

        default: {
            return state
        }
    }
}