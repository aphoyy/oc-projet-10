import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profileSlice';
import tokenSlice from './tokenSlice';

export default configureStore({
    reducer: {
        profile: profileSlice,
        auth: tokenSlice,
    },
})