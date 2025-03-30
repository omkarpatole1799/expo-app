'use client';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';

import CryptoJS from 'react-native-crypto-js';
const secretKey = 'form-filling-secret-key'; // Key for encryption/decryption

import { RootState } from '@/components/store/store';
import { styles } from '@/constants/styles';
import { StatusBar } from 'expo-status-bar';
import { Platform, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { setQrData } from '@/components/store/candidate-data-slice';
import BtnSecondary from '@/components/UI/BtnSecondary';

const ScanCamera = () => {
	const [isPauseScanning, setIsPauseScanning] = useState(false);
	const processData = useSelector(
		(state: RootState) => state.authSlice.currentLoggedInProcessData
	);
	const currentSlotData = useSelector(
		(state: RootState) => state.authSlice.currentLoggedinSlotData
	);
	const [scannedData, setScannedData] = useState(null);
	const [permission, requestPermission] = useCameraPermissions();
	const dispatch = useDispatch();
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
				<BtnSecondary onPress={requestPermission}>
					Grant Permission
				</BtnSecondary>
			</View>
		);
	}

	const decrypt = async (encryptedData: string, secretKey: string) => {
		console.log('decrypting', '==decrypting==');
		const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
		const originalText = bytes.toString(CryptoJS.enc.Utf8);
		console.log(originalText, '==originalText==');
		return originalText;
	};

	const handleBarcodeScan = async ({ data: qrData }: { data: string }) => {
		setIsPauseScanning(true);

		const decryptedData = await decrypt(qrData, secretKey);

		const parsedQrData = JSON.parse(decryptedData);

		if (currentSlotData?.slot != parsedQrData.slot) {
			Alert.alert('Info', 'No candidate found', [
				{
					text: 'ok',
					onPress: () => {
						router.push('/scan');
					},
				},
			]);
		} else {
			dispatch(setQrData(parsedQrData));
			router.push('/scan');
		}

		// fetch(url, {
		// 	method: 'POST',
		// })
		// 	.then((data) => data.json())
		// 	.then((data) => {
		// 		console.log(data.data, '==data==');
		// 		// setHallticketData(JSON.parse(data.data));

		// 		// console.log(hallticketData, '-hallticketData');
		// 		Alert.alert('Successful!!!');
		// 	})
		// 	.catch((err) => console.log(err, '==err=='));

		// setScannedData(url);
		// setIsQRScannerOpen(false);
		// const decryptedUrlData = decrypt(barcodeData, 'form-filling-secret-key');
		// setScannedData(decryptedUrlData);
		// console.log(decryptedUrlData);
		// const { data: _data } = await axios.post(decryptedUrlData);
		// setHallticketData(JSON.parse(_data.data));
		// successToast({ title: 'QR', message: 'Qr Scanned successfully' });
		// Alert.alert('Successful', 'Candidate details found');
	};

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			{Platform.OS === 'android' ? <StatusBar /> : null}

			<CameraView
				style={styles.camera}
				onBarcodeScanned={isPauseScanning ? undefined : handleBarcodeScan}
			>
				{/* <View style={styles.buttonContainer}>
					<TouchableOpacity
						style={[styles.flipButton, styles.scannerButton]}
						// onPress={toggleCameraFacing}
					>
						<Text style={[styles.text, styles.scannerButtonText]}>
							Flip Camera
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.closeButton, styles.scannerButton]}
						// onPress={() => setIsQRScannerOpen(false)}
					>
						<Text style={[styles.text, styles.scannerButtonText]}>
							Close Scanner
						</Text>
					</TouchableOpacity>
				</View> */}
			</CameraView>
		</View>
	);
};

export default ScanCamera;
