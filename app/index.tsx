import AsyncStorage from '@react-native-async-storage/async-storage';

import { setCurrentLoggedInProcessData } from '@/components/store/auth-slice';
import { UTTIRNA_URL } from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/components/store/store';

const defaultLoginFormValue = {
	username: 'test', // Set the dummy username
	password: 'test', // Set the dummy password
	processUrl: '',
	slot: '',
};

export default function Index() {
	const router = useRouter();
	const [allotmentDetails, setAllotmentDetails] = useState([]);
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const currentSlotData = useSelector(
		(state: RootState) => state.authSlice.currentLoggedinSlotData
	);

	useFocusEffect(() => {
		if (currentSlotData) {
			navigation.reset({
				index: 0, // Reset the stack to only have the scan page
				routes: [{ name: 'scan' }],
			});
		}
	});

	const [processList, setProcessList] = useState([
		{
			process_name: 'Loading...',
			process_url: '',
		},
	]);

	async function getProcessList() {
		try {
			const url = `${UTTIRNA_URL}/api/get-process-list`;
			const _resp = await fetch(url);
			const _data = await _resp.json();
			setProcessList(JSON.parse(_data.data) || []);
		} catch (error) {
			Alert.alert('Error', 'Unable to get exam list', [
				{
					text: 'ok',
					onPress: () => {},
				},
			]);
			console.log(error);
		}
	}

	useEffect(() => {
		getProcessList();
	}, []);

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
		reset,
	} = useForm({
		defaultValues: defaultLoginFormValue,
	});

	const onSubmit = useCallback((formData: any) => {
		const url = `${formData.processUrl}/api/login`;
		formData['role'] = 'USER';

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((data) => data.json())
			.then((data) => {
				const currentLoggedinSlotData = formData;
				console.log(currentLoggedinSlotData, '==currentLoggedinSlotData==');

				const processData = data?.data?._processData[0] || [];
				dispatch(
					setCurrentLoggedInProcessData({
						processData,
						currentLoggedinSlotData,
					})
				);

				// const stringifiedProcessData = JSON.stringify(processData);
				// AsyncStorage.setItem('processData', stringifiedProcessData);

				router.push('/scan');

				// Alert.alert(
				// 	'Successful!!!',
				// 	`${data.usrMsg}`,
				// 	[
				// 		{
				// 			text: 'OK',
				// 			onPress: () => {
				// 				router.push('/scan');
				// 			},
				// 		},
				// 	],
				// 	{ cancelable: false }
				// );
			})
			.catch((err) => {
				Alert.alert('Error', 'Not able to login', [
					{
						text: 'OK',
						onPress: () => {
							// router.push('/qr/scan');
						},
					},
				]);
			});
	}, []);

	const fetchAllotmentDetails = useCallback(async (url) => {
		try {
			console.log(`${url}/api/get-allotment-info`);
			const _resp = await fetch(`${url}/api/get-allotment-info`);
			if (!_resp.ok) throw new Error('Unable to get allotment details');
			const jsonData = await _resp.json();
			console.log(jsonData.data, '-');
			if (jsonData.data) {
				setAllotmentDetails(jsonData.data);
			}
		} catch (err) {
			Alert.alert('Error', err?.message || 'Try again after some time.', [
				{
					text: 'OK',
					onPress: () => {
						// router.push('/qr/scan');
					},
				},
			]);
		}
	}, []);

	const watchProcessUrl = watch('processUrl');
	useEffect(() => {
		if (watchProcessUrl) {
			fetchAllotmentDetails(watchProcessUrl);
		}
	}, [watchProcessUrl, setValue]);

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.header}>Welcome</Text>
				<Text style={styles.subHeader}>Login</Text>

				<Controller
					control={control}
					name="processUrl"
					rules={{ required: 'Select Exam' }}
					render={({ field: { onChange, value } }) => (
						<View style={styles.inputContainer}>
							<Picker
								style={styles.input}
								selectedValue={value}
								onValueChange={onChange}
							>
								<Picker.Item label="--Select Exam--" />
								{processList.map((process, idx) => {
									return (
										<Picker.Item
											key={idx}
											label={process.process_name}
											value={process.process_url}
										/>
									);
								})}
							</Picker>

							{errors.processUrl && (
								<Text style={styles.error}>{errors.processUrl.message}</Text>
							)}
						</View>
					)}
				/>

				<Controller
					control={control}
					name="slot"
					rules={{ required: 'Select Slot' }}
					render={({ field: { onChange, value } }) => (
						<View style={styles.inputContainer}>
							<Picker
								style={styles.input}
								selectedValue={value}
								onValueChange={onChange}
							>
								<Picker.Item label="--Select Slot--" />
								{allotmentDetails.map((_el, idx) => {
									return (
										<Picker.Item
											key={idx}
											label={`${_el.ai_collage_name} : ${_el.ai_slot_time}`}
											value={_el.ai_slot_number}
										/>
									);
								})}
							</Picker>

							{errors.processUrl && (
								<Text style={styles.error}>{errors.slot.message}</Text>
							)}
						</View>
					)}
				/>

				<Controller
					control={control}
					name="username"
					rules={{ required: 'Username is required' }}
					render={({ field: { onChange, value } }) => (
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="Username"
								onChangeText={onChange}
								value={value}
							/>
							{errors.username && (
								<Text style={styles.error}>{errors.username.message}</Text>
							)}
						</View>
					)}
				/>

				<Controller
					control={control}
					name="password"
					rules={{ required: 'Password is required' }}
					render={({ field: { onChange, value } }) => (
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="Password"
								onChangeText={onChange}
								value={value}
							/>
							{errors.username && (
								<Text style={styles.error}>{errors.password.message}</Text>
							)}
						</View>
					)}
				/>
				<View
					style={{
						display: 'flex',
						gap: 10,
					}}
				>
					<Button title="Login" onPress={handleSubmit(onSubmit)} />
					<Button
						title="Refresh"
						onPress={() => {
							reset(defaultLoginFormValue);
							getProcessList();
						}}
					/>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	textStyles: {
		fontSize: 20,
	},
	titleLogin: {
		color: 'blue',
		fontSize: 30,
		fontWeight: 'bold',
	},

	Button: {
		padding: 30,
	},
	container: {
		display: 'flex',
		marginBottom: 30,
		width: '100%',
		padding: 16,
		backgroundColor: '#f5f5f5',
	},
	header: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 8,
		textAlign: 'center',
	},
	subHeader: {
		fontSize: 18,
		fontWeight: '400',
		color: '#555',
		marginBottom: 24,
		textAlign: 'center',
	},
	inputContainer: {
		position: 'relative',
		width: '100%',
		marginBottom: 26,
	},
	input: {
		height: 50,
		borderColor: '#ccc',
		// borderWidth: 1,
		paddingLeft: 12,
		borderRadius: 6,
		fontSize: 16,
		backgroundColor: '#fff',
	},

	error: {
		position: 'absolute',
		color: '#ff4d4d',
		fontSize: 12,
		bottom: -19,
	},
	button: {
		width: '100%',
		backgroundColor: '#3b82f6',
		paddingVertical: 14,
		borderRadius: 6,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
});
