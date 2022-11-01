import { combineReducers } from 'redux'
import loginScreenReducer from './LoginScreenReducer'
import getBookReducer from './GetBookReducer'
import createAccountReducer from './CreateAccountReducer'

const rootReducer = combineReducers({
    loginScreen: loginScreenReducer,
    newAccount: createAccountReducer,
    bookGetData: getBookReducer,
})

// const rootReducer = {
//     loginScreen : loginScreenReducer,
//     bookData : detailScreenReducer,
// }

export default rootReducer