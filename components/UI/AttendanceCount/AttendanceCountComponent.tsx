import { ATTENDANCE_COUNT_REFRESH_TIME } from '@/constants/values';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchAttendanceCount } from './api';
import { AttendanceCountData } from './types';

const AttendanceCountComponent = () => {
    const currentSlotData = useSelector(
        (state: RootState) => state.authSlice.currentLoggedinSlotData
    );

    const [candidateAttendanceCount, setCandidateAttendanceCount] = useState({
        total_present_count: 0,
        total_student_count: 0,
    });

    useEffect(() => {
        const url = currentSlotData?.processUrl;
        const slot = currentSlotData?.slot;

        if (url && slot) {
            (async () => {
                const data = await fetchAttendanceCount(url, slot);
                setCandidateAttendanceCount(
                    data?.data[0] || {
                        total_present_count: 0,
                        total_student_count: 0,
                    }
                );
            })();

            setInterval(async () => {
                const data = await fetchAttendanceCount(url, slot);
                setCandidateAttendanceCount(
                    data?.data[0] || {
                        total_present_count: 0,
                        total_student_count: 0,
                    }
                );
            }, ATTENDANCE_COUNT_REFRESH_TIME);
        }
    }, []);

    return (
        <>
            <Text
                style={{
                    padding: 2,
                }}>
                {candidateAttendanceCount?.total_present_count || 0} /{' '}
                {candidateAttendanceCount?.total_student_count || 0}
            </Text>
        </>
    );
};

export default AttendanceCountComponent;
