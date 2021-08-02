export const SET_MESSAGE = 'MESSAGES/SET_MESSAGE';

export const set_message = message => {
    return {
        type: SET_MESSAGE,
        payload: {
            message,
        }
    }
}