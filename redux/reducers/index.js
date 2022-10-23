//import { combineReducers } from 'redux'
import loginScreenReducer from './LoginScreenReducer'
import detailScreenReducer from './DetailScreenReducer'

// const rootReducer = combineReducers({
//     loginScreen: loginScreenReducer,
//     userScreen: UserScreenReducer
// })

const rootReducer = {
    loginScreen : loginScreenReducer,
    bookData : detailScreenReducer,
}

export default rootReducer