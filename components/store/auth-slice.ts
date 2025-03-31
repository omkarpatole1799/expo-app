import { createSlice } from '@reduxjs/toolkit';

interface AuthSliceInterface {
    isAuth: boolean;
    currentLoggedInProcessData: {
        p_form_filling_site: string;
    };
    currentLoggedinSlotData: {
        password: string;
        processUrl: string;
        role: string;
        slot: string;
        username: string;
    };
}

const initialState: AuthSliceInterface = {
    isAuth: false,
    currentLoggedInProcessData: {
        p_form_filling_site: '',
    },
    currentLoggedinSlotData: {
        password: '',
        processUrl: '',
        role: '',
        slot: '',
        username: '',
    },
};

const authSlice = createSlice({
    name: 'auth-slice',
    initialState,
    reducers: {
        setCurrentLoggedInProcessData: (state, action) => {
            state.currentLoggedInProcessData = action.payload.processData;
            state.currentLoggedinSlotData = action.payload.currentLoggedinSlotData;
        },

        resetAuthState: (state) => {
            state.isAuth = false;
            state.currentLoggedInProcessData.p_form_filling_site = '';
            state.currentLoggedinSlotData = initialState.currentLoggedinSlotData;
        },
    },
});

export const { setCurrentLoggedInProcessData, resetAuthState } = authSlice.actions;
export default authSlice;
