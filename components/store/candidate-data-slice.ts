import { createSlice } from '@reduxjs/toolkit';

interface CandidateDataSliceInterface {
    qrData: {
        f_id: number;
        r_id: number;
        slot: number;
        roll_no: number;
    };
    candidateAllDetails: {
        ca: {
            id: number;
            ub_aadhar_number: string | null;
            ub_alternative_number: string;
            ub_email_id: string;
            ub_first_name: string;
            ub_last_name: string;
            ub_middle_name: string | null;
            ub_mobile_number: string;
            ub_otp: string | null;
            ub_pan_card: string | null;
            ub_password: string;
        };
        ht: {
            id: number;
            ca_reg_id: number;

            ca_photo: string;
            ca_sign: string;
            ca_approved_photo: string;
            ca_is_approved: string;

            ca_alloted_lab_id: number;
            exam_date: string;
            lab_name: string;
            department: string;
            ca_gender: string;
            ca_batch_time: string;
        };
        slot: {
            id: number;
            entry_time: string;
            gate_close_time: string;
            slot: string;
            time: string;
        };
    };
}

const initialState: CandidateDataSliceInterface = {
    qrData: {
        f_id: 0,
        r_id: 0,
        slot: 0,
        roll_no: 0,
    },
    candidateAllDetails: {
        ca: {
            id: 0,
            ub_aadhar_number: '',
            ub_alternative_number: '',
            ub_email_id: '',
            ub_first_name: '',
            ub_last_name: '',
            ub_middle_name: '',
            ub_mobile_number: '',
            ub_otp: '',
            ub_pan_card: '',
            ub_password: '',
        },
        ht: {
            id: 0,
            ca_reg_id: 0,

            ca_photo: '',
            ca_sign: '',
            ca_approved_photo: '',
            ca_is_approved: '',

            ca_alloted_lab_id: 0,
            exam_date: '',
            lab_name: '',
            department: '',
            ca_gender: '',
            ca_batch_time: '',
        },
        slot: {
            id: 0,
            entry_time: '',
            gate_close_time: '',
            slot: '',
            time: '',
        },
    },
};
const candidateDataSlice = createSlice({
    name: 'candidate-data-slice',
    initialState,
    reducers: {
        setQrData: (state, action) => {
            state.qrData = action.payload;
        },
        setCandidateAllData: (state, action) => {
            state.candidateAllDetails = action.payload;
        },
        resetCandidateDataState: (state) => {
            state.qrData = initialState.qrData;
            state.candidateAllDetails = initialState.candidateAllDetails;
        },
    },
});

export const { setQrData, setCandidateAllData, resetCandidateDataState } =
    candidateDataSlice.actions;
export default candidateDataSlice;
