import { ATTENDANCE_COUNT_REFRESH_TIME } from '@/constants/values';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchAttendanceCount } from './api';

const AttendanceCountComponent = () => {
    const currentSlotData = useSelector(
        (state: RootState) => state.authSlice.currentLoggedinSlotData
    );

    const formFillingSite = useSelector(
        (state: RootState) => state.authSlice.currentLoggedInProcessData.p_form_filling_site
    );

    const [candidateAttendanceCount, setCandidateAttendanceCount] = useState({
        total_present_count: 0,
        total_student_count: 0,
    });

    async function fetchAndSetAttendanceCount(url: string, slot: number) {
        const data = await fetchAttendanceCount(url, slot);
        setCandidateAttendanceCount(
            data?.data[0] || {
                total_present_count: 0,
                total_student_count: 0,
            }
        );
    }

    useEffect(() => {
        const url = formFillingSite;
        const slot = currentSlotData?.slot;

        if (url && slot) {
            fetchAndSetAttendanceCount(url, Number(slot));
            setInterval(async () => {
                fetchAndSetAttendanceCount(url, Number(slot));
            }, ATTENDANCE_COUNT_REFRESH_TIME);
        }
    }, []);

    return (
        <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems : 'center'
        }}>
            <Text>Attendance Count</Text>
            <Text
                style={{
                    padding: 2,
                    fontSize: 22
                }}>
                {candidateAttendanceCount?.total_present_count || 0} /{' '}
                {candidateAttendanceCount?.total_student_count || 0}
            </Text>
        </View>
    );
};

export default AttendanceCountComponent;
