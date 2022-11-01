import AsyncStorage from '@react-native-async-storage/async-storage'
import { APP_LOGIN, APP_LOGOUT } from '../reducers/LoginScreenReducer'

export const appLogin = (email,pass) => (
    {
        type: APP_LOGIN,
        email: email,
        pass: pass
    }
)

export const appLogout = () => (
    {
        type: APP_LOGOUT
    }
)




// export const storeEmail = (value) => (
//     async () => {
//         try {
//             await AsyncStorage.setItem.dispatch(appLogin(value))
//         } catch (error) {
//             console.log(error)
//         }
//     }
// )