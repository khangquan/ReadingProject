import { combineReducers } from 'redux'
import loginScreenReducer from './LoginScreenReducer'
import getBookReducer from './GetBookReducer'

const rootReducer = combineReducers({
    loginScreen: loginScreenReducer,
    bookGetData: getBookReducer
})

// const rootReducer = {
//     loginScreen : loginScreenReducer,
//     bookData : detailScreenReducer,
// }

export default rootReducer