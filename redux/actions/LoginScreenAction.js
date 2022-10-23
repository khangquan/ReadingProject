import { APP_LOGIN, APP_LOGOUT } from '../reducers/LoginScreenReducer'

export const appLogin = email => dispatch => {
    dispatch({
        type: APP_LOGIN,
        payload: email
    })
}

export const appLogout = () => (
    {
        type: APP_LOGOUT
    }
)
