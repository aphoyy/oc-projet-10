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
    },
});

export const { editEmail, editFirstName, editLastName, editUserName } = editProfile.actions;

export default editProfile.reducer;