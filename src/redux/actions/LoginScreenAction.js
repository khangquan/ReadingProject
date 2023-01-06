import AsyncStorage from '@react-native-async-storage/async-storage'
import { APP_LOGIN, APP_LOGOUT } from "../../defines/ActionTypes"

export const appLogin = param => ({
  type: APP_LOGIN,
  payload: param,
})

export const appLogout = () => ({
  type: APP_LOGOUT,
})
