import { DELETEPERMISSIONS, SETPERMISSIONS } from "../actionsTypes"

const INITIAL_STATE = {
    camera: false
}

export const permissions = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETPERMISSIONS: {
            return {
                ...state,
                ...action.payload
            }
        }
        case DELETEPERMISSIONS: {
            return INITIAL_STATE
        }

        default: {
            return INITIAL_STATE
        }
    }
}