import { styles } from '@/constants/styles';
import React from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Loading = () => {
    const inset = useSafeAreaInsets();
    return (
        <SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
            <Text>Loading...</Text>
        </SafeAreaView>
    );
};

export default Loading;
