import { setCurrentLoggedInProcessData } from '@/components/store/auth-slice';
import { RootState } from '@/components/store/store';
import BtnPrimary from '@/components/UI/BtnPrimary';
import BtnSecondary from '@/components/UI/BtnSecondary';
import InputLabel from '@/components/UI/InputLabel';
import { UTTIRNA_URL } from '@/constants/Colors';
import { styles } from '@/constants/styles';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

const defaultLoginFormValue = {
    username: 'test', // Set the dummy username
    password: 'test', // Set the dummy password
    processUrl: '',
    slot: '',
};

export default function Index() {
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            const url = `${UTTIRNA_URL}/api/get-process-list`;
            console.log(url, 'url-----');
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
        } finally {
            setIsLoading(false);
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

        setIsLoading(true);
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

                setIsLoading(false);
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
                setIsLoading(false);
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

    const fetchAllotmentDetails = useCallback(async (url: string) => {
        try {
            setIsLoading(true);
            console.log(`${url}/api/get-allotment-info`);
            const _resp = await fetch(`${url}/api/get-allotment-info`);
            if (!_resp.ok) throw new Error('Unable to get allotment details');
            const jsonData = await _resp.json();
            console.log(jsonData.data, '-');
            if (jsonData.data) {
                setAllotmentDetails(jsonData.data);
            }
        } catch (err) {
            Alert.alert('Warning', err?.message || 'Try again after some time.', [
                {
                    text: 'OK',
                    onPress: () => {
                        // router.push('/qr/scan');
                    },
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const watchProcessUrl = watch('processUrl');
    useEffect(() => {
        if (watchProcessUrl) {
            fetchAllotmentDetails(watchProcessUrl);
        }
    }, [watchProcessUrl, setValue]);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                }}>
                <View style={styles.container}>
                    <Text style={styles.header}>Welcome</Text>
                    <Text style={styles.subHeader}>Biometric Attendance</Text>

                    <Controller
                        control={control}
                        name="processUrl"
                        rules={{ required: 'Select Exam' }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.inputContainer}>
                                <InputLabel>Select Exam</InputLabel>
                                <Picker
                                    style={styles.input}
                                    selectedValue={value}
                                    onValueChange={onChange}>
                                    <Picker.Item label="-- Select --" />
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
                                <InputLabel>Select Slot</InputLabel>
                                <Picker
                                    style={styles.input}
                                    selectedValue={value}
                                    onValueChange={onChange}>
                                    <Picker.Item label="-- Select --" />
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

                                {errors.slot && (
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
                                <InputLabel>Username</InputLabel>
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
                                <InputLabel>Password</InputLabel>
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
                            flexDirection: 'row',
                            gap: 10,
                        }}>
                        <BtnPrimary title={'Login'} onPress={handleSubmit(onSubmit)} />
                        <BtnSecondary
                            title={'Refresh'}
                            onPress={() => {
                                reset(defaultLoginFormValue);
                                getProcessList();
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
