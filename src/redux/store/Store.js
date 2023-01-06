import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['loginScreen']
};

const persistedReducer = persistReducer(persistConfig, rootReducer, applyMiddleware(thunk))

// const Store = initialState => {
//   const store = createStore( initialState, applyMiddleware(thunk), persistedReducer)
//   return store
// }

// export default Store

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
