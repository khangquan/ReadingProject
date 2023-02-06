import { APP_LOGIN, APP_LOGOUT, IS_LOGGING } from "../../defines/ActionTypes"

const initialState = {
  isLogging: false,
  isLogin: false,
  currentUser: '',
}

const loginScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGGING:
      return {
        ...state,
        isLogging: true,
      }
    case APP_LOGIN:
      return {
        ...state,
        isLogging: false,
        isLogin: true,
        currentUser: action.payload,
      }
    case APP_LOGOUT:
      return {
        ...state,
        isLogging: false,
        isLogin: false,
      }
    default:
      return state
  }
}

export default loginScreenReducer
