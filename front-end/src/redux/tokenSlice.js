import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = '';
        }
    },
});

export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;