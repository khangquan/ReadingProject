import { combineReducers } from 'redux'
import loginScreenReducer from './LoginScreenReducer'
import getBookReducer from './GetBookReducer'
import registerReducer from './RegisterReducer'

const rootReducer = combineReducers({
    loginScreen: loginScreenReducer,
    register: registerReducer,
    bookGetData: getBookReducer,
})

// const rootReducer = {
//     loginScreen : loginScreenReducer,
//     bookData : detailScreenReducer,
// }

export default rootReducer