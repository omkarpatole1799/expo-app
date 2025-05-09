import { View, Text } from 'react-native';
import React from 'react';
import LogoutComponent from '@/components/LogoutComponent';

const profile = () => {
    return (
        <View
            style={{
                marginTop: 20,
                padding: 20,
            }}>
            <LogoutComponent />
        </View>
    );
};

export default profile;
