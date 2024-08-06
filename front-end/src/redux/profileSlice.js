import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        signOut: (state) => {
            state.email = '';
            state.firstName = '';
            state.lastName = '';
            state.userName = '';
        }
    },
});

export const { setEmail, setFirstName, setLastName, setUserName, signOut } = profileSlice.actions;

export default profileSlice.reducer;