import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const Store = initialState => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk))
  return store
}

// const store = configureStore ({
//     reducer: rootReducer
// })

export default Store
