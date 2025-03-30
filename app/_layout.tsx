import { Stack } from 'expo-router';
import React from 'react';
import { Button } from 'react-native';
import { Provider } from 'react-redux';

import store from '@/components/store/store';
import LogoutComponent from '@/components/LogoutComponent';

const _layout = () => {
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
						title: 'Search Candidate',
						headerRight: () => <LogoutComponent />,
					}}
				/>
				<Stack.Screen
					name="scan-camera"
					options={{
						title: 'Scan QR',
					}}
				/>

				<Stack.Screen
					name="candidate-info"
					options={{
						title: 'Candidate Info',
					}}
				/>
			</Stack>
		</Provider>
	);
};

export default _layout;
