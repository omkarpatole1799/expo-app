import { RootState } from '@/components/store/store';
import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchAttendanceCount } from './api';
import Loading from '../Loading';

const AttendanceCountComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [attendanceCount, setAttendanceCount] = useState({
        total_present_count: 0,
        total_student_count: 0,
    });

    const url = useSelector(
        (state: RootState) => state.authSlice.currentLoggedInProcessData.p_form_filling_site
    );

    const slot = useSelector((state: RootState) => state.authSlice.currentLoggedinSlotData.slot);

    async function fetchAndSetAttendanceCount(url: string, slot: number) {
        const data = await fetchAttendanceCount(url, slot);
        console.log(data, '-data');

        setAttendanceCount(
            data?.data[0] || {
                total_present_count: 0,
                total_student_count: 0,
            }
        );

        setIsLoading(false);
    }

    useEffect(() => {
        console.log(url, slot);
        if (!url || !slot) return;

        fetchAndSetAttendanceCount(url, Number(slot));
    }, [url, slot]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text
                style={{
                    padding: 2,
                    fontSize: 22,
                    marginTop: 30,
                }}>
                {attendanceCount.total_present_count} / {attendanceCount.total_student_count}
            </Text>
        </View>
    );
};

export default AttendanceCountComponent;
