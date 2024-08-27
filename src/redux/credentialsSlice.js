import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: null,
    isCaptain: null,
    email: null,
    id: null,
    signedIn: false
};

const credentialsSlice = createSlice({
    name: 'credentials',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userName = action.payload.userName;
            state.isCaptain = action.payload.isCaptain;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.signedIn = true;
        },
        logout: (state) => {
            state.userName = null;
            state.isCaptain = null;
            state.email = null;
            state.id = null;
            state.signedIn = false;
        },
    },
});

export const { login, logout } = credentialsSlice.actions;
export default credentialsSlice.reducer;
