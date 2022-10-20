//import { combineReducers } from 'redux'
import loginScreenReducer from './LoginScreenReducer'

// const rootReducer = combineReducers({
//     loginScreen: loginScreenReducer,
//     userScreen: UserScreenReducer
// })

const rootReducer = {
    loginScreen: loginScreenReducer,

}

export default rootReducer