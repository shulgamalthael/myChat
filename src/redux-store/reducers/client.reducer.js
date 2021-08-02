import { SET_CLIENT_DATA, SET_CURRENT_USER } from "../actions/client.actions";

const initialState = {
    clientData: [],
    loginnedUser: 'shulgamalthael',
    currentUser: 'shulgamalthael',
}

export const clientReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case SET_CLIENT_DATA:
            return {
                ...state,
                clientData: action.payload.clientData,
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload.currentUser,
            }
        default: return state;
    }
}