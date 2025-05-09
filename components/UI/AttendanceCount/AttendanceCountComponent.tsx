import { RootState } from '@/components/store/store';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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

    useEffect(() => {
        if (!url || !slot) return;

        const fetchAndSetAttendanceCount = async () => {
            try {
                const data = await fetchAttendanceCount(url, Number(slot));
                setAttendanceCount(
                    data?.data[0] || {
                        total_present_count: 0,
                        total_student_count: 0,
                    }
                );
            } catch (error) {
                console.error('Failed to fetch attendance:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndSetAttendanceCount();
    }, [url, slot]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Attendance</Text>
            <Text style={styles.count}>
                {attendanceCount.total_present_count} / {attendanceCount.total_student_count}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    label: {
        fontSize: 18,
        color: '#555',
        fontWeight: '500',
        marginBottom: 6,
    },
    count: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2b2b2b',
    },
});

export default AttendanceCountComponent;
