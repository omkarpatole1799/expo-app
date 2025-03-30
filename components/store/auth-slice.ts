import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth-slice',
	initialState: {
		isAuth: false,
		currentLoggedInProcessData: {
			p_form_filling_site: null,
		},
		currentLoggedinSlotData: null,
	},
	reducers: {
		setIsLoggedIn: (state, action) => {},
		setCurrentLoggedInProcessData: (state, action) => {
			state.currentLoggedInProcessData = action.payload.processData;
			state.currentLoggedinSlotData = action.payload.currentLoggedinSlotData;
		},

		resetAuthState: (state) => {
			state.isAuth = false;
			state.currentLoggedInProcessData.p_form_filling_site = null;
			state.currentLoggedinSlotData = null;
		},
	},
});

export const { setIsLoggedIn, setCurrentLoggedInProcessData, resetAuthState } =
	authSlice.actions;
export default authSlice;
