import { View, Text } from 'react-native';
import React from 'react';
import AttendanceCountComponent from '@/components/UI/AttendanceCount/AttendanceCountComponent';

const count = () => {
    return (
        <View>
            <AttendanceCountComponent />
        </View>
    );
};

export default count;
