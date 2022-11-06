import AsyncStorage from '@react-native-async-storage/async-storage'
import { APP_LOGIN, APP_LOGOUT } from '../reducers/LoginScreenReducer'

export const appLogin = (fullname, email, pass) => (
    {
        type: APP_LOGIN,
        fullname: fullname,
        email: email,
        pass: pass
    }
)

export const appLogout = () => (
    {
        type: APP_LOGOUT
    }
)

