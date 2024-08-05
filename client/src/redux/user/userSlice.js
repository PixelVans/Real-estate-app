import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            signInStart: (state) => {
            state.loading = true;
        },
            signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
            signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            
            },
            updateUserStart: (state) => {
                state.loading = true;
            },
            updateUserSuccess: (state, action) => {
                state.currentUser = action.payload;
                state.loading = false;
                state.error = null;
            },
            updateUserFailure: (state, action) => {
                state.error = action.payload;
                state.loading = false;
            },
            deleteUserStart: (state) => {
                state.loading = true;
            },
            deleteUserSuccess: (state, action) => {
                state.currentUser = null;
                state.loading = false;
                state.error = null;
            },
            deleteUserFailure: (state, action) => {
                state.error = action.payload;
                state.loading = false;
            },
            signOutUserStart: (state) => {
                state.loading = true;
            },
            signOutUserSuccess: (state, action) => {
                state.currentUser = null;
                state.loading = false;
                state.error = null;
            },
            signOutUserFailure: (state, action) => {
                state.error = action.payload;
                state.loading = false;
            }
        }
        
    }
)

// Export actions
export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserFailure,
    deleteUserSuccess,
    signOutUserStart,
signOutUserSuccess,
signOutUserFailure,


} = userSlice.actions;

// Export reducer
export default userSlice.reducer;