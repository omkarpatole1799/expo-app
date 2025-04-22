// import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as FileSystem from 'expo-file-system';

import { RootState } from '@/components/store/store';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import React, { useEffect, useRef, useState } from 'react';

import CandidateProfilePhoto from '@/components/CandidateProfilePhoto';
import CandidateSignature from '@/components/CandidateSignature';
import BtnPrimary from '@/components/UI/BtnPrimary';
import BtnSecondary from '@/components/UI/BtnSecondary';
import { styles } from '@/constants/styles';
import { Alert, Button, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import getUrl from '../../components/helper/getUrl';

const CandidateInfo = () => {
    const inset = useSafeAreaInsets();
    const candidateFullData = useSelector(
        (state: RootState) => state.candidateData.candidateAllDetails
    );

    const processData = useSelector(
        (state: RootState) => state.authSlice.currentLoggedInProcessData
    );

    const currentLoggedInUserId = useSelector(
        (state: RootState) => state.authSlice.currentLoggedinSlotData.id
    );

    const [isCameraOpen, setIsCameraOpen] = useState(false);

    // console.log(candidateFullData, '==candidateFullData==');

    const { p: process, ca: candidate, ht: hallticket, slot, s3BucketUrl } = candidateFullData;

    // const extractQueryParams = (url) => {
    // 	const params = new URLSearchParams(new URL(url).search);
    // 	return {
    // 		registrationId: params.get('r'),
    // 		formId: params.get('f'),
    // 	};
    // };

    // const { registrationId, formId } = extractQueryParams(sourceUrl);

    const [permission, requestPermission] = useCameraPermissions();

    const [isPictureTaken, setIsPictureTaken] = useState(false);
    const [photoUri, setPhotoUri] = useState('');
    const [facing, setFacing] = useState('back');
    const cameraRef = useRef(null);

    const [isCandidateApproved, setIsCandidateApproved] = useState(false);
    const [isApproving, setIsApproving] = useState(false);

    let [justApproved, setJustApproved] = useState(false);

    useEffect(() => {
        console.log(hallticket.ca_is_approved);
        console.log(hallticket.ca_approved_photo, '==hallticket.ca_approved_photo==');
        if (hallticket.ca_is_approved === 'NO') {
            setIsCandidateApproved(false);
            setPhotoUri('');
        } else {
            setIsCandidateApproved(true);
        }
    }, []);

    // if (!permission) {
    //     return (
    //         <View>
    //             <Text>This is htis</Text>
    //         </View>
    //     );
    // }

    if (permission) {
        if (!permission.granted) {
            return (
                <View style={styles.container}>
                    <Text style={styles.message}>We need your permission to show the camera</Text>
                    <Button onPress={requestPermission} title="Grant Permission" />
                </View>
            );
        }
    }

    const toggleCameraFacing = () => {
        setFacing((prevFacing) => (prevFacing === 'front' ? 'back' : 'front'));
    };

    const handleTakePicture = async () => {
        setJustApproved(false);
        setIsCandidateApproved(false);
        if (cameraRef.current) {
            const data = await cameraRef.current.takePictureAsync();
            setPhotoUri(data.uri);
            setIsPictureTaken(true);
            setIsCameraOpen(false);

            console.log(data.uri, '-data.uri');
        }
    };

    const retakePicture = () => {
        // setPhotoUri(null);
        setIsPictureTaken(false);
    };

    const savePicture = () => {
        console.log('Picture saved:', photoUri);
    };

    const compressImage = async (uri, maxWidth = 800, maxHeight = 800, quality = 20) => {
        try {
            const result = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: maxWidth, height: maxHeight } }],
                { compress: quality / 100, format: ImageManipulator.SaveFormat.JPEG }
            );
            return result.uri;
        } catch (error) {
            console.error('Error compressing image:', error);
            throw new Error('Image compression failed');
        }
    };

    async function readFile(uri) {
        try {
            const fileContent = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64, // You can choose the encoding as needed
            });

            return fileContent; // You can send this base64 content to your server if necessary
        } catch (error) {
            console.error('Error reading file:', error);
        }
    }

    const handleApprove = async () => {
        if (isApproving) return;
        try {
            setIsApproving(true);
            if (!photoUri) {
                throw new Error('Please capture candidate photo');
            }

            const sendData = new FormData();

            sendData.set('rollNo', hallticket.ca_roll_number);
            sendData.set('f_id', hallticket.id);
            sendData.set('r_id', hallticket.ca_reg_id);
            sendData.set('approved_by_user_id', `${currentLoggedInUserId}`);

            const compressedPhotoUri = await compressImage(photoUri);
            const fileBase64 = (await readFile(compressedPhotoUri)) as string;

            const base64Data = fileBase64.replace(/^data:image\/(jpeg|jpg|png);base64,/, '');

            sendData.set('candidatePhoto', base64Data);

            let url = `${processData.p_form_filling_site}/api/save-approval-details`;
            console.log(url, '-url=====');
            const _resp = await fetch(url, {
                method: 'POST',
                body: sendData,
            });

            if (!_resp.ok) {
                throw new Error('Error while approving');
            }

            setJustApproved(true);
        } catch (err) {
            Alert.alert('Info', err?.message || 'Unable to approve candidate, try again later', [
                {
                    text: 'ok',
                    onPress: () => {},
                },
            ]);
            console.error(err);
            setIsApproving(false);
        } finally {
            setIsApproving(false);
        }
    };

    return (
        <SafeAreaView
            edges={['bottom']}
            style={{
                flex: 1,
                // padding: 10,
                paddingBottom: inset.bottom,
            }}>
            {/* <View style={styles.container}> */}
            {isCameraOpen && (
                <CameraView style={styles.fullScreenCamera} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.snapButton, styles.buttonPrimary]}
                            onPress={handleTakePicture}>
                            <Text style={[styles.text, styles.scannerButtonText]}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.closeButton, styles.buttonDanger]}
                            onPress={() => setIsCameraOpen(false)}>
                            <Text style={[styles.text, styles.scannerButtonText]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}

            {!isCameraOpen && (
                <>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.ticket}>
                            <View style={styles.photoAndSignContainer}>
                                {/* User Photo */}

                                <CandidateProfilePhoto
                                    s3BucketUrl={s3BucketUrl}
                                    photo={hallticket.ca_photo || ''}
                                />

                                <TouchableOpacity
                                    // disabled={isCandidateApproved}
                                    onPress={() => {
                                        setIsCameraOpen(true);
                                    }}>
                                    {/* Caputred image Image */}

                                    {isCandidateApproved || isPictureTaken ? (
                                        <Image
                                            style={styles.photo}
                                            source={{
                                                // uri: isPictureTaken ? photoUri : captureImagePlaceholder,
                                                uri:
                                                    photoUri ||
                                                    `${s3BucketUrl}/${hallticket?.ca_approved_photo}`,
                                            }}
                                        />
                                    ) : (
                                        <View style={[styles.photo]}>
                                            <AntDesign
                                                name="camera"
                                                size={44}
                                                color="black"
                                                style={{
                                                    color: '#00bc7d',
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%,-50%)',
                                                }}
                                            />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>

                            <CandidateSignature
                                s3BucketUrl={s3BucketUrl}
                                sign={hallticket.ca_sign || ''}
                            />

                            <View
                                style={{
                                    backgroundColor: '#cefafe',
                                    padding: 8,
                                    borderRadius: 8,
                                    gap: 8,
                                    marginBottom: 5,
                                }}>
                                <Text
                                    style={{
                                        backgroundColor: '#009689',
                                        padding: 8,
                                        borderRadius: 5,
                                        color: '#fff',
                                        fontWeight: 700,
                                        letterSpacing: 0.5,
                                    }}>
                                    {`${candidate.ub_first_name} ${candidate.ub_middle_name} ${candidate.ub_last_name}`}
                                </Text>
                                <Text style={{ fontSize: 15, fontWeight: 600 }}>
                                    Allotment details
                                </Text>

                                <Text
                                    style={{
                                        backgroundColor: '#009689',
                                        padding: 8,
                                        borderRadius: 5,
                                        color: '#fff',
                                        fontWeight: 500,
                                        letterSpacing: 0.5,
                                    }}>
                                    Center : {hallticket?.ca_center_name || 'N/A'}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        gap: 5,
                                    }}>
                                    <Text
                                        style={{
                                            backgroundColor: '#009689',
                                            padding: 8,
                                            borderRadius: 5,
                                            color: '#fff',
                                            fontWeight: 500,
                                            letterSpacing: 0.5,
                                        }}>
                                        Department : {hallticket?.department || 'N/A'}
                                    </Text>

                                    <Text
                                        style={{
                                            backgroundColor: '#009689',
                                            padding: 8,
                                            borderRadius: 5,
                                            color: '#fff',
                                            fontWeight: 500,
                                            letterSpacing: 0.5,
                                        }}>
                                        Lab : {hallticket.lab_name || 'N/A'}
                                    </Text>
                                    <Text
                                        style={{
                                            backgroundColor: '#009689',
                                            padding: 8,
                                            borderRadius: 5,
                                            color: '#fff',
                                            fontWeight: 500,
                                            letterSpacing: 0.5,
                                        }}>
                                        Floor : {hallticket.floor || 'N/A'}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.details}>
                                <DetailRow label="Seat Number" value={hallticket.ca_roll_number} />
                                <DetailRow label="Form Number" value={hallticket.id} />
                                <DetailRow
                                    label="Post Name"
                                    value={hallticket.ca_post_name?.toUpperCase()}
                                />
                                <DetailRow
                                    label="Gender"
                                    value={hallticket.ca_gender?.toUpperCase()}
                                />
                                <DetailRow label="Exam Date" value={`${hallticket.exam_date}`} />
                                <DetailRow label="Exam Time" value={`${slot.time}`} />
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.buttonWrapper}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                width: '100%',
                            }}>
                            <BtnPrimary
                                styleForChildren={{
                                    backgroundColor:
                                        isCandidateApproved || justApproved ? 'green' : '#007595',
                                }}
                                title={
                                    isApproving
                                        ? 'Approving...'
                                        : isCandidateApproved || justApproved
                                        ? 'Present'
                                        : 'Approve'
                                }
                                disabled={isApproving || isCandidateApproved || justApproved}
                                onPress={handleApprove}
                            />

                            <BtnSecondary
                                title={!photoUri ? 'Take Snap' : 'Retake Snap'}
                                onPress={() => {
                                    setIsCameraOpen(true);
                                }}
                            />
                        </View>
                    </View>
                </>
            )}
            {/* </View> */}
        </SafeAreaView>
    );
};

const DetailRow = ({ label, value }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

export default CandidateInfo;
