export const REGISTER = 'REGISTER'

const initialState = {
    userAccounts: [],
    loggedInUser: null
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