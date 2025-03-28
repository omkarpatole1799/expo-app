'use client';
import CryptoJS from "react-native-crypto-js";
import { useEffect, useRef } from 'react';
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
// import CryptoJS from 'crypto-js';
import ProcessBannerImage from '@/components/ProcessBannerImage';
import { setCandidateAllData } from '@/components/store/candidate-data-slice';
import { RootState } from '@/components/store/store';
import { styles } from '@/constants/styles';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
const secretKey = 'form-filling-secret-key'; // Key for encryption/decryption

const ScanQrPage = () => {
	const dispatch = useDispatch();
	const qrData = useSelector((state: RootState) => state.candidateData.qrData);
	const processData = useSelector(
		(state: RootState) => state.authSlice.currentLoggedInProcessData
	);
	const currentSlotData = useSelector(
		(state: RootState) => state.authSlice.currentLoggedinSlotData
	);

	const rollNumberInputRef = useRef();

	const decrypt = (encryptedData, secretKey) => {
		const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
		const originalText = bytes.toString(CryptoJS.enc.Utf8);
		return originalText;
	};

	const handleSearchCandidate = () => {
		const rollNumber = rollNumberInputRef.current.value;

		if (rollNumber == '' || !rollNumber) {
			Alert.alert('Warning', 'Please enter valid roll number', [
				{
					text: 'OK',
					onPress: () => {
						rollNumberInputRef.current.focus();
					},
				},
			]);
		}

		getStudentByRollNumber(rollNumber);
	};

	function getStudentByRollNumber(rollNumber: string) {
		try {
			if (!rollNumber) {
				throw new Error('Invalid roll no');
			}
			const url = `${processData.p_form_filling_site}/api/get-ht-details-by-roll-no?roll_no=${rollNumber}`;
			console.log(url, '==url==');

			fetch(url)
				.then((data) => data.json())
				.then((data) => {
					console.log(data.data, '==data==');

					if (currentSlotData.slot != data?.data?.slot?.slot || 0) {
						Alert.alert('Warning', 'Current Slot Doesnt Match', [
							{
								text: 'ok',
								onPress: () => {
									router.push('/scan');
								},
							},
						]);
					} else {
						dispatch(setCandidateAllData(data?.data || []));
						router.push('/candidate-info');
					}
				})
				.catch((err) => {
					console.log(err, '==err==');
					Alert.alert('Info', 'No candidate found!!!', [
						{
							text: 'ok',
							onPress: () => {
								router.push('/scan');
							},
						},
					]);
				});
		} catch (error) {
			console.log(error);
			Alert.alert('Error', 'Unable to get student details', [
				{
					text: 'OK',
					onPress: () => {
						rollNumberInputRef.current.focus();
					},
				},
			]);
		}
	}

	useEffect(() => {
		console.log(processData, '==processData==');
		console.log(qrData, '==qrData==');
		if (qrData) {
			getStudentByRollNumber(qrData.roll_no);
		}
	}, [qrData]);

	return (
		<KeyboardAvoidingView
			style={{
				flex: 1,
				padding: 10,
			}}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			{/* <View
				style={{
					borderColor: 'black',
					height: 100,
					width: '100%',
				}}
			>
				<Image
					style={{
						width: '100%',
						height: '100%',
					}}
					source={{
						uri: `${processData.p_form_filling_site}/assets/images/brand-name.jpg`,
					}}
				/>
			</View> */}
			<ProcessBannerImage processUrl={processData.p_form_filling_site} />
			<ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
				<View
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '150',
						borderColor: 'blue',
					}}
				>
					<View
						style={{
							width: '100%',
							marginTop: 40,
						}}
					>
						<TextInput
							ref={rollNumberInputRef}
							onChangeText={(e) => (rollNumberInputRef.current.value = e)}
							style={styles.input}
							keyboardType="number-pad"
							placeholder="Roll Number"
						/>
						<TouchableOpacity
							style={styles.buttonStyles}
							onPress={handleSearchCandidate}
						>
							<Text style={styles.scanQRButtonText}>Submit</Text>
						</TouchableOpacity>
					</View>

					<Text>OR</Text>

					<TouchableOpacity
						style={styles.scanQRButtonCenter}
						onPress={() => {
							router.push('/scan-camera');
						}}
					>
						<Text style={styles.scanQRButtonText}>Scan QR</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default ScanQrPage;
