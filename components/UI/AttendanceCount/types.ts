export interface CandidateAttendanceCountInterface {
    total_present_count: number;
    total_student_count: number;
}

export interface FetchAttendanceCountApiInterface {
    url: string;
    slot: number;
}

export interface ApiResponse<T> {
    status: number;
    success: boolean;
    data: T;
}

export interface AttendanceCountData {
    total_present_count: number;
    total_student_count: number;
}
