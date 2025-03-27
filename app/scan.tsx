'use client';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
	TextInput,
	View,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity,
	Platform,
	Alert,
} from 'react-native';
// import CryptoJS from 'crypto-js';
import axios from 'axios';
import CandidateInfo from './candidate-info';


const ScanQrPage = () => {
	const rollNumberInputRef = useRef();
	const [facing, setFacing] = useState('back');
	const [permission, requestPermission] = useCameraPermissions();

	const [scannedData, setScannedData] = useState(null);
	const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [hallticketData, setHallticketData] = useState(null);
	const [isScanning, setIsScanning] = useState(false);

	useEffect(() => {
		return () => {
			setScannedData(null);
			setIsQRScannerOpen(false);
		};
	}, []);

	const decrypt = (encryptedData, secretKey) => {
		// const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
		// const originalText = bytes.toString(CryptoJS.enc.Utf8);
		// return originalText;
	};

	const handleBarcodeScan = async ({ data: barcodeData }) => {
		// if (isScanning) return;
		// setIsScanning(true);

		console.log(barcodeData, '-data');
		const data = barcodeData;
		const url = barcodeData;

		fetch(url, {
			method: 'POST',
		})
			.then((data) => data.json())
			.then((data) => {
				console.log(data.data, '==data==');
				setHallticketData(JSON.parse(data.data));

				console.log(hallticketData, '-hallticketData');
				Alert.alert('Successful!!!');
			})
			.catch((err) => console.log(err, '==err=='));

		setScannedData(url);
		setIsQRScannerOpen(false);
		// const decryptedUrlData = decrypt(barcodeData, 'form-filling-secret-key');
		// setScannedData(decryptedUrlData);
		// console.log(decryptedUrlData);
		// const { data: _data } = await axios.post(decryptedUrlData);
		// setHallticketData(JSON.parse(_data.data));
		// successToast({ title: 'QR', message: 'Qr Scanned successfully' });
		// Alert.alert('Successful', 'Candidate details found');
	};

	function toggleCameraFacing() {
		setFacing((current) => (current === 'back' ? 'front' : 'back'));
	}

	if (!permission) {
		return (
			<View style={styles.container}>
				<Text style={styles.message}>
					This is the camera view. Please grant the necessary permissions to
					proceed.
				</Text>
			</View>
		);
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
				<Text style={styles.message}>
					We need your permission to access the camera
				</Text>
				<Button onPress={requestPermission} title="Grant Permission" />
			</View>
		);
	}

	const handleSearchCandidate = () => {
		console.log(1, '==1==');
		console.log(
			rollNumberInputRef.current.value,
			'==rollNumberInputRef.current=='
		);

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

	function getStudentByRollNumber(rollNumber) {
		try {
			const url = `http://192.168.1.4:3001/api/get-ht-details-by-roll-no?roll_no=${rollNumber}`;

			console.log(url, '==url==');
			fetch(url)
				.then((data) => data.json())
				.then((data) => {
					console.log(data.data, '==data==');
					setHallticketData(data.data);

					console.log(hallticketData, '-hallticketData');
					Alert.alert('Successful!!!');
				})
				.catch((err) => console.log(err, '==err=='));
		} catch (error) {
			console.log(error)
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

	return (
		<View style={styles.container}>
			{Platform.OS === 'android' ? <StatusBar /> : null}
			{isQRScannerOpen && (
				<CameraView
					style={styles.camera}
					facing={facing}
					onBarcodeScanned={handleBarcodeScan}
				>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.flipButton, styles.scannerButton]}
							onPress={toggleCameraFacing}
						>
							<Text style={[styles.text, styles.scannerButtonText]}>
								Flip Camera
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.closeButton, styles.scannerButton]}
							onPress={() => setIsQRScannerOpen(false)}
						>
							<Text style={[styles.text, styles.scannerButtonText]}>
								Close Scanner
							</Text>
						</TouchableOpacity>
					</View>
				</CameraView>
			)}

			{/* Render Info component conditionally based on scanned data */}
			{/* {!isQRScannerOpen && scannedData && hallticketData && ( */}
			{!isQRScannerOpen && hallticketData && (
				<CandidateInfo
					hallticketData={hallticketData}
					sourceUrl={scannedData}
					isCameraOpen={isCameraOpen}
					setIsCameraOpen={setIsCameraOpen}
				/>
			)}

			{!isQRScannerOpen && !scannedData && (
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
						}}
					>
						<TextInput
							ref={rollNumberInputRef}
							onChangeText={(e) => (rollNumberInputRef.current.value = e)}
							style={styles.input}
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
							setScannedData(null);
							setIsQRScannerOpen(true);
						}}
					>
						<Text style={styles.scanQRButtonText}>Scan QR</Text>
					</TouchableOpacity>
				</View>
			)}

			{!isQRScannerOpen && !isCameraOpen && scannedData && (
				<View style={styles.buttonWrapper}>
					<TouchableOpacity
						style={styles.scanQRButton}
						onPress={() => {
							setScannedData(null);
							setIsQRScannerOpen(true);
						}}
					>
						<Text style={styles.scanQRButtonText}>Scan QR</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default ScanQrPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 40,
		left: 20,
		right: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonWrapper: {
		marginTop: 'auto',
	},
	buttonStyles: {
		backgroundColor: '#0ea5e9',
		padding: 10,
		display: 'flex',
		justifyContent: 'center',
		borderRadius: 8,
	},
	scanQRButtonCenter: {
		width: 150,
		height: 150,
		borderRadius: 75,
		backgroundColor: '#0ea5e9',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
	},
	scanQRButton: {
		backgroundColor: '#0ea5e9',
		paddingVertical: 12,
		paddingHorizontal: 30,
		color: 'white',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	scanQRButtonText: {
		color: 'white',
		fontWeight: '500',
		fontSize: 20,
		textTransform: 'uppercase',
		letterSpacing: 0,
		textAlign: 'center',
	},
	scannerButton: {
		paddingVertical: 16,
		paddingHorizontal: 15,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: 120,
	},
	flipButton: {
		backgroundColor: '#007BFF',
		display: 'none',
	},
	closeButton: {
		backgroundColor: '#DC3545',
	},
	text: {
		color: '#FFF',
		fontSize: 14,
		fontWeight: '600',
	},
	scannerButtonText: {
		color: '#FFF',
	},
	textStyles: {
		fontSize: 20,
	},
	titleLogin: {
		color: 'blue',
		fontSize: 30,
		fontWeight: 'bold',
	},

	header: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 8,
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
		marginBottom: 20,
	},

	error: {
		position: 'absolute',
		color: '#ff4d4d',
		fontSize: 12,
		bottom: -19,
	},
});
