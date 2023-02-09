import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const Store = initialState => {
//   const store = createStore( initialState, applyMiddleware(thunk), persistedReducer)
//   return store
// }

// export default Store

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
