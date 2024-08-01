import { createSlice } from '@reduxjs/toolkit';

export const editProfile = createSlice({
    name: 'profile',
    initialState: {
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
    },
    reducers: {
        editEmail: (state, action) => {
            state.email = action.payload;
        },
        editFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        editLastName: (state, action) => {
            state.lastName = action.payload;
        },
        editUserName: (state, action) => {
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

export const { editEmail, editFirstName, editLastName, editUserName, signOut } = editProfile.actions;

export default editProfile.reducer;