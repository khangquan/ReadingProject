export const APP_LOGIN = 'APP_LOGIN'
export const APP_LOGOUT = 'APP_LOGOUT'

const initialState = {
    isLogin: false,
    fullname: '',
    email: '',
    password: '',
}

const loginScreenReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGIN:
            return {
                ...state,
                isLogin: true,
                fullname: action.fullname,
                email: action.email,
                password: action.pass
            }
        case APP_LOGOUT:
            return { ...state, isLogin: false, email: '' }
        default:
            return state
    }
}

export default loginScreenReducer