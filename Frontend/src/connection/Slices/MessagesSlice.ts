import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {GetMessagesInChat} from "../Thunks.ts";
import type {MessagesState, MessageType} from "../classes.ts";

const initialState: MessagesState = {
    messages: null,
    loading: false,
    error: null,
};

const MessagesSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetMessagesInChat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                GetMessagesInChat.fulfilled,
                (state, action: PayloadAction<MessageType[]>) => {
                    state.loading = false;
                    state.messages = action.payload;
                }
            )
            .addCase(GetMessagesInChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка загрузки";
            });
    },
});

export default MessagesSlice.reducer;