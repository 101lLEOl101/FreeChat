import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./src/connection/Slices/authSlice.ts";
import chatReducer from "./src/connection/Slices/chatSlice.ts";
import messagesReducer from "./src/connection/Slices/MessagesSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        messages: messagesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;