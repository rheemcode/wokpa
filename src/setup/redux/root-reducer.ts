"use client";

import { combineReducers } from 'redux';
import sidebarReducer from '@/redux/sidebar';
import authReducer from '@/redux/auth';
import playerReducer from '@/redux/player'

export const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    auth: authReducer,
    audioPlayer: playerReducer
});
export type RootState = ReturnType<typeof rootReducer>;