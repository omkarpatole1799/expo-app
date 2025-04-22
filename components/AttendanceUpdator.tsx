import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAttendanceCount } from './store/auth-slice';
import { RootState } from './store/store';
import { fetchAttendanceCount } from './UI/AttendanceCount/api';
import { ATTENDANCE_COUNT_REFRESH_TIME } from '@/constants/values';

const AttendanceUpdator = () => {
    const dispatch = useDispatch();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const currentSlotData = useSelector(
        (state: RootState) => state.authSlice.currentLoggedinSlotData
    );
    const formFillingSite = useSelector(
        (state: RootState) => state.authSlice.currentLoggedInProcessData.p_form_filling_site
    );

    async function fetchAndSetAttendanceCount(url: string, slot: number) {
        const data = await fetchAttendanceCount(url, slot);
        dispatch(
            setAttendanceCount(
                data?.data[0] || {
                    total_present_count: 0,
                    total_student_count: 0,
                }
            )
        );
    }

    useEffect(() => {
        const url = formFillingSite;
        const slot = currentSlotData?.slot;

        if (!url || !slot) return;

        if (intervalRef.current) {
            clearInterval(intervalRef.current); // Clear any existing interval
        }

        // Initial fetch
        fetchAndSetAttendanceCount(url, Number(slot));

        // Set new interval
        intervalRef.current = setInterval(() => {
            fetchAndSetAttendanceCount(url, Number(slot));
        }, ATTENDANCE_COUNT_REFRESH_TIME);

        // Cleanup on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [formFillingSite, currentSlotData?.slot]);

    return null;
};

export default AttendanceUpdator;
