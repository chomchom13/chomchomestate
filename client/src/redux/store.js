import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice' // changed the name to userReducer
import{ persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({ user: userReducer }) // if we make more reducers in future , we can combine them here // made userReducer ( userSlice ) in userSlice.js
//  It combines multiple reducers into a single reducer. In this case, it combines the userReducer into the user slice of the state.

const persistConfig = {
    key: 'root',
    storage,
    version: 1 ,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // persistReducer is used to wrap the root reducer with the configuration for persistence.

export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) => // Make sure to add this to prevent errors
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store);