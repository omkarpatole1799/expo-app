import { Stack } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';

import AttendanceCountComponent from '@/components/UI/AttendanceCount/AttendanceCountComponent';
import LogoutComponent from '@/components/LogoutComponent';
import store from '@/components/store/store';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const _layout = () => {
    const inset = useSafeAreaInsets();
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="scan"
                    options={{
                        headerTitle: '',
                        headerRight: () => {
                            return (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        width: '100%',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                    }}>
                                    <AttendanceCountComponent />
                                    <LogoutComponent />
                                </View>
                            );
                        },
                    }}
                />
                <Stack.Screen
                    name="scan-camera"
                    options={{
                        title: 'Scan QR',
                        headerRight: () => {
                            return (
                                <>
                                    <AttendanceCountComponent />
                                </>
                            );
                        },
                    }}
                />

                <Stack.Screen
                    name="candidate-info"
                    options={{
                        title: 'Candidate Info',
                        headerRight: () => {
                            return (
                                <>
                                    <AttendanceCountComponent />
                                </>
                            );
                        },
                    }}
                />
            </Stack>
        </Provider>
    );
};

export default _layout;
