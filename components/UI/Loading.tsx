import { styles } from '@/constants/styles';
import React from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';

const Loading = () => {
    return (
        <SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
            <Text>Loading...</Text>
        </SafeAreaView>
    );
};

export default Loading;
