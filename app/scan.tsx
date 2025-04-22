'use client';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
// import CryptoJS from 'crypto-js';
import ProcessBannerImage from '@/components/ProcessBannerImage';
import {
    resetCandidateDataState,
    setCandidateAllData,
} from '@/components/store/candidate-data-slice';
import { RootState } from '@/components/store/store';
import BtnPrimary from '@/components/UI/BtnPrimary';
import { styles } from '@/constants/styles';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import AttendanceUpdator from '@/components/AttendanceUpdator';

let count = 0;

const ScanQrPage = () => {
    const dispatch = useDispatch();
    const qrData = useSelector((state: RootState) => state.candidateData.qrData);
    const authSlice = useSelector((state: RootState) => state.authSlice);

    const rollNumberInputRef = useRef<HTMLInputElement>(null);

    const handleSearchCandidate = () => {
        dispatch(resetCandidateDataState());
        const rollNumber = rollNumberInputRef?.current?.value;
        console.log(rollNumber, '-rollNumberrollNumber');

        if (rollNumber == '' || !rollNumber) {
            Alert.alert('Info', 'Please enter valid roll number', [
                {
                    text: 'OK',
                    onPress: () => {
                        rollNumberInputRef?.current?.focus();
                    },
                },
            ]);
        }
        getStudentByRollNumber(rollNumber);
    };

    const getStudentByRollNumber = useCallback(async (rollNumber: string | number | undefined) => {
        console.log(rollNumber, '-in here-----------');
        try {
            if (!rollNumber) {
                throw new Error('Invalid roll no');
            }

            const url = `${authSlice.currentLoggedInProcessData.p_form_filling_site}/api/get-ht-details-by-roll-no?roll_no=${rollNumber}`;
            console.log(url, '-url===========');

            const _resp = await fetch(url);
            const jsonData = await _resp.json();
            console.log(jsonData, '-jsonData');
            if (!_resp.ok) {
                throw new Error(jsonData?.errMsg || 'No candidate found1');
            }

            // console.log(jsonData, 'jsonData');

            console.log(jsonData?.data?.slot?.slot, '--data?.data?.slot?.slot');
            console.log(authSlice.currentLoggedinSlotData.slot, '-currentSlotData.slot');

            console.log(count++, '----------------count=============');

            if (authSlice?.currentLoggedinSlotData.slot != jsonData?.data?.slot?.slot || 0) {
                throw new Error('No candidate found2');
            } else {
                dispatch(setCandidateAllData(jsonData?.data || []));
                router.push('/candidate-info');
            }
        } catch (error) {
            dispatch(resetCandidateDataState());
            console.log(error, '-error==============');
            Alert.alert('Info', error?.message || 'No candidate found', [
                {
                    text: 'OK',
                    onPress: () => {},
                },
            ]);
        } finally {
            // setIsLoading(false);
        }
    }, []);

    const lastQueriedRollNumberRef = useRef<string | number | null>(null);

    useEffect(() => {
        const currentRollNo = qrData?.roll_no;

        // Check if valid and new roll number
        if (
            currentRollNo &&
            currentRollNo !== 0 &&
            currentRollNo !== lastQueriedRollNumberRef.current
        ) {
            lastQueriedRollNumberRef.current = currentRollNo;
            getStudentByRollNumber(currentRollNo);
        }
    }, [qrData]);

    // if (isLoading) {
    //     return <Loading />;
    // }

    return (
        <SafeAreaView
            edges={['bottom']}
            style={{
                padding: 10,
            }}>
            <AttendanceUpdator />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ProcessBannerImage
                // processUrl={}
                />
                <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '120',
                            borderColor: 'blue',
                        }}>
                        <View
                            style={{
                                width: '100%',
                                marginTop: 40,
                                gap: 10,
                            }}>
                            <TextInput
                                ref={rollNumberInputRef}
                                onChangeText={(e) => (rollNumberInputRef.current.value = e)}
                                style={styles.input}
                                keyboardType="number-pad"
                                placeholder="Roll Number"
                            />
                            <BtnPrimary title={'Submit'} onPress={handleSearchCandidate} />
                        </View>

                        <Text>OR</Text>

                        <BtnPrimary
                            title={<MaterialIcons name="qr-code-scanner" size={75} color="white" />}
                            styleForWrapper={styles.scanQRButtonCenter}
                            styleForChildren={{
                                backgroundColor: 'transparent',
                            }}
                            onPress={() => {
                                dispatch(resetCandidateDataState());
                                router.push('/scan-camera');
                            }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ScanQrPage;
