import { createSlice } from '@reduxjs/toolkit';

export const saveToken = createSlice({
    name: 'token',
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

export const { setToken, clearToken } = saveToken.actions;

export default saveToken.reducer;