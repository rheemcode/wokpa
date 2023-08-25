"use client";

import { UserModel } from "@/models/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";


interface AuthState {
    token: string;
    user: UserModel | null;
    userType: "user" | "agent"
}

const initialState: AuthState = {
    token: "",
    user: null,
    userType: "user"
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuth: () => {
            return initialState;
        },
        setUserType: (state, action: PayloadAction<"user" | "agent">) => {
            state.userType = action.payload;
        },
        authLogin: (state, action: PayloadAction<{ token: string, user: UserModel }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        updateUser: (state, action: PayloadAction<{ user: UserModel }>) => {
            state.user = action.payload.user;
        },
        authLogout: () => {
            return initialState
        },
    },
});

export const { resetAuth, authLogin, authLogout, setUserType, updateUser } = authSlice.actions;
export default authSlice.reducer; 