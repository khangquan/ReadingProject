export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'

const initialState = {
    fullname: '',
    email: '',
    password: '',
}

const createAccountReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_ACCOUNT:
            return {...state, isLogin: true, fullname: action.fullname, email: action.email, password: action.pass}
        default:
            return state
    }
}

export default createAccountReducer