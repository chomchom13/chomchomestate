import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice' // changed the name to userReducer

export const store = configureStore({
  reducer: {user: userReducer }, // made userReducer ( userSlice ) in userSlice.js
  middleware: (getDefaultMiddleware) => // Make sure to add this to prevent errors
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})