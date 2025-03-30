import { configureStore } from '@reduxjs/toolkit';
import candidateDataSlice from './candidate-data-slice';
import authSlice from './auth-slice';

const store = configureStore({
	reducer: {
		candidateData: candidateDataSlice.reducer,
        authSlice: authSlice.reducer
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
