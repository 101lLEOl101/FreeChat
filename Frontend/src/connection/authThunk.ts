import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "http://localhost:8000/api";

export const Login = createAsyncThunk(
    'auth/login',
    async (credentials: { login: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                base_url + "/auth/login",
                credentials,
                { withCredentials: true }
            );
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Error Login');
        }
    }
);

export const GetMe = createAsyncThunk(
    'me',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                base_url + "/me",
                { withCredentials: true }
            );
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Error With Getting Profile');
        }
    }
);

export const Logout = createAsyncThunk(
    '/auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                base_url + "/auth/logout",
                { withCredentials: true }
            );
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Error With Getting Profile');
        }
    }
);