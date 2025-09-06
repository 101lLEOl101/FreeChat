import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {GetMe} from "../Thunks.ts";
import type {ChatState, User} from "../classes.ts";

const initialState: ChatState = {
    user: null,
    loading: false,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetMe .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                GetMe.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    state.user = action.payload;
                }
            )
            .addCase(GetMe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка загрузки";
            });
    },
});

export default chatSlice.reducer;