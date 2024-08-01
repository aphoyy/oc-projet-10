import { configureStore } from '@reduxjs/toolkit';
import editProfile from './editProfile';
import saveToken from './saveToken';

export default configureStore({
    reducer: {
        profile: editProfile,
        token: saveToken,
    },
})