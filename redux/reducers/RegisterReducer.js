export const REGISTER = 'REGISTER'

const initialState = {
    userAccounts: [
        {
            fullname: 'Khang Quân',
            email: 'khangquan',
            pass: '123456',
        },
    ],
}

const registerReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTER:
            return {
                ...state, 
                userAccounts: [...state.userAccounts, action.payload]
            }
        default:
            return state
    }
}

export default registerReducer