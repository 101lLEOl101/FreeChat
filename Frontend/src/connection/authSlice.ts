import { createSlice } from '@reduxjs/toolkit';
import type {AuthState} from "./classes.ts";
import {GetMe, Login} from "./authThunk.ts";

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(Login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Login.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(Login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(GetMe.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export default authSlice.reducer;