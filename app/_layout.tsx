import { Stack } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';

import store from '@/components/store/store';

const _layout = () => {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="tabs" options={{ headerShown: false }} />
                <Stack.Screen name="scan-camera" options={{ title: 'Scan QR' }} />
                <Stack.Screen
                    name="candidate-info/[rollNumber]"
                    options={{ title: 'Candidate Info' }}
                />
            </Stack>
        </Provider>
    );
};

export default _layout;
