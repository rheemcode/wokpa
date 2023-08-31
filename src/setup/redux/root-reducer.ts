"use client";

import { combineReducers } from 'redux';
import sidebarReducer from '@/redux/sidebar';
import authReducer from '@/redux/auth';
import playerReducer from '@/redux/player'
import podcastsReducer from '@/redux/podcast'


export const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    auth: authReducer,
    audioPlayer: playerReducer,
    podcasts: podcastsReducer
});
export type RootState = ReturnType<typeof rootReducer>;