import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'
import thunk from "redux-thunk";
import { reduxTimeout } from 'redux-timeout';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk,reduxTimeout()))
const persistor = persistStore(store)

export {
	store, persistor
}