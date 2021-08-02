import { getUserConversation } from "../../utils/ws";

export const SET_CLIENT_DATA = 'CLIENT/SET_CLIENT_DATA';
export const SET_CURRENT_USER = 'CLIENT/SET_CURRENT_USER';

export const set_client_data = clientData => {
    return {
        type: SET_CLIENT_DATA,
        payload: {
            clientData,
        }
    }
}

export const set_current_user = currentUser => {
    return {
        type: SET_CURRENT_USER,
        payload: {
            currentUser,
        }
    }
}

export const get_client_data = () => 
    dispatch => {
        getUserConversation().then( data => dispatch(set_client_data(data)) )
    }