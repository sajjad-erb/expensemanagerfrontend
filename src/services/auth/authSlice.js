import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        client: null,
        uid: null,
    },
    reducers: {
        setCredentials(state, action) {
            state.token = action.payload.accessToken;
            state.client = action.payload.client;
            state.uid = action.payload.uid;
        },

        logOut(state) {
            state.token = null;
            state.client = null;
            state.uid = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;