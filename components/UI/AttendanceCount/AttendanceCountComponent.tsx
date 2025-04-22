import { RootState } from '@/components/store/store';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const AttendanceCountComponent = () => {
    const attendanceCount = useSelector((state: RootState) => state.authSlice.attendanceCount);

    const formatedAttendanceCount = useMemo(() => {
        return `${attendanceCount.total_present_count} / ${attendanceCount.total_student_count}`;
    }, [attendanceCount]);

    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text>Attendance Count</Text>
            <Text
                style={{
                    padding: 2,
                    fontSize: 22,
                }}>
                {formatedAttendanceCount}
            </Text>
        </View>
    );
};

export default AttendanceCountComponent;
