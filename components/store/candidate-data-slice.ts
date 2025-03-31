import { createSlice } from '@reduxjs/toolkit';

const candidateDataSlice = createSlice({
    name: 'candidate-data-slice',
    initialState: {
        qrData: null,
        candidateAllDetails: null,
    },
    reducers: {
        setQrData: (state, action) => {
            state.qrData = action.payload;
        },
        setCandidateAllData: (state, action) => {
            state.candidateAllDetails = action.payload;
        },
        resetCandidateDataState: (state) => {
            state.qrData = null;
            state.candidateAllDetails = null;
        },
    },
});

export const { setQrData, setCandidateAllData, resetCandidateDataState } =
    candidateDataSlice.actions;
export default candidateDataSlice;
