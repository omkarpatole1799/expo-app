'use client';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
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
import { setCandidateAllData } from '@/components/store/candidate-data-slice';
import { RootState } from '@/components/store/store';
import BtnPrimary from '@/components/UI/BtnPrimary';
import { styles } from '@/constants/styles';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/components/UI/Loading';

const ScanQrPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const qrData = useSelector((state: RootState) => state.candidateData.qrData);
    const processData = useSelector(
        (state: RootState) => state.authSlice.currentLoggedInProcessData
    );
    const currentSlotData = useSelector(
        (state: RootState) => state.authSlice.currentLoggedinSlotData
    );
    console.log(currentSlotData, '-currentSlotDatacurrentSlotData');

    const rollNumberInputRef = useRef<HTMLInputElement>(null);

    const handleSearchCandidate = () => {
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

    function getStudentByRollNumber(rollNumber: string | undefined) {
        console.log(rollNumber, '-in here-----------');
        try {
            if (!rollNumber) {
                throw new Error('Invalid roll no');
            }

            const url = `${processData.p_form_filling_site}/api/get-ht-details-by-roll-no?roll_no=${rollNumber}`;
            console.log(url, '==url==');

            setIsLoading(true);
            fetch(url)
                .then((data) => data.json())
                .then((data) => {
                    setIsLoading(false);
                    console.log(data.data, '==dataa1001==');

                    console.log(data?.data?.slot?.slot, '--data?.data?.slot?.slot');
                    console.log(currentSlotData.slot, '-currentSlotData.slot');

                    if (currentSlotData.slot != data?.data?.slot?.slot || 0) {
                        Alert.alert('Info', 'No candidate found', [
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
                    setIsLoading(false);
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
                        rollNumberInputRef?.current?.focus();
                    },
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (qrData) {
            getStudentByRollNumber(qrData?.roll_no);
        }
    }, [qrData]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 10,
            }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ProcessBannerImage processUrl={processData.p_form_filling_site} />
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
