import { createSlice } from '@reduxjs/toolkit';

interface AuthSliceInterface {
    isAuth: boolean;
    currentLoggedInProcessData: {
        p_form_filling_site: string;
    };
    currentLoggedinSlotData: {
        id: number;
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
        // This is current logged in user details (i.e. slot)
        id: 0,
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
            console.log(action.payload, '-actionpayload');
            state.currentLoggedInProcessData = action.payload.processData;
            state.currentLoggedinSlotData = action.payload.currentLoggedinSlotData;
        },

        resetAuthState: (state) => {
            state.isAuth = false;
            state.currentLoggedInProcessData = initialState.currentLoggedInProcessData;
            state.currentLoggedinSlotData = initialState.currentLoggedinSlotData;
        },
    },
});

export const { setCurrentLoggedInProcessData, resetAuthState } = authSlice.actions;
export default authSlice;
