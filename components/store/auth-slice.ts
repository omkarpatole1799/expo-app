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
    attendanceCount: {
        total_present_count: number;
        total_student_count: number;
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
    attendanceCount: {
        total_present_count: 0,
        total_student_count: 0,
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

        setAttendanceCount: (state, action) => {
            state.attendanceCount = action.payload;
        },

        resetAuthState: (state) => {
            state.isAuth = false;
            state.currentLoggedInProcessData = initialState.currentLoggedInProcessData;
            state.currentLoggedinSlotData = initialState.currentLoggedinSlotData;
            state.attendanceCount = initialState.attendanceCount;
        },
    },
});

export const { setCurrentLoggedInProcessData, resetAuthState, setAttendanceCount } =
    authSlice.actions;
export default authSlice;
