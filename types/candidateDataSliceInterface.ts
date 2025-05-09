export interface CandidateDataSliceInterface {
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
        s3BucketUrl: string;
    };
}
