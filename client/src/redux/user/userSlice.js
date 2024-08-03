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
            
        },}
        
    }
)

// Export actions
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

// Export reducer
export default userSlice.reducer;