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
    },
});

export const { setToken } = saveToken.actions;

export default saveToken.reducer;