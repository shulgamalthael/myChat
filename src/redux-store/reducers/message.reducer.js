import { SET_MESSAGE } from '../actions/message.actions.js';

export const messageReducer = ( state = '', action ) => {
    switch( action.type ) {
        case SET_MESSAGE:
            return state = action.payload.message;
        default: return state;
    }
}