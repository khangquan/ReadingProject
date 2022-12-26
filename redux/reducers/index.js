import {combineReducers} from 'redux'
import loginScreenReducer from './LoginScreenReducer'
import getBookReducer from './GetBookReducer'
import accountReducer from './AccountReducer'

const rootReducer = combineReducers({
  loginScreen: loginScreenReducer,
  register: accountReducer,
  bookGetData: getBookReducer,
})

// const rootReducer = {
//     loginScreen : loginScreenReducer,
//     bookData : detailScreenReducer,
// }

export default rootReducer
