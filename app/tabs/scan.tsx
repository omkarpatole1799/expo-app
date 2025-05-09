'use client';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useRef } from 'react';
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
import BtnPrimary from '@/components/UI/BtnPrimary';
import { styles } from '@/constants/styles';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScanQrPage = () => {
    const rollNumberInputRef = useRef<HTMLInputElement>(null);

    const handleSearchCandidate = () => {
        const rollNumber = rollNumberInputRef?.current?.value;

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
        router.push(`/candidate-info/${rollNumber}`);
    };

    return (
        <SafeAreaView
            edges={['bottom']}
            style={{
                padding: 10,
            }}>
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
