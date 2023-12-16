import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: ( state ) => { // the same we did in SignIn page -> handleSubmit function
            state.loading = true;
        },
        signInSuccess: ( state , action ) => {
            state.currentUser = action.payload; // action is the data that we get from the database after sign in success
            state.loading = false; 
            state.error = null;
        },
        signInFailure: ( state, action ) => {
            state.error = action.payload; 
            state.loading = false;
        }
    }
});

export const {signInFailure, signInStart, signInSuccess} = userSlice.actions;

export default userSlice.reducer; // default means if we import this in future in any other files like store.js, we can name the import whatever we want and the content will be the same