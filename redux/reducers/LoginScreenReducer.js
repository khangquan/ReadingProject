export const APP_LOGIN = 'APP_LOGIN'
export const APP_LOGOUT = 'APP_LOGOUT'

const initialState = {
    isLogin: false,
    email: '',
}

const loginScreenReducer = (state = initialState, action) => {
    switch(action.type){
        case APP_LOGIN:
            return {...state, isLogin: true, email: action.payload}
        case APP_LOGOUT:
            return {...state, isLogin: false}
        default:
            return state
    }
}

export default loginScreenReducer