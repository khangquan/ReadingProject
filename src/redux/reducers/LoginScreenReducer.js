import { APP_LOGIN, APP_LOGOUT } from "../../defines/ActionTypes"

const initialState = {
  isLogin: false,
  currentUser: '',
}

const loginScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_LOGIN:
      return {
        ...state,
        isLogin: true,
        currentUser: action.payload,
      }
    case APP_LOGOUT:
      return {
        ...state,
        isLogin: false,
      }
    default:
      return state
  }
}

export default loginScreenReducer
