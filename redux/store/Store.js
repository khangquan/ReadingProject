//import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers'

// const Store = (initialState) => {
//     const store = createStore(rootReducer, initialState)
//     return store
// }

const store = configureStore ({
    reducer: rootReducer
})

export default store