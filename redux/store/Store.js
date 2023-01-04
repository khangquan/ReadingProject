import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const Store = initialState => {
//   const store = createStore(rootReducer, initialState, applyMiddleware(thunk), pReducer)
//   return store
// }

// const store = configureStore ({
//     reducer: rootReducer
// })

// export default Store

export const store = createStore(persistedReducer,applyMiddleware(thunk),);
export const persistor = persistStore(store);
